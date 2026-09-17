///|
fn is_hex(c : Char) -> Bool {
  (c >= '0' && c <= '9') || (c >= 'a' && c <= 'f') || (c >= 'A' && c <= 'F')
}

///|
fn hex_value(c : Char) -> Int {
  if c >= '0' && c <= '9' {
    c.to_int() - '0'.to_int()
  } else if c >= 'a' && c <= 'f' {
    c.to_int() - 'a'.to_int() + 10
  } else {
    c.to_int() - 'A'.to_int() + 10
  }
}

///|
fn hex_digit(value : Int) -> Char {
  "0123456789ABCDEF".get_char(value).unwrap()
}

///|
fn write_percent_byte(out : StringBuilder, value : Int) -> Unit {
  out.write_char('%')
  out.write_char(hex_digit((value >> 4) & 15))
  out.write_char(hex_digit(value & 15))
}

///|
fn is_unreserved_byte(value : Int) -> Bool {
  (value >= 'a'.to_int() && value <= 'z'.to_int()) ||
  (value >= 'A'.to_int() && value <= 'Z'.to_int()) ||
  (value >= '0'.to_int() && value <= '9'.to_int()) ||
  value == '-'.to_int() ||
  value == '.'.to_int() ||
  value == '_'.to_int() ||
  value == '~'.to_int()
}

///|
/// Normalize a URI path for robots matching. Non-ASCII UTF-8 bytes and
/// reserved percent-encoded bytes use uppercase percent triplets, while
/// percent-encoded unreserved ASCII bytes are decoded.
fn normalize_path(input : String, preserve_pattern_tokens : Bool) -> String {
  let bytes = @utf8.encode(input)
  let out = StringBuilder(size_hint=bytes.length() * 3)
  let mut index = 0
  while index < bytes.length() {
    let value = bytes[index].to_int()
    if value == '%'.to_int() &&
      index + 2 < bytes.length() &&
      is_hex(bytes[index + 1].to_char()) &&
      is_hex(bytes[index + 2].to_char()) {
      let decoded = hex_value(bytes[index + 1].to_char()) * 16 +
        hex_value(bytes[index + 2].to_char())
      if is_unreserved_byte(decoded) {
        out.write_char(decoded.to_char().unwrap())
      } else {
        write_percent_byte(out, decoded)
      }
      index = index + 3
    } else if value < 128 {
      if value == '%'.to_int() {
        write_percent_byte(out, value)
      } else if !preserve_pattern_tokens &&
        (value == '*'.to_int() || value == '$'.to_int()) {
        // In a requested URI these are literal characters, not rule tokens.
        write_percent_byte(out, value)
      } else {
        out.write_char(value.to_char().unwrap())
      }
      index = index + 1
    } else {
      write_percent_byte(out, value)
      index = index + 1
    }
  }
  out.to_string()
}

///|
fn path_from_url(url : String) -> String {
  let without_fragment = match url.find("#") {
    Some(index) => url[:index].to_owned()
    None => url
  }
  match without_fragment.find("://") {
    Some(scheme_end) => {
      let authority_start = scheme_end + 3
      let rest = without_fragment[authority_start:].to_owned()
      let slash = rest.find("/")
      let query = rest.find("?")
      match (slash, query) {
        (Some(path_at), Some(query_at)) =>
          if path_at < query_at {
            without_fragment[authority_start + path_at:].to_owned()
          } else {
            "/" + rest[query_at:].to_owned()
          }
        (Some(path_at), None) =>
          without_fragment[authority_start + path_at:].to_owned()
        (None, Some(query_at)) => "/" + rest[query_at:].to_owned()
        (None, None) => "/"
      }
    }
    None =>
      if without_fragment.has_prefix("/") {
        without_fragment
      } else {
        "/" + without_fragment
      }
  }
}
