///|
/// How a URL decision changed between two policies.
pub(all) enum PolicyChangeKind {
  NewlyAllowed
  NewlyDenied
} derive(Eq, Debug)

///|
/// One observable behavior change between an old and a new policy.
pub(all) struct PolicyChange {
  url : String
  kind : PolicyChangeKind
  before_decision : Decision
  after_decision : Decision
} derive(Eq, Debug)

///|
/// Aggregate impact of replacing one robots.txt policy with another.
pub(all) struct PolicyComparison {
  user_agent : String
  total_urls : Int
  unchanged : Int
  newly_allowed : Int
  newly_denied : Int
  changes : Array[PolicyChange]
} derive(Eq, Debug)

///|
/// Dynamic coverage for one selected rule over a URL corpus.
pub(all) struct RuleCoverage {
  rule : Rule
  matched_urls : Int
  winning_urls : Int
} derive(Eq, Debug)

///|
/// Coverage summary for every rule selected for a crawler product token.
pub(all) struct CoverageReport {
  user_agent : String
  selected_agents : Array[String]
  total_urls : Int
  allowed : Int
  denied : Int
  rules : Array[RuleCoverage]
} derive(Eq, Debug)

///|
/// Compare two policies over the same URL corpus. Only changes in the final
/// allow/deny behavior are reported; changes in the winning explanation that
/// preserve the outcome count as unchanged.
pub fn compare_policies(
  before : RobotsFile,
  after : RobotsFile,
  user_agent : String,
  urls : Array[String],
) -> PolicyComparison {
  let changes : Array[PolicyChange] = []
  let mut unchanged = 0
  let mut newly_allowed = 0
  let mut newly_denied = 0
  for url in urls {
    let before_decision = evaluate(before, user_agent, url)
    let after_decision = evaluate(after, user_agent, url)
    if before_decision.allowed == after_decision.allowed {
      unchanged = unchanged + 1
    } else if after_decision.allowed {
      newly_allowed = newly_allowed + 1
      changes.push({ url, kind: NewlyAllowed, before_decision, after_decision, })
    } else {
      newly_denied = newly_denied + 1
      changes.push({ url, kind: NewlyDenied, before_decision, after_decision, })
    }
  }
  {
    user_agent,
    total_urls: urls.length(),
    unchanged,
    newly_allowed,
    newly_denied,
    changes,
  }
}

///|
/// Measure which selected rules match and which actually win across a URL
/// corpus. A rule with matches but no wins is dynamically shadowed by more
/// specific rules for the supplied corpus.
pub fn analyze_coverage(
  robots : RobotsFile,
  user_agent : String,
  urls : Array[String],
) -> CoverageReport {
  let (selected, selected_agents) = selected_rules(robots, user_agent)
  let matched_counts : Array[Int] = []
  let winning_counts : Array[Int] = []
  for _ in selected {
    matched_counts.push(0)
    winning_counts.push(0)
  }
  let mut allowed = 0
  let mut denied = 0
  for url in urls {
    let trace = evaluate_trace(robots, user_agent, url)
    if trace.decision.allowed {
      allowed = allowed + 1
    } else {
      denied = denied + 1
    }
    for index, candidate in trace.candidates {
      if candidate.matched {
        matched_counts[index] = matched_counts[index] + 1
      }
      match trace.decision.matched_rule {
        Some(winner) =>
          if candidate.rule == winner {
            winning_counts[index] = winning_counts[index] + 1
          }
        None => ()
      }
    }
  }
  let rules : Array[RuleCoverage] = []
  for index, rule in selected {
    rules.push({
      rule,
      matched_urls: matched_counts[index],
      winning_urls: winning_counts[index],
    })
  }
  {
    user_agent,
    selected_agents,
    total_urls: urls.length(),
    allowed,
    denied,
    rules,
  }
}
