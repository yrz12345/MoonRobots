///|
test "parse groups, comments, sitemaps and diagnostics" {
  let robots = parse(
    (
      #|# example
      #|Disallow: /orphan
      #|User-agent: FooBot
      #|User-agent: BarBot # inline comment
      #|Disallow: /private/
      #|Allow: /private/public/
      #|Sitemap: https://example.com/sitemap.xml
      #|Unknown: value
      #|User-agent: *
      #|Disallow:
      #|
    ),
  )
  inspect(robots.groups.length(), content="2")
  debug_inspect(robots.groups[0].agents, content="[\"foobot\", \"barbot\"]")
  inspect(robots.groups[0].rules.length(), content="2")
  inspect(robots.groups[1].rules.length(), content="0")
  debug_inspect(
    robots.sitemaps,
    content="[\"https://example.com/sitemap.xml\"]",
  )
  inspect(robots.diagnostics.length(), content="2")
}

///|
test "longest rule wins and allow wins equal ties" {
  let robots = parse(
    (
      #|User-agent: *
      #|Disallow: /docs/
      #|Allow: /docs/public/
      #|Disallow: /same
      #|Allow: /same
      #|
    ),
  )
  assert_false(is_allowed(robots, "AnyBot", "/docs/private/a"))
  assert_true(is_allowed(robots, "AnyBot", "/docs/public/a"))
  assert_true(is_allowed(robots, "AnyBot", "/same"))
}

///|
test "specific user agent groups merge and override wildcard" {
  let robots = parse(
    (
      #|User-agent: *
      #|Disallow: /common/
      #|User-agent: MoonBot
      #|Disallow: /moon/
      #|User-agent: MoonBot
      #|Disallow: /secret/
      #|
    ),
  )
  assert_true(is_allowed(robots, "MoonBot", "/common/a"))
  assert_false(is_allowed(robots, "MoonBot", "/moon/a"))
  assert_false(is_allowed(robots, "MoonBot", "/secret/a"))
  assert_false(is_allowed(robots, "Other", "/common/a"))
}

///|
test "wildcards, anchors and implicit robots access" {
  let robots = parse(
    (
      #|User-agent: *
      #|Disallow: /*.pdf$
      #|Disallow: /users/*/settings
      #|
    ),
  )
  assert_false(is_allowed(robots, "Bot", "/report.pdf"))
  assert_true(is_allowed(robots, "Bot", "/report.pdf?download=1"))
  assert_false(is_allowed(robots, "Bot", "/users/alice/settings/profile"))
  assert_true(is_allowed(robots, "Bot", "/robots.txt"))
}

///|
test "percent encoding follows RFC examples" {
  let robots = parse(
    (
      #|User-agent: *
      #|Disallow: /foo/bar/baz
      #|Disallow: /商品/
      #|
    ),
  )
  assert_false(is_allowed(robots, "Bot", "/foo/bar/%62%61%7A"))
  assert_false(is_allowed(robots, "Bot", "/%E5%95%86%E5%93%81/item"))
}

///|
test "decision contains explainable winning rule" {
  let robots = parse(
    (
      #|User-agent: MoonBot
      #|Disallow: /private/
      #|
    ),
  )
  let decision = evaluate(
    robots, "MoonBot", "https://example.com/private/report#section",
  )
  assert_false(decision.allowed)
  inspect(decision.path, content="/private/report")
  inspect(decision.match_length, content="9")
  guard decision.matched_rule is Some(rule) else { fail("expected rule") }
  inspect(rule.line, content="2")
}

///|
test "user-agent matching is exact and case insensitive" {
  let robots = parse(
    (
      #|User-agent: Bot
      #|Disallow: /bot-only/
      #|User-agent: NotABot
      #|Disallow: /other/
      #|
    ),
  )
  assert_false(is_allowed(robots, "bOt", "/bot-only/a"))
  assert_true(is_allowed(robots, "NotABot", "/bot-only/a"))
  assert_true(is_allowed(robots, "ExampleBot", "/bot-only/a"))
}

///|
test "query-only absolute URL keeps its query during matching" {
  let robots = parse(
    (
      #|User-agent: *
      #|Disallow: /?secret=1$
      #|
    ),
  )
  assert_false(is_allowed(robots, "Bot", "https://example.com?secret=1"))
  assert_true(is_allowed(robots, "Bot", "https://example.com?secret=2"))
}

