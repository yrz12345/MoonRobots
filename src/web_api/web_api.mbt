///|
/// Browser-facing entry point. The public boundary intentionally uses strings
/// only, keeping the generated JavaScript API small and stable.
#export_name("analyze")
pub fn analyze(source : String, user_agent : String, url : String) -> String {
  let file = @robots.parse(source)
  let trace = @robots.evaluate_trace(file, user_agent, url)
  let diagnostics = @robots.lint(file).map(@robots.diagnostic_json)
  let result : Json = {
    "engineVersion": Json(@robots.version()),
    "groups": Json(file.groups.length()),
    "rules": Json(
      file.groups.fold(init=0, fn(total, group) { total + group.rules.length() }),
    ),
    "sitemaps": Json(file.sitemaps),
    "diagnostics": Json(diagnostics),
    "trace": @robots.evaluation_trace_json(trace),
  }
  result.stringify()
}

///|
fn urls_from_text(source : String) -> Array[String] {
  let urls : Array[String] = []
  for raw in source.split("\n") {
    let url = raw.trim().to_owned()
    if url != "" && !url.has_prefix("#") {
      urls.push(url)
    }
  }
  urls
}

///|
/// Compare two policies from a browser or JavaScript integration.
#export_name("comparePolicies")
pub fn compare_policies(
  before : String,
  after : String,
  user_agent : String,
  urls : String,
) -> String {
  @robots.policy_comparison_json(
    @robots.compare_policies(
      @robots.parse(before),
      @robots.parse(after),
      user_agent,
      urls_from_text(urls),
    ),
  ).stringify()
}

///|
/// Analyze dynamic rule coverage from a browser or JavaScript integration.
#export_name("analyzeCoverage")
pub fn analyze_coverage(
  source : String,
  user_agent : String,
  urls : String,
) -> String {
  @robots.coverage_report_json(
    @robots.analyze_coverage(
      @robots.parse(source),
      user_agent,
      urls_from_text(urls),
    ),
  ).stringify()
}
