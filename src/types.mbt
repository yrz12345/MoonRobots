///|
/// Whether a robots.txt rule grants or denies access.
pub(all) enum RuleKind {
  Allow
  Disallow
} derive(Eq, Debug)

///|
/// A parsed Allow or Disallow record.
pub(all) struct Rule {
  kind : RuleKind
  pattern : String
  line : Int
} derive(Eq, Debug)

///|
/// One robots.txt group. Consecutive User-agent records share the rules that
/// follow them.
pub(all) struct Group {
  agents : Array[String]
  rules : Array[Rule]
  line : Int
} derive(Eq, Debug)

///|
/// Severity of a parser diagnostic.
pub(all) enum Severity {
  Info
  Warning
} derive(Eq, Debug)

///|
/// A non-fatal problem found while parsing an untrusted robots.txt file.
pub(all) struct Diagnostic {
  severity : Severity
  code : String
  line : Int
  message : String
} derive(Eq, Debug)

///|
/// Parsed robots.txt document. Unknown or malformed records do not prevent
/// valid records in the same file from being used.
pub(all) struct RobotsFile {
  groups : Array[Group]
  sitemaps : Array[String]
  diagnostics : Array[Diagnostic]
} derive(Eq, Debug)

///|
/// Why the engine reached its final decision.
pub(all) enum DecisionReason {
  ImplicitRobotsTxt
  NoMatchingGroup
  NoMatchingRule
  MatchedRule
} derive(Eq, Debug)

///|
/// Explainable result of evaluating one crawler and URL.
pub(all) struct Decision {
  allowed : Bool
  user_agent : String
  path : String
  selected_agents : Array[String]
  matched_rule : Rule?
  match_length : Int
  reason : DecisionReason
} derive(Eq, Debug)

///|
/// How one selected rule participated in a URL decision.
/// The normalized pattern is exposed so integrations can explain percent
/// encoding and UTF-8 matching instead of treating the engine as a black box.
pub(all) struct RuleEvaluation {
  rule : Rule
  normalized_pattern : String
  matched : Bool
  match_length : Int
} derive(Eq, Debug)

///|
/// A decision together with every rule considered in the selected group.
pub(all) struct EvaluationTrace {
  decision : Decision
  candidates : Array[RuleEvaluation]
} derive(Eq, Debug)
