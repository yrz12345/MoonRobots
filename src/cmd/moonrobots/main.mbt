///|
fn usage() -> Unit {
  let help =
    #|MoonRobots 0.1.0 — explainable RFC 9309 robots.txt decisions
    #|
    #|Usage:
    #|  moonrobots check <robots.txt> --agent <name> --url <url> [--json]
    #|  moonrobots inspect <robots.txt>
    #|  moonrobots lint <robots.txt> [--json]
    #|  moonrobots batch <robots.txt> <urls.txt> --agent <name> [--json]
    #|  moonrobots coverage <robots.txt> <urls.txt> --agent <name> [--json]
    #|  moonrobots diff <before.txt> <after.txt> <urls.txt> --agent <name> [--json]
    #|
    #|Examples:
    #|  moon run src/cmd/moonrobots --target native -- check examples/basic.txt --agent MoonBot --url /private/a
    #|  moon run src/cmd/moonrobots --target native -- inspect examples/basic.txt
    #|  moon run src/cmd/moonrobots --target native -- lint examples/malformed.txt
    #|  moon run src/cmd/moonrobots --target native -- batch examples/basic.txt examples/urls.txt --agent MoonBot
    #|  moon run src/cmd/moonrobots --target native -- coverage examples/basic.txt examples/urls.txt --agent MoonBot
    #|  moon run src/cmd/moonrobots --target native -- diff examples/policy-before.txt examples/policy-after.txt examples/regression-urls.txt --agent MoonBot
    #|
  println(help)
}

///|
fn option(args : Array[String], name : String) -> String? {
  for index = 0; index < args.length() - 1; index = index + 1 {
    if args[index] == name {
      return Some(args[index + 1])
    }
  }
  None
}

///|
fn has_flag(args : Array[String], name : String) -> Bool {
  args.contains(name)
}

///|
fn kind_name(kind : @robots.RuleKind) -> String {
  match kind {
    Allow => "Allow"
    Disallow => "Disallow"
  }
}

///|
fn severity_name(severity : @robots.Severity) -> String {
  match severity {
    Info => "info"
    Warning => "warning"
  }
}

///|
fn reason_text(reason : @robots.DecisionReason) -> String {
  match reason {
    ImplicitRobotsTxt => "RFC 9309 implicitly allows /robots.txt"
    NoMatchingGroup => "no matching User-agent group; no rules apply"
    NoMatchingRule => "a group matched, but none of its rules matched the path"
    MatchedRule => "the most specific matching rule was selected"
  }
}

///|
fn read_robots(path : String) -> @robots.RobotsFile raise {
  @robots.parse(@fs.read_file_to_string(path))
}

///|
fn read_urls(path : String) -> Array[String] raise {
  let urls : Array[String] = []
  for raw in @fs.read_file_to_string(path).split("\n") {
    let url = raw.trim().to_owned()
    if url != "" && !url.has_prefix("#") {
      urls.push(url)
    }
  }
  urls
}

///|
fn print_diagnostics(items : Array[@robots.Diagnostic]) -> Unit {
  if items.length() == 0 {
    println("No diagnostics.")
    return
  }
  for item in items {
    println(
      "\{severity_name(item.severity)}[\{item.code}] line \{item.line}: \{item.message}",
    )
  }
}

///|
fn run_check(args : Array[String]) -> Unit raise {
  guard args.length() >= 3 else {
    usage()
    return
  }
  let path = args[2]
  guard option(args, "--agent") is Some(agent) else {
    println("error: --agent is required")
    return
  }
  guard option(args, "--url") is Some(url) else {
    println("error: --url is required")
    return
  }
  let decision = @robots.evaluate(read_robots(path), agent, url)
  if has_flag(args, "--json") {
    println(@robots.decision_json(decision).stringify(indent=2))
    return
  }
  println(if decision.allowed { "ALLOWED" } else { "DENIED" })
  println("Crawler: " + decision.user_agent)
  println("Path: " + decision.path)
  if decision.selected_agents.length() > 0 {
    println("Selected group: " + decision.selected_agents.join(", "))
  }
  match decision.matched_rule {
    Some(rule) => {
      println(
        "Matched rule: \{kind_name(rule.kind)}: \{rule.pattern} (line \{rule.line})",
      )
      println("Specificity: \{decision.match_length}")
    }
    None => println("Matched rule: none")
  }
  println("Reason: " + reason_text(decision.reason))
}

///|
fn run_inspect(args : Array[String]) -> Unit raise {
  guard args.length() >= 3 else {
    usage()
    return
  }
  let file = read_robots(args[2])
  println("Groups: \{file.groups.length()}")
  println("Sitemaps: \{file.sitemaps.length()}")
  println("Diagnostics: \{file.diagnostics.length()}")
  for index, group in file.groups {
    println("")
    println("Group \{index + 1} (line \{group.line})")
    println("  User-agent: " + group.agents.join(", "))
    if group.rules.length() == 0 {
      println("  Rules: none (allows everything)")
    } else {
      for rule in group.rules {
        println("  line \{rule.line}: \{kind_name(rule.kind)}: \{rule.pattern}")
      }
    }
  }
  if file.sitemaps.length() > 0 {
    println("")
    println("Sitemaps")
    for sitemap in file.sitemaps {
      println("  " + sitemap)
    }
  }
}

