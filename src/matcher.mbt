///|
fn pattern_match(pattern : String, target : String) -> Bool {
  let mut exact_end = false
  let mut body = pattern
  if body.has_suffix("$") {
    exact_end = true
    body = body[:body.length() - 1].to_owned()
  }
  let p = body.to_array()
  let t = target.to_array()
  let mut pi = 0
  let mut ti = 0
  let mut star = -1
  let mut star_target = -1
  while ti < t.length() {
    if pi == p.length() {
      if !exact_end {
        return true
      }
      if star >= 0 {
        star_target = star_target + 1
        ti = star_target
        pi = star + 1
        continue
      } else {
        return false
      }
    }
    if p[pi] == '*' {
      star = pi
      star_target = ti
      pi = pi + 1
    } else if p[pi] == t[ti] {
      pi = pi + 1
      ti = ti + 1
    } else if star >= 0 {
      star_target = star_target + 1
      ti = star_target
      pi = star + 1
    } else {
      return false
    }
  }
  while pi < p.length() && p[pi] == '*' {
    pi = pi + 1
  }
  pi == p.length()
}

///|
fn specificity(pattern : String) -> Int {
  let mut count = 0
  for c in pattern {
    if c != '*' && c != '$' {
      count = count + 1
    }
  }
  count
}

///|
fn selected_rules(
  robots : RobotsFile,
  user_agent : String,
) -> (Array[Rule], Array[String]) {
  let requested = user_agent.to_lower()
  let mut best = 0
  for group in robots.groups {
    for agent in group.agents {
      if agent != "*" && requested == agent && agent.length() > best {
        best = agent.length()
      }
    }
  }
  let rules : Array[Rule] = []
  let selected : Array[String] = []
  for group in robots.groups {
    let mut chosen = false
    for agent in group.agents {
      if best > 0 {
        if agent != "*" && requested == agent && agent.length() == best {
          chosen = true
        }
      } else if agent == "*" {
        chosen = true
      }
    }
    if chosen {
      for rule in group.rules {
        rules.push(rule)
      }
      for agent in group.agents {
        if !selected.contains(agent) {
          selected.push(agent)
        }
      }
    }
  }
  (rules, selected)
}

///|
/// Evaluate whether a crawler may access a URL and retain the winning rule so
/// callers can explain the decision. An explicit Allow wins an equal-length
/// tie, as recommended by RFC 9309.
pub fn evaluate_trace(
  robots : RobotsFile,
  user_agent : String,
  url : String,
) -> EvaluationTrace {
  let raw_path = path_from_url(url)
  let path = normalize_path(raw_path, false)
  if raw_path == "/robots.txt" || raw_path.has_prefix("/robots.txt?") {
    return {
      decision: {
        allowed: true,
        user_agent,
        path,
        selected_agents: [],
        matched_rule: None,
        match_length: 0,
        reason: ImplicitRobotsTxt,
      },
      candidates: [],
    }
  }
  let (rules, selected_agents) = selected_rules(robots, user_agent)
  if selected_agents.length() == 0 {
    return {
      decision: {
        allowed: true,
        user_agent,
        path,
        selected_agents,
        matched_rule: None,
        match_length: 0,
        reason: NoMatchingGroup,
      },
      candidates: [],
    }
  }
  let mut winner : Rule? = None
  let mut winner_length = -1
  let candidates : Array[RuleEvaluation] = []
  for rule in rules {
    let normalized = normalize_path(rule.pattern, true)
    let matched = pattern_match(normalized, path)
    let length = specificity(normalized)
    candidates.push({
      rule,
      normalized_pattern: normalized,
      matched,
      match_length: length,
    })
    if matched {
      let replace = length > winner_length ||
        (length == winner_length && rule.kind == Allow)
      if replace {
        winner = Some(rule)
        winner_length = length
      }
    }
  }
  let decision = match winner {
    Some(rule) =>
      {
        allowed: rule.kind == Allow,
        user_agent,
        path,
        selected_agents,
        matched_rule: Some(rule),
        match_length: winner_length,
        reason: MatchedRule,
      }
    None =>
      {
        allowed: true,
        user_agent,
        path,
        selected_agents,
        matched_rule: None,
        match_length: 0,
        reason: NoMatchingRule,
      }
  }
  { decision, candidates, }
}

///|
/// Evaluate whether a crawler may access a URL and retain the winning rule so
/// callers can explain the decision. An explicit Allow wins an equal-length
/// tie, as recommended by RFC 9309.
pub fn evaluate(
  robots : RobotsFile,
  user_agent : String,
  url : String,
) -> Decision {
  evaluate_trace(robots, user_agent, url).decision
}

///|
/// Boolean convenience API over `evaluate`.
pub fn is_allowed(
  robots : RobotsFile,
  user_agent : String,
  url : String,
) -> Bool {
  evaluate(robots, user_agent, url).allowed
}
