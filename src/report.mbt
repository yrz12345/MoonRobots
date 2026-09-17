///|
fn rule_kind_name(kind : RuleKind) -> String {
  match kind {
    Allow => "allow"
    Disallow => "disallow"
  }
}

///|
fn decision_reason_name(reason : DecisionReason) -> String {
  match reason {
    ImplicitRobotsTxt => "implicit_robots_txt"
    NoMatchingGroup => "no_matching_group"
    NoMatchingRule => "no_matching_rule"
    MatchedRule => "matched_rule"
  }
}

///|
/// Convert a decision to a stable, integration-friendly JSON representation.
pub fn decision_json(decision : Decision) -> Json {
  let matched_rule : Json = match decision.matched_rule {
    Some(rule) => {
      let value : Json = {
        "kind": Json(rule_kind_name(rule.kind)),
        "pattern": Json(rule.pattern),
        "line": Json(rule.line),
      }
      value
    }
    None => null
  }
  let result : Json = {
    "allowed": Json(decision.allowed),
    "userAgent": Json(decision.user_agent),
    "path": Json(decision.path),
    "selectedAgents": Json(decision.selected_agents),
    "matchedRule": matched_rule,
    "matchLength": Json(decision.match_length),
    "reason": Json(decision_reason_name(decision.reason)),
  }
  result
}

///|
/// Convert an evaluation trace to stable JSON for browser and editor tools.
pub fn evaluation_trace_json(trace : EvaluationTrace) -> Json {
  let candidates : Array[Json] = trace.candidates.map(candidate => {
    let value : Json = {
      "kind": Json(rule_kind_name(candidate.rule.kind)),
      "pattern": Json(candidate.rule.pattern),
      "normalizedPattern": Json(candidate.normalized_pattern),
      "line": Json(candidate.rule.line),
      "matched": Json(candidate.matched),
      "matchLength": Json(candidate.match_length),
    }
    value
  })
  let result : Json = {
    "decision": decision_json(trace.decision),
    "candidates": Json(candidates),
  }
  result
}

///|
/// Convert a diagnostic to stable JSON for CI and editor integrations.
pub fn diagnostic_json(item : Diagnostic) -> Json {
  let severity = match item.severity {
    Info => "info"
    Warning => "warning"
  }
  let result : Json = {
    "severity": Json(severity),
    "code": Json(item.code),
    "line": Json(item.line),
    "message": Json(item.message),
  }
  result
}

///|
fn lint_item(
  severity : Severity,
  code : String,
  line : Int,
  message : String,
) -> Diagnostic {
  { severity, code, line, message, }
}

///|
/// Run semantic checks in addition to the parser's syntax diagnostics.
pub fn lint(file : RobotsFile) -> Array[Diagnostic] {
  let output = file.diagnostics.copy()
  let seen_agents : Array[String] = []
  for group in file.groups {
    if group.rules.length() == 0 {
      output.push(
        lint_item(
          Info,
          "L002",
          group.line,
          "group has no rules and therefore allows every path",
        ),
      )
    }
    let seen_rules : Array[String] = []
    for rule in group.rules {
      let key = rule_kind_name(rule.kind) + ":" + rule.pattern
      if seen_rules.contains(key) {
        output.push(
          lint_item(
            Info,
            "L001",
            rule.line,
            "duplicate rule has no additional effect",
          ),
        )
      } else {
        seen_rules.push(key)
      }
      if rule.kind == Disallow && rule.pattern == "/" {
        output.push(
          lint_item(
            Warning,
            "L003",
            rule.line,
            "rule denies the entire site unless a more specific Allow rule wins",
          ),
        )
      }
    }
    for agent in group.agents {
      if seen_agents.contains(agent) {
        output.push(
          lint_item(
            Info,
            "L006",
            group.line,
            "User-agent appears in multiple groups; their rules will be merged",
          ),
        )
      } else {
        seen_agents.push(agent)
      }
    }
  }
  let seen_sitemaps : Array[String] = []
  for sitemap in file.sitemaps {
    if !sitemap.has_prefix("https://") && !sitemap.has_prefix("http://") {
      output.push(
        lint_item(
          Warning,
          "L004",
          0,
          "Sitemap should use an absolute HTTP or HTTPS URL: " + sitemap,
        ),
      )
    }
    if seen_sitemaps.contains(sitemap) {
      output.push(
        lint_item(Info, "L005", 0, "duplicate Sitemap record: " + sitemap),
      )
    } else {
      seen_sitemaps.push(sitemap)
    }
  }
  output
}