///|
fn run_lint(args : Array[String]) -> Unit raise {
  guard args.length() >= 3 else {
    usage()
    return
  }
  let file = read_robots(args[2])
  let diagnostics = @robots.lint(file)
  if has_flag(args, "--json") {
    println(Json(diagnostics.map(@robots.diagnostic_json)).stringify(indent=2))
  } else {
    print_diagnostics(diagnostics)
    println(
      "Summary: \{file.groups.length()} group(s), \{diagnostics.length()} diagnostic(s)",
    )
  }
}

///|
fn run_batch(args : Array[String]) -> Unit raise {
  guard args.length() >= 4 else {
    usage()
    return
  }
  guard option(args, "--agent") is Some(agent) else {
    println("error: --agent is required")
    return
  }
  let robots = read_robots(args[2])
  let urls = read_urls(args[3])
  let mut allowed = 0
  let mut denied = 0
  let results : Array[Json] = []
  let json_output = has_flag(args, "--json")
  for url in urls {
    let decision = @robots.evaluate(robots, agent, url)
    let item : Json = {
      "url": Json(url),
      "decision": @robots.decision_json(decision),
    }
    results.push(item)
    if decision.allowed {
      allowed = allowed + 1
      if !json_output {
        println("ALLOWED\t" + url)
      }
    } else {
      denied = denied + 1
      let rule = match decision.matched_rule {
        Some(item) => item.pattern
        None => ""
      }
      if !json_output {
        println("DENIED\t" + url + "\t" + rule)
      }
    }
  }
  if json_output {
    let report : Json = {
      "userAgent": Json(agent),
      "allowed": Json(allowed),
      "denied": Json(denied),
      "results": Json(results),
    }
    println(report.stringify(indent=2))
  } else {
    println("Summary: \{allowed} allowed, \{denied} denied")
  }
}

///|
fn run_coverage(args : Array[String]) -> Unit raise {
  guard args.length() >= 4 else {
    usage()
    return
  }
  guard option(args, "--agent") is Some(agent) else {
    println("error: --agent is required")
    return
  }
  let report = @robots.analyze_coverage(
    read_robots(args[2]),
    agent,
    read_urls(args[3]),
  )
  if has_flag(args, "--json") {
    println(@robots.coverage_report_json(report).stringify(indent=2))
    return
  }
  println("RULE COVERAGE")
  println("Crawler: " + report.user_agent)
  if report.selected_agents.length() > 0 {
    println("Selected group: " + report.selected_agents.join(", "))
  }
  println(
    "URLs: \{report.total_urls} (\{report.allowed} allowed, \{report.denied} denied)",
  )
  println("")
  if report.rules.length() == 0 {
    println("No rules selected for this crawler.")
    return
  }
  for item in report.rules {
    let status = if item.matched_urls == 0 {
      "NEVER MATCHED"
    } else if item.winning_urls == 0 {
      "SHADOWED"
    } else {
      "ACTIVE"
    }
    println(
      "\{status}\tline \{item.rule.line}\t\{kind_name(item.rule.kind)}: \{item.rule.pattern}\tmatched \{item.matched_urls}\twon \{item.winning_urls}",
    )
  }
}

///|
fn decision_summary(decision : @robots.Decision) -> String {
  let outcome = if decision.allowed { "ALLOWED" } else { "DENIED" }
  match decision.matched_rule {
    Some(rule) =>
      "\{outcome} by \{kind_name(rule.kind)}: \{rule.pattern} (line \{rule.line})"
    None => outcome
  }
}

///|
fn run_diff(args : Array[String]) -> Unit raise {
  guard args.length() >= 5 else {
    usage()
    return
  }
  guard option(args, "--agent") is Some(agent) else {
    println("error: --agent is required")
    return
  }
  let comparison = @robots.compare_policies(
    read_robots(args[2]),
    read_robots(args[3]),
    agent,
    read_urls(args[4]),
  )
  if has_flag(args, "--json") {
    println(@robots.policy_comparison_json(comparison).stringify(indent=2))
    return
  }
  println("POLICY REGRESSION")
  println("Crawler: " + comparison.user_agent)
  println("URLs: \{comparison.total_urls}")
  println("Unchanged: \{comparison.unchanged}")
  println("Newly allowed: \{comparison.newly_allowed}")
  println("Newly denied: \{comparison.newly_denied}")
  if comparison.changes.length() == 0 {
    println("")
    println("No observable access changes.")
    return
  }
  for change in comparison.changes {
    let label = match change.kind {
      NewlyAllowed => "NEWLY ALLOWED"
      NewlyDenied => "NEWLY DENIED"
    }
    println("")
    println("\{label}\t\{change.url}")
    println("  before: " + decision_summary(change.before_decision))
    println("  after:  " + decision_summary(change.after_decision))
  }
}

///|
fn main {
  let args = @env.args()
  try {
    if args.length() < 2 || args[1] == "--help" || args[1] == "-h" {
      usage()
      return
    }
    match args[1] {
      "check" => run_check(args)
      "inspect" => run_inspect(args)
      "lint" => run_lint(args)
      "batch" => run_batch(args)
      "coverage" => run_coverage(args)
      "diff" => run_diff(args)
      command => {
        println("error: unknown command '" + command + "'")
        usage()
      }
    }
  } catch {
    error => println("error: " + error.to_string())
  }
}
