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
