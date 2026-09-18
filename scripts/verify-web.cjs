const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const playwrightModule = process.argv[2] || "playwright";
const { chromium } = require(playwrightModule);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function launchBrowser() {
  if (!process.env.CI) {
    try {
      return await chromium.launch({ channel: "chrome" });
    } catch {
      // Fall back to Playwright's bundled Chromium outside CI as well.
    }
  }
  return chromium.launch();
}

async function assertAccessible(page, label) {
  const issues = await page.evaluate(() => {
    const output = [];
    const seen = new Set();
    for (const node of document.querySelectorAll("[id]")) {
      if (seen.has(node.id)) output.push(`duplicate id: ${node.id}`);
      seen.add(node.id);
    }
    for (const control of document.querySelectorAll("input:not([type=file]), textarea")) {
      const labelled = control.closest("label") || control.getAttribute("aria-label") ||
        (control.id && document.querySelector(`label[for="${control.id}"]`));
      if (!labelled) output.push(`unlabelled control: ${control.id || control.tagName}`);
    }
    for (const button of document.querySelectorAll("button")) {
      const name = button.getAttribute("aria-label") || button.textContent.trim();
      if (!name) output.push(`unnamed button: ${button.id || "anonymous"}`);
    }
    for (const link of document.querySelectorAll("a")) {
      if (!link.getAttribute("href")) output.push(`link without href: ${link.textContent.trim()}`);
      if (!link.textContent.trim() && !link.getAttribute("aria-label")) output.push("unnamed link");
    }
    const dialog = document.querySelector("dialog");
    if (dialog && !dialog.getAttribute("aria-label") && !dialog.getAttribute("aria-labelledby")) {
      output.push("dialog has no accessible name");
    }
    return output;
  });
  assert(issues.length === 0, `${label} accessibility issues: ${issues.join(" | ")}`);
}

async function dismissTour(page) {
  await page.waitForTimeout(350);
  if (await page.locator("#welcome-dialog").isVisible()) {
    assert((await page.locator("[data-tour-step]:visible").count()) === 1, "tour should show one step at a time");
    await page.getByRole("button", { name: "下一步" }).click();
    await page.getByRole("button", { name: "下一步" }).click();
    await page.getByRole("button", { name: "开始使用" }).click();
  }
}

