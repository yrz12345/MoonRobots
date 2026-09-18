(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));
  const workbench = globalThis.MoonRobotsWorkbench;

  const regressionExample = {
    before: `User-agent: *
Disallow: /private/
Disallow: /drafts/

User-agent: MoonBot
Disallow: /internal/
Allow: /internal/status
`,
    after: `User-agent: *
Disallow: /private/
Allow: /private/public/
Disallow: /drafts/
Disallow: /experiments/

User-agent: MoonBot
Disallow: /internal/
Disallow: /internal/status
Allow: /internal/status
Disallow: /internal/status/debug
Disallow: /unused/
`,
    urls: `https://example.com/private/report
https://example.com/private/public/guide
https://example.com/drafts/post
https://example.com/experiments/new-ui
https://example.com/internal/report
https://example.com/internal/status
https://example.com/internal/status/debug
https://example.com/public/home
`,
  };

  const modeCopy = {
    evaluate: {
      title: ["规则不只决定通行。", "它解释为什么。"],
      description: "把模糊的允许或拒绝，变成清楚、可靠、可以复查的策略证据。",
    },
    diff: {
      title: ["在部署前，", "看见策略影响。"],
      description: "用真实 URL 集合比较新旧策略，只呈现最终访问行为发生变化的部分。",
    },
    coverage: {
      title: ["确认每条规则，", "都真正生效。"],
      description: "统计规则在 URL 语料中的匹配与胜出次数，找出被遮蔽和从未命中的配置。",
    },
  };

  let activeMode = "evaluate";
  let latestComparison = null;
  let latestCoverage = null;

  function setHealth(message, hasIssues = false) {
    const health = $("#policy-health");
    health.classList.toggle("has-issues", hasIssues);
    $("#policy-health-label").textContent = message;
  }

  function restoreModeHealth() {
    if (activeMode === "evaluate") {
      const result = workbench.getEvaluationResult();
      const count = result?.diagnostics?.length || 0;
      setHealth(count ? `发现 ${count} 个策略问题` : "策略状态良好，没有发现风险", count > 0);
    } else if (activeMode === "diff") {
      if (!latestComparison) return setHealth("准备比较两份策略");
      const changed = latestComparison.newlyAllowed + latestComparison.newlyDenied;
      setHealth(
        changed ? `发现 ${changed} 个访问行为变化` : "当前 URL 集合中没有行为变化",
        latestComparison.newlyDenied > 0,
      );
    } else {
      if (!latestCoverage) return setHealth("准备分析规则覆盖率");
      const weak = latestCoverage.rules.filter((rule) => rule.status !== "active").length;
      setHealth(weak ? `发现 ${weak} 条未充分覆盖的规则` : "所有选中规则均有实际胜出", weak > 0);
    }
  }

  function setMode(mode, updateHash = true) {
    if (!modeCopy[mode]) mode = "evaluate";
    activeMode = mode;
    $$("[data-mode]").forEach((button) => {
      const selected = button.dataset.mode === mode;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    $$(".mode-panel").forEach((panel) => {
      panel.hidden = panel.id !== `${mode}-mode`;
    });
    const title = $("#page-title");
    title.replaceChildren(...modeCopy[mode].title.map((line) => {
      const span = document.createElement("span");
      span.textContent = line;
      return span;
    }));
    $("#page-description").textContent = modeCopy[mode].description;
    if (updateHash) history.replaceState(null, "", mode === "evaluate" ? "#evaluate" : `#${mode}`);
    restoreModeHealth();
  }

  function addCell(row, value, className = "") {
    const cell = document.createElement("td");
    if (className) cell.className = className;
    cell.textContent = String(value);
    row.append(cell);
    return cell;
  }

  function ruleLabel(decision) {
    if (!decision?.matchedRule) return "默认允许";
    return `${decision.matchedRule.kind.toUpperCase()}: ${decision.matchedRule.pattern} · L${decision.matchedRule.line}`;
  }

  function runDiff() {
    try {
      if (typeof globalThis.comparePolicies !== "function") throw new Error("策略差异 API 不可用");
      latestComparison = JSON.parse(globalThis.comparePolicies(
        $("#diff-before").value,
        $("#diff-after").value,
        $("#diff-agent").value.trim(),
        $("#diff-urls").value,
      ));
      $("#diff-total").textContent = latestComparison.totalUrls;
      $("#diff-unchanged").textContent = latestComparison.unchanged;
      $("#diff-allowed").textContent = latestComparison.newlyAllowed;
      $("#diff-denied").textContent = latestComparison.newlyDenied;

      const body = $("#diff-body");
      body.replaceChildren();
      $("#diff-empty").hidden = latestComparison.changes.length > 0;
      for (const change of latestComparison.changes) {
        const row = document.createElement("tr");
        const label = change.kind === "newly_allowed" ? "新增允许" : "新增拒绝";
        const statusCell = addCell(row, "");
        const status = document.createElement("span");
        status.className = `change-status ${change.kind}`;
        status.textContent = label;
        statusCell.append(status);
        addCell(row, change.url, "url-cell");
        addCell(row, change.before.allowed ? "允许" : "拒绝");
        addCell(row, change.after.allowed ? "允许" : "拒绝");
        addCell(row, ruleLabel(change.after), "rule-cell");
        body.append(row);
      }
      if (activeMode === "diff") restoreModeHealth();
    } catch (error) {
      workbench.showToast(`比较失败：${error.message}`);
      console.error(error);
    }
  }

  function runCoverage() {
    try {
      if (typeof globalThis.analyzeCoverage !== "function") throw new Error("规则覆盖 API 不可用");
      latestCoverage = JSON.parse(globalThis.analyzeCoverage(
        $("#coverage-source").value,
        $("#coverage-agent").value.trim(),
        $("#coverage-urls").value,
      ));
      $("#coverage-total").textContent = latestCoverage.totalUrls;
      $("#coverage-allowed").textContent = latestCoverage.allowed;
      $("#coverage-denied").textContent = latestCoverage.denied;
      $("#coverage-groups").textContent = latestCoverage.selectedAgents.join(", ") || "—";

      const statusNames = { active: "有效", shadowed: "被遮蔽", never_matched: "未命中" };
      const body = $("#coverage-report-body");
      body.replaceChildren();
      $("#coverage-report-empty").hidden = latestCoverage.rules.length > 0;
      for (const item of latestCoverage.rules) {
        const row = document.createElement("tr");
        const statusCell = addCell(row, "");
        const status = document.createElement("span");
        status.className = `coverage-status ${item.status}`;
        status.textContent = statusNames[item.status] || item.status;
        statusCell.append(status);
        addCell(row, item.line);
        addCell(row, `${item.kind.toUpperCase()}: ${item.pattern}`, "rule-cell");
        addCell(row, item.matchedUrls);
        addCell(row, item.winningUrls);
        body.append(row);
      }
      if (activeMode === "coverage") restoreModeHealth();
    } catch (error) {
      workbench.showToast(`覆盖分析失败：${error.message}`);
      console.error(error);
    }
  }

  function loadRegressionExample() {
    $("#diff-before").value = regressionExample.before;
    $("#diff-after").value = regressionExample.after;
    $("#diff-urls").value = regressionExample.urls;
    $("#coverage-source").value = regressionExample.after;
    $("#coverage-urls").value = regressionExample.urls;
  }

  function downloadText(filename, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  function markdownValue(value) {
    return String(value ?? "—").replaceAll("|", "\\|").replaceAll("\n", " ");
  }

  function evaluationMarkdown(result) {
    const decision = result.trace.decision;
    const diagnostics = result.diagnostics.length
      ? result.diagnostics.map((item) => `- ${item.severity.toUpperCase()} ${item.code}（行 ${item.line || "—"}）：${item.message}`).join("\n")
      : "- 没有发现语法或语义风险。";
    return `# MoonRobots 判定报告

- 结论：${decision.allowed ? "允许抓取" : "拒绝抓取"}
- 爬虫：${decision.userAgent}
- 标准化路径：${decision.path}
- 选中代理组：${decision.selectedAgents.join(", ") || "无"}
- 命中规则：${ruleLabel(decision)}
- 匹配特异度：${decision.matchLength}

## 策略摘要

- 分组：${result.groups}
- 规则：${result.rules}
- 问题：${result.diagnostics.length}

## 诊断

${diagnostics}
`;
  }

  function comparisonMarkdown(report) {
    const rows = report.changes.length
      ? report.changes.map((item) => `| ${item.kind === "newly_allowed" ? "新增允许" : "新增拒绝"} | ${markdownValue(item.url)} | ${item.before.allowed ? "允许" : "拒绝"} | ${item.after.allowed ? "允许" : "拒绝"} | ${markdownValue(ruleLabel(item.after))} |`).join("\n")
      : "| 无变化 | — | — | — | — |";
    return `# MoonRobots 策略差异报告

- User-agent：${report.userAgent}
- URL 总数：${report.totalUrls}
- 行为不变：${report.unchanged}
- 新增允许：${report.newlyAllowed}
- 新增拒绝：${report.newlyDenied}

| 变化 | URL | 修改前 | 修改后 | 新命中规则 |
|---|---|---|---|---|
${rows}
`;
  }

  function coverageMarkdown(report) {
    const names = { active: "有效", shadowed: "被遮蔽", never_matched: "未命中" };
    const rows = report.rules.length
      ? report.rules.map((item) => `| ${names[item.status] || item.status} | ${item.line} | ${markdownValue(`${item.kind.toUpperCase()}: ${item.pattern}`)} | ${item.matchedUrls} | ${item.winningUrls} |`).join("\n")
      : "| 无规则 | — | — | 0 | 0 |";
    return `# MoonRobots 规则覆盖报告

- User-agent：${report.userAgent}
- 选中代理组：${report.selectedAgents.join(", ") || "无"}
- URL 总数：${report.totalUrls}
- 允许：${report.allowed}
- 拒绝：${report.denied}

| 状态 | 行 | 规则 | 匹配 URL | 胜出 URL |
|---|---:|---|---:|---:|
${rows}
`;
  }

  async function applyFile(file, targetId) {
    if (!file) return;
    const text = await file.text();
    if (targetId === "source") {
      workbench.loadPolicy(text);
    } else {
      $(`#${targetId}`).value = text;
      if (targetId.startsWith("diff-")) runDiff();
      if (targetId.startsWith("coverage-")) runCoverage();
    }
    workbench.showToast(`已导入 ${file.name}`);
  }

  function bindFileImport(buttonId, inputId, targetId) {
    const button = $(`#${buttonId}`);
    const input = $(`#${inputId}`);
    button.addEventListener("click", () => input.click());
    input.addEventListener("change", async () => {
      await applyFile(input.files[0], targetId);
      input.value = "";
    });
  }

  function wireDropZones() {
    $$(".drop-zone").forEach((zone) => {
      zone.addEventListener("dragover", (event) => {
        event.preventDefault();
        zone.classList.add("drag-active");
      });
      zone.addEventListener("dragleave", () => zone.classList.remove("drag-active"));
      zone.addEventListener("drop", async (event) => {
        event.preventDefault();
        zone.classList.remove("drag-active");
        await applyFile(event.dataTransfer.files[0], zone.dataset.dropTarget);
      });
    });
  }

  function exportJson(filename, value) {
    downloadText(filename, `${JSON.stringify(value, null, 2)}\n`, "application/json;charset=utf-8");
  }

  function setupExports() {
    $("#export-eval-json").addEventListener("click", () => exportJson("moonrobots-decision.json", workbench.getEvaluationResult()));
    $("#export-eval-md").addEventListener("click", () => downloadText("moonrobots-decision.md", evaluationMarkdown(workbench.getEvaluationResult()), "text/markdown;charset=utf-8"));
    $("#export-diff-json").addEventListener("click", () => exportJson("moonrobots-policy-diff.json", latestComparison));
    $("#export-diff-md").addEventListener("click", () => downloadText("moonrobots-policy-diff.md", comparisonMarkdown(latestComparison), "text/markdown;charset=utf-8"));
    $("#export-coverage-json").addEventListener("click", () => exportJson("moonrobots-coverage.json", latestCoverage));
    $("#export-coverage-md").addEventListener("click", () => downloadText("moonrobots-coverage.md", coverageMarkdown(latestCoverage), "text/markdown;charset=utf-8"));
  }

  function setupTour() {
    const dialog = $("#welcome-dialog");
    const steps = $$("[data-tour-step]");
    let index = 0;
    const storageKey = "moonrobots:onboarding:v2";

    function renderStep() {
      steps.forEach((step, stepIndex) => { step.hidden = stepIndex !== index; });
      $("#tour-back").hidden = index === 0;
      $("#tour-next").textContent = index === steps.length - 1 ? "开始使用" : "下一步";
    }
    function rememberSeen() {
      try { localStorage.setItem(storageKey, "done"); } catch { /* file storage can be unavailable */ }
    }
    function rememberAndClose() {
      rememberSeen();
      dialog.close();
    }
    function openTour() {
      index = 0;
      renderStep();
      if (!dialog.open) dialog.showModal();
    }
    $("#tour-next").addEventListener("click", () => {
      if (index === steps.length - 1) return rememberAndClose();
      index += 1;
      renderStep();
    });
    $("#tour-back").addEventListener("click", () => { index = Math.max(0, index - 1); renderStep(); });
    $("#tour-skip").addEventListener("click", rememberAndClose);
    $("#open-tour").addEventListener("click", openTour);
    dialog.addEventListener("cancel", rememberSeen);
    let seen = false;
    try { seen = localStorage.getItem(storageKey) === "done"; } catch { /* no-op */ }
    // Showing the automatic tour counts as the first-run experience. Persist it
    // immediately so closing the app mid-tour does not reopen it next launch.
    if (!seen) rememberSeen();
    if (!seen || new URLSearchParams(location.search).has("tour")) window.setTimeout(openTour, 250);
  }

  $$("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => setMode(button.dataset.mode));
    button.addEventListener("keydown", (event) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const tabs = $$("[data-mode]");
      const offset = event.key === "ArrowRight" ? 1 : -1;
      const next = tabs[(tabs.indexOf(button) + offset + tabs.length) % tabs.length];
      next.focus();
      setMode(next.dataset.mode);
    });
  });

  $("#run-diff").addEventListener("click", runDiff);
  $("#run-coverage").addEventListener("click", runCoverage);
  $("#load-diff-example").addEventListener("click", () => { loadRegressionExample(); runDiff(); });
  $("#load-coverage-example").addEventListener("click", () => { loadRegressionExample(); runCoverage(); });

  bindFileImport("import-policy", "policy-file", "source");
  bindFileImport("import-diff-before", "diff-before-file", "diff-before");
  bindFileImport("import-diff-after", "diff-after-file", "diff-after");
  bindFileImport("import-diff-urls", "diff-urls-file", "diff-urls");
  bindFileImport("import-coverage-source", "coverage-source-file", "coverage-source");
  bindFileImport("import-coverage-urls", "coverage-urls-file", "coverage-urls");
  wireDropZones();
  setupExports();
  setupTour();

  loadRegressionExample();
  runDiff();
  runCoverage();
  const initialMode = location.hash.slice(1);
  setMode(modeCopy[initialMode] ? initialMode : "evaluate", false);

  globalThis.MoonRobotsAnalysis = Object.freeze({ setMode, runDiff, runCoverage });
})();
