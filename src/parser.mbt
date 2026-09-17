///|
fn diagnostic(
  severity : Severity,
  code : String,
  line : Int,
  message : String,
) -> Diagnostic {
  { severity, code, line, message, }
}

///|
fn finish_group(
  groups : Array[Group],
  agents : Array[String],
  rules : Array[Rule],
  line : Int,
) -> Unit {
  if agents.length() > 0 {
    groups.push({ agents: agents.copy(), rules: rules.copy(), line, })
  }
}

///|
fn valid_agent(value : String) -> Bool {
  if value == "*" {
    return true
  }
  if value == "" {
    return false
  }
  for c in value {
    if !c.is_ascii_alphabetic() && c != '_' && c != '-' {
      return false
    }
  }
  true
}

///|
/// Parse a robots.txt document according to the grouping rules in RFC 9309.
/// Parsing is deliberately fault tolerant: malformed and unknown records are
/// reported as diagnostics while later valid records remain usable.
pub fn parse(source : String) -> RobotsFile {
  let groups : Array[Group] = []
  let sitemaps : Array[String] = []
  let diagnostics : Array[Diagnostic] = []
  let mut agents : Array[String] = []
  let mut rules : Array[Rule] = []
  let mut group_line = 0
  let mut group_has_rule = false
  let mut line_number = 0
  for raw_line in source.split("\n") {
    line_number = line_number + 1
    let mut line = raw_line.to_owned()
    if line.has_suffix("\r") {
      line = line[:line.length() - 1].to_owned()
    }
    if line.find("#") is Some(comment_at) {
      line = line[:comment_at].to_owned()
    }
    let trimmed = line.trim().to_owned()
    if trimmed == "" {
      continue
    }
    guard trimmed.find(":") is Some(colon) else {
      diagnostics.push(
        diagnostic(
          Warning,
          "R001",
          line_number,
          "record has no ':' separator and was ignored",
        ),
      )
      continue
    }
    let key = trimmed[:colon].trim().to_owned().to_lower()
    let value = trimmed[colon + 1:].trim().to_owned()
    match key {
      "user-agent" => {
        if !valid_agent(value) {
          diagnostics.push(
            diagnostic(
              Warning,
              "R002",
              line_number,
              "invalid User-agent product token was ignored",
            ),
          )
          continue
        }
        if group_has_rule {
          finish_group(groups, agents, rules, group_line)
          agents = []
          rules = []
          group_has_rule = false
          group_line = line_number
        } else if agents.length() == 0 {
          group_line = line_number
        }
        agents.push(value.to_lower())
      }
      "allow" | "disallow" => {
        if agents.length() == 0 {
          diagnostics.push(
            diagnostic(
              Warning,
              "R003",
              line_number,
              "rule before the first User-agent record was ignored",
            ),
          )
          continue
        }
        group_has_rule = true
        // An empty Disallow/Allow pattern has no matching effect.
        if value != "" && !value.has_prefix("/") && !value.has_prefix("*") {
          diagnostics.push(
            diagnostic(
              Warning,
              "R006",
              line_number,
              "rule path must start with '/' or '*' and was ignored",
            ),
          )
        } else if value != "" {
          let kind = if key == "allow" { Allow } else { Disallow }
          rules.push({ kind, pattern: value, line: line_number, })
        }
      }
      "sitemap" =>
        if value == "" {
          diagnostics.push(
            diagnostic(
              Warning,
              "R004",
              line_number,
              "empty Sitemap record was ignored",
            ),
          )
        } else {
          sitemaps.push(value)
        }
      _ =>
        diagnostics.push(
          diagnostic(
            Info,
            "R005",
            line_number,
            "unknown record '" + key + "' was ignored",
          ),
        )
    }
  }
  finish_group(groups, agents, rules, group_line)
  if groups.length() == 0 {
    diagnostics.push(
      diagnostic(
        Warning,
        "R007",
        0,
        "document contains no valid User-agent groups",
      ),
    )
  }
  { groups, sitemaps, diagnostics, }
}