(async () => {
  const screenshotsDir = path.resolve("docs/screenshots");
  fs.mkdirSync(screenshotsDir, { recursive: true });

  const browser = await launchBrowser();
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  const pageUrl = pathToFileURL(path.resolve("web/index.html")).href;
  await page.goto(pageUrl);
  await dismissTour(page);
  await assertAccessible(page, "desktop");

  assert((await page.locator("#decision-word").textContent()) === "允许抓取", "default scenario should allow");
  assert((await page.locator(".candidate-status.winner").count()) === 1, "default scenario should expose one winner");

  await page.getByRole("button", { name: "风险策略" }).click();
  assert((await page.locator("#decision-word").textContent()) === "拒绝抓取", "risk scenario should deny");
  assert((await page.locator("#issues-count").textContent()) !== "0", "risk scenario should report diagnostics");
  assert((await page.locator("#policy-health").getAttribute("class")).includes("has-issues"), "risk should update health status");

  await page.getByRole("button", { name: "通配符" }).click();
  assert((await page.locator("#decision-word").textContent()) === "允许抓取", "public PDF exception should allow");
  await page.locator("#url").fill("https://example.com/report.pdf");
  await page.getByRole("button", { name: /运行判定/ }).click();
  assert((await page.locator("#decision-word").textContent()) === "拒绝抓取", "generic PDF should deny");

  const decisionDownload = page.waitForEvent("download");
  await page.getByRole("button", { name: "下载报告" }).first().click();
  assert((await decisionDownload).suggestedFilename() === "moonrobots-decision.md", "decision Markdown export should download");

  await page.getByRole("tab", { name: "策略差异" }).click();
  assert(await page.locator("#diff-mode").isVisible(), "diff mode should be visible");
  assert((await page.locator("#diff-total").textContent()) === "8", "diff should analyze eight URLs");
  assert((await page.locator("#diff-denied").textContent()) === "1", "diff should detect one new denial");
  assert((await page.locator("#diff-body tr").count()) === 1, "diff should render one changed URL");

  await page.locator("#diff-urls-file").setInputFiles({
    name: "urls.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("/internal/status\n/internal/status/debug\n"),
  });
  assert((await page.locator("#diff-total").textContent()) === "2", "URL import should rerun diff");
  await page.getByRole("button", { name: "载入完整示例" }).first().click();
  const diffDownload = page.waitForEvent("download");
  await page.locator("#export-diff-json").click();
  assert((await diffDownload).suggestedFilename() === "moonrobots-policy-diff.json", "diff JSON export should download");

  await page.getByRole("tab", { name: "覆盖分析" }).click();
  assert(await page.locator("#coverage-mode").isVisible(), "coverage mode should be visible");
  assert((await page.locator("#coverage-total").textContent()) === "8", "coverage should analyze eight URLs");
  assert((await page.locator(".coverage-status.active").count()) > 0, "coverage should expose active rules");
  assert((await page.locator(".coverage-status.shadowed").count()) > 0, "coverage should expose shadowed rules");
  assert((await page.locator(".coverage-status.never_matched").count()) > 0, "coverage should expose never-matched rules");

  await page.locator("#coverage-urls-file").setInputFiles({
    name: "coverage-urls.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("/internal/report\n/internal/status\n"),
  });
  assert((await page.locator("#coverage-total").textContent()) === "2", "URL import should rerun coverage");
  await page.getByRole("button", { name: "载入完整示例" }).last().click();
  const coverageDownload = page.waitForEvent("download");
  await page.locator("#export-coverage-md").click();
  assert((await coverageDownload).suggestedFilename() === "moonrobots-coverage.md", "coverage Markdown export should download");

  const analysisApi = await page.evaluate(() => {
    const before = "User-agent: *\nDisallow: /private/\n";
    const after = "User-agent: *\nDisallow: /private/\nDisallow: /draft/\n";
    const urls = "/private/a\n/draft/a\n/open";
    return {
      comparison: JSON.parse(globalThis.comparePolicies(before, after, "Bot", urls)),
      coverage: JSON.parse(globalThis.analyzeCoverage(after, "Bot", urls)),
    };
  });
  assert(analysisApi.comparison.newlyDenied === 1, "browser comparison API should report a new denial");
  assert(analysisApi.coverage.totalUrls === 3, "browser coverage API should process the URL corpus");

  const desktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  assert(desktopOverflow <= 1, `desktop body should not overflow horizontally (${desktopOverflow}px)`);
  assert(errors.length === 0, `browser errors: ${errors.join(" | ")}`);

  await page.getByRole("tab", { name: "策略差异" }).click();
  await page.waitForTimeout(2100);
  await page.screenshot({ path: path.join(screenshotsDir, "preview-analysis.png"), fullPage: true });
  await page.getByRole("tab", { name: "单 URL 判定" }).click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(screenshotsDir, "preview-desktop.png"), fullPage: true });

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  mobile.on("console", (message) => {
    if (message.type() === "error") errors.push(`mobile: ${message.text()}`);
  });
  mobile.on("pageerror", (error) => errors.push(`mobile: ${error.message}`));
  await mobile.goto(pageUrl);
  await dismissTour(mobile);
  await assertAccessible(mobile, "mobile");
  const mobileOverflow = await mobile.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  assert(mobileOverflow <= 1, `mobile body should not overflow horizontally (${mobileOverflow}px)`);
  const smallTargets = await mobile.locator("button:visible").evaluateAll((buttons) =>
    buttons.filter((button) => button.getBoundingClientRect().height < 40).map((button) => button.textContent.trim()),
  );
  assert(smallTargets.length === 0, `mobile buttons below 40px: ${smallTargets.join(", ")}`);
  await mobile.screenshot({ path: path.join(screenshotsDir, "preview-mobile.png"), fullPage: true });

  assert(errors.length === 0, `browser errors: ${errors.join(" | ")}`);
  await browser.close();
  console.log("PASS: onboarding, 3 workbench modes, file imports, 3 exports, accessibility, responsive layout, 2 analysis APIs, 0 browser errors");
})().catch((error) => {
  console.error(`FAIL: ${error.message}`);
  process.exitCode = 1;
});
