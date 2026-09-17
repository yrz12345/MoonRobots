const path = require("node:path");
const { pathToFileURL } = require("node:url");

const playwrightModule = process.argv[2] || "playwright";
const { chromium } = require(playwrightModule);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

(async () => {
  const browser = await chromium.launch({ channel: "chrome" });
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  const pageUrl = pathToFileURL(path.resolve("web/index.html")).href;
  await page.goto(pageUrl);
  assert((await page.locator("#decision-word").textContent()) === "允许抓取", "default scenario should allow");
  assert((await page.locator(".candidate-status.winner").count()) === 1, "default scenario should expose one winner");

  await page.getByRole("button", { name: "风险策略" }).click();
  assert((await page.locator("#decision-word").textContent()) === "拒绝抓取", "risk scenario should deny");
  assert((await page.locator("#issues-count").textContent()) !== "0", "risk scenario should report diagnostics");

  await page.getByRole("button", { name: "通配符" }).click();
  assert((await page.locator("#decision-word").textContent()) === "允许抓取", "public PDF exception should allow");

  await page.locator("#url").fill("https://example.com/report.pdf");
  await page.getByRole("button", { name: /运行判定/ }).click();
  assert((await page.locator("#decision-word").textContent()) === "拒绝抓取", "generic PDF should deny");
  assert((await page.locator(".candidate-status.winner").count()) === 1, "manual scenario should expose one winner");
  assert(errors.length === 0, `browser errors: ${errors.join(" | ")}`);

  await page.screenshot({
    path: path.resolve("web/preview-desktop.png"),
    fullPage: true,
  });

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto(pageUrl);
  await mobile.screenshot({
    path: path.resolve("web/preview-mobile.png"),
    fullPage: true,
  });
  await browser.close();
  console.log("PASS: 4 interaction states, 0 browser errors, desktop + mobile screenshots written");
})().catch((error) => {
  console.error(`FAIL: ${error.message}`);
  process.exitCode = 1;
});