///|
test "invalid product tokens and paths are diagnosed and ignored" {
  let robots = parse(
    (
      #|User-agent: Bad Bot
      #|Disallow: /ignored/
      #|User-agent: GoodBot
      #|Disallow: missing-slash
      #|Allow: /valid/
      #|
    ),
  )
  inspect(robots.diagnostics.length(), content="3")
  assert_true(is_allowed(robots, "GoodBot", "/missing-slash"))
  assert_true(is_allowed(robots, "GoodBot", "/valid/a"))
}

///|
test "encoded wildcard and dollar are literal" {
  let robots = parse(
    (
      #|User-agent: *
      #|Disallow: /literal-%2A
      #|Disallow: /price-%24
      #|
    ),
  )
  assert_false(is_allowed(robots, "Bot", "/literal-*"))
  assert_false(is_allowed(robots, "Bot", "/price-$"))
  assert_true(is_allowed(robots, "Bot", "/literal-anything"))
}

///|
test "wildcard can consume the entire target before an end anchor" {
  let robots = parse(
    (
      #|User-agent: *
      #|Disallow: *$
      #|
    ),
  )
  assert_false(is_allowed(robots, "Bot", "/anything/at/all"))
  assert_false(is_allowed(robots, "Bot", "/"))
}

///|
test "wildcard groups merge when no exact agent exists" {
  let robots = parse(
    (
      #|User-agent: *
      #|Disallow: /one/
      #|User-agent: *
      #|Disallow: /two/
      #|
    ),
  )
  assert_false(is_allowed(robots, "Bot", "/one/a"))
  assert_false(is_allowed(robots, "Bot", "/two/a"))
}

///|
test "empty and absent groups allow access" {
  let empty = parse("User-agent: EmptyBot\n")
  assert_true(is_allowed(empty, "EmptyBot", "/anything"))
  assert_true(is_allowed(empty, "OtherBot", "/anything"))
  let no_groups = parse("# only a comment\n")
  assert_true(is_allowed(no_groups, "Bot", "/anything"))
  inspect(no_groups.diagnostics.length(), content="1")
}

///|
test "CRLF input and field names are handled case insensitively" {
  let robots = parse(
    "USER-AGENT: DemoBot\r\nDISALLOW: /CaseSensitive/\r\nallow: /CaseSensitive/open\r\n",
  )
  assert_false(is_allowed(robots, "demobot", "/CaseSensitive/x"))
  assert_true(is_allowed(robots, "DEMOBOT", "/CaseSensitive/open/x"))
  assert_true(is_allowed(robots, "DemoBot", "/casesensitive/x"))
}

///|
test "decision JSON has stable integration fields" {
  let robots = parse("User-agent: *\nDisallow: /private/\n")
  let decision = evaluate(robots, "Bot", "/private/report")
  guard decision_json(decision) is Object(fields) else {
    fail("expected JSON object")
  }
  assert_eq(fields.get("allowed"), Some(Json(false)))
  assert_eq(fields.get("reason"), Some(Json("matched_rule")))
  guard fields.get("matchedRule") is Some(Object(rule)) else {
    fail("expected matched rule object")
  }
  assert_eq(rule.get("pattern"), Some(Json("/private/")))
  assert_eq(rule.get("line"), Some(Json(2)))
}

///|
test "semantic lint reports operational risks" {
  let robots = parse(
    (
      #|User-agent: Bot
      #|Disallow: /
      #|Disallow: /
      #|User-agent: Bot
      #|Sitemap: relative.xml
      #|Sitemap: relative.xml
      #|
    ),
  )
  let codes = lint(robots).map(item => item.code)
  assert_true(codes.contains("L001"))
  assert_true(codes.contains("L002"))
  assert_true(codes.contains("L003"))
  assert_true(codes.contains("L004"))
  assert_true(codes.contains("L005"))
  assert_true(codes.contains("L006"))
}

///|
test "evaluation trace exposes all selected rule candidates" {
  let robots = parse(
    (
      #|User-agent: *
      #|Disallow: /private/
      #|Allow: /private/public/
      #|Disallow: /reports/*.pdf$
      #|
    ),
  )
  let trace = evaluate_trace(robots, "MoonBot", "/private/public/index.html")
  assert_true(trace.decision.allowed)
  inspect(trace.candidates.length(), content="3")
  assert_true(trace.candidates[0].matched)
  assert_true(trace.candidates[1].matched)
  assert_false(trace.candidates[2].matched)
  inspect(trace.candidates[1].match_length, content="16")
}
