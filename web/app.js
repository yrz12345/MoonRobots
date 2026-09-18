(() => {
  "use strict";

  const examples = {
    balanced: `# MoonRobots balanced policy
User-agent: *
Disallow: /private/
Allow: /private/public/
Disallow: /reports/*.pdf$

User-agent: MoonBot
Disallow: /moon-only/
Allow: /moon-only/preview/

Sitemap: https://example.com/sitemap.xml
`,
    wildcards: `User-agent: *
Disallow: /*.pdf$
Allow: /public/*.pdf$
Disallow: /users/*/settings
Disallow: /search?*secret=

Sitemap: https://example.com/sitemap.xml
`,
    risk: `User-agent: AuditBot
Disallow: /
Disallow: /

User-agent: AuditBot
Allow: /status

Sitemap: relative-sitemap.xml
Sitemap: relative-sitemap.xml
`,
  };

  const $ = (selector) => document.querySelector(selector);
  const source = $("#source");
  const agent = $("#agent");
  const url = $("#url");
  let latestResult = null;
  let toastTimer = 0;

  const reasonText = {
    implicit_robots_txt: "RFC 9309 要求 robots.txt 本身始终可访问。",
    no_matching_group: "没有匹配的 User-agent 组，因此没有规则限制该路径。",
    no_matching_rule: "找到了代理组，但其中没有规则命中这个标准化路径。",
    matched_rule: "已在所有命中规则中选择特异度最高的一条；同长度时 Allow 优先。",
  };

  function updateLineNumbers() {
    const count = source.value.split("\n").length;
    $("#line-numbers").textContent = Array.from({ length: count }, (_, index) => index + 1).join("\n");
    $("#source-lines").textContent = `${count} LINES`;
  }

  function sameRule(candidate, decision) {
    const winner = decision.matchedRule;
    return winner && candidate.line === winner.line && candidate.pattern === winner.pattern && candidate.kind === winner.kind;
  }

  function renderCandidates(candidates, decision) {
    const body = $("#candidate-body");
    const empty = $("#candidate-empty");
    body.replaceChildren();
    empty.hidden = candidates.length > 0;

    for (const item of candidates) {
      const winner = sameRule(item, decision);
      const row = document.createElement("tr");
      if (winner) row.className = "winner";

      const status = winner ? "WINNER" : item.matched ? "MATCH" : "MISS";
      row.innerHTML = `
        <td><span class="candidate-status ${winner ? "winner" : item.matched ? "match" : "miss"}">${status}</span></td>
        <td>${item.line}</td>
        <td><span class="rule-kind">${item.kind.toUpperCase()}</span>${escapeHtml(item.pattern)}</td>
        <td>${escapeHtml(item.normalizedPattern)}</td>
        <td>${item.matchLength}</td>`;
      body.append(row);
    }
  }

  function renderDiagnostics(items) {
    const list = $("#diagnostics-list");
    const empty = $("#diagnostics-empty");
    list.replaceChildren();
    empty.hidden = items.length > 0;

    for (const item of items) {
      const row = document.createElement("li");
      row.innerHTML = `
        <span class="diagnostic-code">${escapeHtml(item.code)}</span>
        <p class="diagnostic-message">${escapeHtml(item.message)}<span class="diagnostic-meta">${item.severity.toUpperCase()} · LINE ${item.line || "—"}</span></p>`;
      list.append(row);
    }
  }

  function render(result) {
    latestResult = result;
    const decision = result.trace.decision;
    const mode = decision.allowed ? "allowed" : "denied";
    const word = decision.allowed ? "允许抓取" : "拒绝抓取";
    const stamp = decision.allowed ? "ALLOW" : "DENY";

    $("#engine-version").textContent = `v${result.engineVersion}`;
    $("#decision-stamp").textContent = stamp;
    $("#decision-stamp").className = `decision-stamp ${mode}`;
    $("#decision-hero").className = `decision-hero ${mode}`;
    $("#decision-kicker").textContent = decision.reason.replaceAll("_", " ").toUpperCase();
    $("#decision-word").textContent = word;
    $("#decision-explanation").textContent = reasonText[decision.reason] || decision.reason;
    $("#normalized-path").textContent = decision.path;
    $("#selected-agents").textContent = decision.selectedAgents.length ? decision.selectedAgents.join(", ") : "无匹配组";
    $("#matched-rule").textContent = decision.matchedRule
      ? `${decision.matchedRule.kind.toUpperCase()}: ${decision.matchedRule.pattern} · L${decision.matchedRule.line}`
      : "无";
    $("#match-length").textContent = decision.matchLength;
    $("#groups-count").textContent = result.groups;
    $("#rules-count").textContent = result.rules;
    $("#issues-count").textContent = result.diagnostics.length;
    const health = $("#policy-health");
    const healthLabel = $("#policy-health-label");
    const hasIssues = result.diagnostics.length > 0;
    health.classList.toggle("has-issues", hasIssues);
    healthLabel.textContent = hasIssues
      ? `发现 ${result.diagnostics.length} 个策略问题`
      : "策略状态良好，没有发现风险";

    renderCandidates(result.trace.candidates, decision);
    renderDiagnostics(result.diagnostics);
  }

  function run() {
    try {
      if (typeof globalThis.analyze !== "function") throw new Error("MoonBit runtime unavailable");
      render(JSON.parse(globalThis.analyze(source.value, agent.value.trim(), url.value.trim())));
    } catch (error) {
      showToast(`判定失败：${error.message}`);
      console.error(error);
    }
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 1800);
  }

  function scheduleRun() {
    window.clearTimeout(scheduleRun.timer);
    scheduleRun.timer = window.setTimeout(run, 180);
  }

  source.addEventListener("input", () => {
    updateLineNumbers();
    scheduleRun();
  });
  source.addEventListener("scroll", () => {
    $("#line-numbers").scrollTop = source.scrollTop;
  });
  agent.addEventListener("input", scheduleRun);
  url.addEventListener("input", scheduleRun);
  $("#evaluate").addEventListener("click", run);
  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      run();
    }
  });

  document.querySelectorAll("[data-example]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-example]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      source.value = examples[button.dataset.example];
      if (button.dataset.example === "wildcards") {
        agent.value = "ExampleBot";
        url.value = "https://example.com/public/guide.pdf";
      } else if (button.dataset.example === "risk") {
        agent.value = "AuditBot";
        url.value = "https://example.com/private/report";
      } else {
        agent.value = "MoonBot";
        url.value = "https://example.com/moon-only/preview/report.pdf";
      }
      updateLineNumbers();
      run();
    });
  });

  $("#copy-json").addEventListener("click", async () => {
    if (!latestResult) return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(latestResult, null, 2));
      showToast("判定 JSON 已复制");
    } catch {
      showToast("浏览器未授权剪贴板访问");
    }
  });

  source.value = examples.balanced;
  updateLineNumbers();
  run();
})();
