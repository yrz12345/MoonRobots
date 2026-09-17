(() => {
  function _M0DTPB4Json4Null() {}
  _M0DTPB4Json4Null.prototype.$tag = 0;
  const _M0DTPB4Json4Null__ = new _M0DTPB4Json4Null();
  function _M0DTPB4Json4True() {}
  _M0DTPB4Json4True.prototype.$tag = 1;
  const _M0DTPB4Json4True__ = new _M0DTPB4Json4True();
  function _M0DTPB4Json5False() {}
  _M0DTPB4Json5False.prototype.$tag = 2;
  const _M0DTPB4Json5False__ = new _M0DTPB4Json5False();
  function _M0DTPB4Json6Number(param0, param1) {
    this._0 = param0;
    this._1 = param1;
  }
  _M0DTPB4Json6Number.prototype.$tag = 3;
  function _M0DTPB4Json6String(param0) {
    this._0 = param0;
  }
  _M0DTPB4Json6String.prototype.$tag = 4;
  function _M0DTPB4Json5Array(param0) {
    this._0 = param0;
  }
  _M0DTPB4Json5Array.prototype.$tag = 5;
  function _M0DTPB4Json6Object(param0) {
    this._0 = param0;
  }
  _M0DTPB4Json6Object.prototype.$tag = 6;
  function _M0TPB13StringBuilder(param0) {
    this.val = param0;
  }
  function _M0TPC16string10StringView(param0, param1, param2) {
    this.str = param0;
    this.start = param1;
    this.end = param2;
  }
  class $PanicError extends Error {}
  function $panic() {
    throw new $PanicError();
  }
  const _M0FPB12random__seed = () => {
    if (globalThis.crypto?.getRandomValues) {
      const array = new Uint32Array(1);
      globalThis.crypto.getRandomValues(array);
      return array[0] | 0; // Convert to signed 32
    } else {
      return Math.floor(Math.random() * 0x100000000) | 0; // Fallback to Math.random
    }
  };
  function _M0TPB4IterGUsRPB4JsonEE(param0, param1) {
    this.f = param0;
    this.size_hint = param1;
  }
  function _M0TPB4IterGcE(param0, param1) {
    this.f = param0;
    this.size_hint = param1;
  }
  function $oob() {
    throw new Error("Index out of bounds");
  }
  function _M0TPB8MutLocalGiE(param0) {
    this.val = param0;
  }
  function $make_array_len_and_init(a, b) {
    const arr = new Array(a);
    arr.fill(b);
    return arr;
  }
  const _M0MPB7JSArray4push = (arr, val) => { arr.push(val); };
  function _M0TPB4IterGRPC16string10StringViewE(param0, param1) {
    this.f = param0;
    this.size_hint = param1;
  }
  function _M0TPB8MutLocalGORPC16string10StringViewE(param0) {
    this.val = param0;
  }
  function _M0TPB3MapGsRPB4JsonE(param0, param1, param2, param3, param4, param5, param6) {
    this.entries = param0;
    this.size = param1;
    this.capacity = param2;
    this.capacity_mask = param3;
    this.grow_at = param4;
    this.head = param5;
    this.tail = param6;
  }
  function _M0TPB5EntryGsRPB4JsonE(param0, param1, param2, param3, param4, param5) {
    this.prev = param0;
    this.next = param1;
    this.psl = param2;
    this.hash = param3;
    this.key = param4;
    this.value = param5;
  }
  function _M0TPB8MutLocalGORPB5EntryGsRPB4JsonEE(param0) {
    this.val = param0;
  }
  const _M0MPB7JSArray4copy = (arr) => arr.slice(0);
  const _M0MPB7JSArray3pop = (arr) => arr.pop();
  const _M0FPC28encoding4utf816encode__utf8__js = (() => {
     const encoder = new TextEncoder();
     return function(src, start, len, bom) {
       const end = start + len;
       const encoded = encoder.encode(src.slice(start, end));
       if (!bom) {
         return encoded;
       }
       const result = new Uint8Array(encoded.length + 3);
       result[0] = 0xEF;
       result[1] = 0xBB;
       result[2] = 0xBF;
       result.set(encoded, 3);
       return result;
     };
   })();
  function _M0DTPC14json10WriteFrame5Array(param0, param1) {
    this._0 = param0;
    this._1 = param1;
  }
  _M0DTPC14json10WriteFrame5Array.prototype.$tag = 0;
  function _M0DTPC14json10WriteFrame6Object(param0, param1) {
    this._0 = param0;
    this._1 = param1;
  }
  _M0DTPC14json10WriteFrame6Object.prototype.$tag = 1;
  function _M0TPB9ArrayViewGUsRPB4JsonEE(param0, param1, param2) {
    this.buf = param0;
    this.start = param1;
    this.end = param2;
  }
  function _M0TP28yrz1234510moonrobots10Diagnostic(param0, param1, param2, param3) {
    this.severity = param0;
    this.code = param1;
    this.line = param2;
    this.message = param3;
  }
  function _M0TP28yrz1234510moonrobots5Group(param0, param1, param2) {
    this.agents = param0;
    this.rules = param1;
    this.line = param2;
  }
  function _M0TP28yrz1234510moonrobots4Rule(param0, param1, param2) {
    this.kind = param0;
    this.pattern = param1;
    this.line = param2;
  }
  function _M0TP28yrz1234510moonrobots10RobotsFile(param0, param1, param2) {
    this.groups = param0;
    this.sitemaps = param1;
    this.diagnostics = param2;
  }
  function _M0TP28yrz1234510moonrobots15EvaluationTrace(param0, param1) {
    this.decision = param0;
    this.candidates = param1;
  }
  function _M0TP28yrz1234510moonrobots8Decision(param0, param1, param2, param3, param4, param5, param6) {
    this.allowed = param0;
    this.user_agent = param1;
    this.path = param2;
    this.selected_agents = param3;
    this.matched_rule = param4;
    this.match_length = param5;
    this.reason = param6;
  }
  function _M0TP28yrz1234510moonrobots14RuleEvaluation(param0, param1, param2, param3) {
    this.rule = param0;
    this.normalized_pattern = param1;
    this.matched = param2;
    this.match_length = param3;
  }
  const _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger = { method_0: _M0IPB13StringBuilderPB6Logger13write__string, method_1: _M0IP016_24default__implPB6Logger16write__substringGRPB13StringBuilderE, method_2: _M0IPB13StringBuilderPB6Logger11write__view, method_3: _M0IPB13StringBuilderPB6Logger11write__char, method_4: _M0IP016_24default__implPB6Logger28write__string__interpolationGRPB13StringBuilderE, method_5: _M0IP016_24default__implPB6Logger5writeGRPB13StringBuilderE };
  const _M0MPC16string10StringView4trimN7_2abindS6841 = "\t\n\r ";
  const _M0MPC16string6String4trimN7_2abindS6942 = "\t\n\r ";
  const _M0FPB4null = _M0DTPB4Json4Null__;
  const _M0MPB4Iter4nextN6constrS9918GRPC16string10StringViewE = 0;
  const _M0MPB4Iter4nextN6constrS9919GRPC16string10StringViewE = 0;
  const _M0MPB4Iter4nextN6constrS9918GcE = 0;
  const _M0MPB4Iter4nextN6constrS9919GcE = 0;
  const _M0MPB4Iter3newN6constrS9926GUsRPB4JsonEE = 0;
  const _M0MPB4Iter3newN6constrS9926GcE = 0;
  const _M0FP28yrz1234510moonrobots4lintN7_2abindS259 = "https://";
  const _M0FP28yrz1234510moonrobots4lintN7_2abindS260 = "http://";
  const _M0FP28yrz1234510moonrobots5parseN7_2abindS302 = "\n";
  const _M0FP28yrz1234510moonrobots5parseN7_2abindS273 = "\r";
  const _M0FP28yrz1234510moonrobots5parseN7_2abindS274 = "#";
  const _M0FP28yrz1234510moonrobots5parseN7_2abindS286 = ":";
  const _M0FP28yrz1234510moonrobots5parseN7_2abindS280 = "/";
  const _M0FP28yrz1234510moonrobots5parseN7_2abindS281 = "*";
  const _M0FP28yrz1234510moonrobots15path__from__urlN7_2abindS324 = "#";
  const _M0FP28yrz1234510moonrobots15path__from__urlN7_2abindS318 = "://";
  const _M0FP28yrz1234510moonrobots15path__from__urlN7_2abindS316 = "/";
  const _M0FP28yrz1234510moonrobots15path__from__urlN7_2abindS315 = "?";
  const _M0FP28yrz1234510moonrobots15path__from__urlN7_2abindS317 = "/";
  const _M0FP28yrz1234510moonrobots14pattern__matchN7_2abindS330 = "$";
  const _M0FP28yrz1234510moonrobots15evaluate__traceN7_2abindS373 = "/robots.txt?";
  const _M0MPC16string10StringView4findN6constrS9928 = 0;
  const _M0FPB4seed = _M0FPB12random__seed();
  const _M0FPC17prelude4null = _M0FPB4null;
  function _M0FPB13consume4__acc(acc, input) {
    const _p = (acc >>> 0) + ((Math.imul(input, -1028477379) | 0) >>> 0) | 0;
    const _p$2 = 17;
    return Math.imul(_p << _p$2 | (_p >>> (32 - _p$2 | 0) | 0), 668265263) | 0;
  }
  function _M0MPB13StringBuilder13write__objectGdE(self, obj) {
    _M0IP016_24default__implPB4Show6outputGdE(obj, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
  }
  function _M0MPB13StringBuilder21StringBuilder_2einner(size_hint) {
    return new _M0TPB13StringBuilder("");
  }
  function _M0IPB13StringBuilderPB6Logger11write__char(self, ch) {
    self.val = `${self.val}${String.fromCodePoint(ch)}`;
  }
  function _M0IPB13StringBuilderPB6Logger13write__string(self, str) {
    self.val = `${self.val}${str}`;
  }
  function _M0FPB32code__point__of__surrogate__pair(leading, trailing) {
    return (((Math.imul(leading - 55296 | 0, 1024) | 0) + trailing | 0) - 56320 | 0) + 65536 | 0;
  }
  function _M0MPC16string6String16unsafe__char__at(self, index) {
    const c1 = self.charCodeAt(index);
    if (c1 >= 55296 && c1 <= 56319) {
      const c2 = self.charCodeAt(index + 1 | 0);
      return _M0FPB32code__point__of__surrogate__pair(c1, c2);
    } else {
      return c1;
    }
  }
  function _M0MPC14byte4Byte7to__hexN14to__hex__digitS4044(i) {
    if (i < 10) {
      const _p = 48;
      const _p$2 = (i + _p | 0) & 255;
      return _p$2;
    } else {
      const _p = 97;
      const _p$2 = (i + _p | 0) & 255;
      const _p$3 = 10;
      const _p$4 = (_p$2 - _p$3 | 0) & 255;
      return _p$4;
    }
  }
  function _M0MPC14byte4Byte7to__hex(b) {
    const _self = _M0MPB13StringBuilder21StringBuilder_2einner(0);
    const _p = 16;
    _M0IPB13StringBuilderPB6Logger11write__char(_self, _M0MPC14byte4Byte7to__hexN14to__hex__digitS4044((b / _p | 0) & 255));
    const _p$2 = 16;
    _M0IPB13StringBuilderPB6Logger11write__char(_self, _M0MPC14byte4Byte7to__hexN14to__hex__digitS4044((b % _p$2 | 0) & 255));
    const _p$3 = _self;
    return _p$3.val;
  }
  function _M0MPC16string10StringView12view_2einner(self, start_offset, end_offset) {
    let end_offset$2;
    if (end_offset === undefined) {
      end_offset$2 = self.end - self.start | 0;
    } else {
      const _Some = end_offset;
      end_offset$2 = _Some;
    }
    if (start_offset >= 0 && (start_offset <= end_offset$2 && end_offset$2 <= (self.end - self.start | 0))) {
      return new _M0TPC16string10StringView(self.str, self.start + start_offset | 0, self.start + end_offset$2 | 0);
    } else {
      return $panic();
    }
  }
  function _M0FPB14avalanche__acc(acc) {
    let acc$2 = acc;
    acc$2 = acc$2 ^ (acc$2 >>> 15 | 0);
    acc$2 = Math.imul(acc$2, -2048144777) | 0;
    acc$2 = acc$2 ^ (acc$2 >>> 13 | 0);
    acc$2 = Math.imul(acc$2, -1028477379) | 0;
    acc$2 = acc$2 ^ (acc$2 >>> 16 | 0);
    return acc$2;
  }
  function _M0FPB13finalize__acc(acc) {
    return _M0FPB14avalanche__acc(acc);
  }
  function _M0IP016_24default__implPB6Logger28write__string__interpolationGRPB13StringBuilderE(self, show) {
    show.method_table.method_0(show.self, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
  }
  function _M0IP016_24default__implPB6Logger5writeGRPB13StringBuilderE(self, show) {
    show.method_table.method_0(show.self, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
  }
  function _M0MPC16string6String21clamped__view_2einner(self, start, end) {
    const len = self.length;
    let lo = start < 0 ? 0 : start > len ? len : start;
    let hi;
    if (end === undefined) {
      hi = len;
    } else {
      const _Some = end;
      const _e = _Some;
      hi = _e < 0 ? 0 : _e > len ? len : _e;
    }
    let _tmp;
    if (lo > 0) {
      let _tmp$2;
      if (lo < len) {
        let _tmp$3;
        const _p = self.charCodeAt(lo);
        if (_p >= 56320 && _p <= 57343) {
          const _p$2 = self.charCodeAt(lo - 1 | 0);
          _tmp$3 = _p$2 >= 55296 && _p$2 <= 56319;
        } else {
          _tmp$3 = false;
        }
        _tmp$2 = _tmp$3;
      } else {
        _tmp$2 = false;
      }
      _tmp = _tmp$2;
    } else {
      _tmp = false;
    }
    if (_tmp) {
      lo = lo + 1 | 0;
    }
    let _tmp$2;
    if (hi > 0) {
      let _tmp$3;
      if (hi < len) {
        let _tmp$4;
        const _p = self.charCodeAt(hi);
        if (_p >= 56320 && _p <= 57343) {
          const _p$2 = self.charCodeAt(hi - 1 | 0);
          _tmp$4 = _p$2 >= 55296 && _p$2 <= 56319;
        } else {
          _tmp$4 = false;
        }
        _tmp$3 = _tmp$4;
      } else {
        _tmp$3 = false;
      }
      _tmp$2 = _tmp$3;
    } else {
      _tmp$2 = false;
    }
    if (_tmp$2) {
      hi = hi - 1 | 0;
    }
    return lo >= hi ? new _M0TPC16string10StringView(self, lo, lo) : new _M0TPC16string10StringView(self, lo, hi);
  }
  function _M0IP016_24default__implPB6Logger16write__substringGRPB13StringBuilderE(self, value, start, len) {
    _M0IPB13StringBuilderPB6Logger11write__view(self, _M0MPC16string6String21clamped__view_2einner(value, start, start + len | 0));
  }
  function _M0IP016_24default__implPB4Show6outputGdE(self, logger) {
    logger.method_table.method_0(logger.self, _M0IPC16double6DoublePB4Show10to__string(self));
  }
  function _M0MPB4Iter4nextGRPC16string10StringViewE(self) {
    const _func = self.f;
    const result = _func();
    const _bind = self.size_hint;
    if (result === undefined) {
      self.size_hint = _M0MPB4Iter4nextN6constrS9919GRPC16string10StringViewE;
    } else {
      if (_bind === undefined) {
      } else {
        const _Some = _bind;
        const _n = _Some;
        self.size_hint = _n > 0 ? _n - 1 | 0 : _M0MPB4Iter4nextN6constrS9918GRPC16string10StringViewE;
      }
    }
    return result;
  }
  function _M0MPB4Iter4nextGcE(self) {
    const _func = self.f;
    const result = _func();
    const _bind = self.size_hint;
    if (result === -1) {
      self.size_hint = _M0MPB4Iter4nextN6constrS9919GcE;
    } else {
      if (_bind === undefined) {
      } else {
        const _Some = _bind;
        const _n = _Some;
        self.size_hint = _n > 0 ? _n - 1 | 0 : _M0MPB4Iter4nextN6constrS9918GcE;
      }
    }
    return result;
  }
  function _M0MPB4Iter3newGUsRPB4JsonEE(f, size_hint) {
    let size_hint$2;
    if (size_hint === undefined) {
      size_hint$2 = undefined;
    } else {
      const _Some = size_hint;
      const _n = _Some;
      size_hint$2 = _n > 0 ? _n : _M0MPB4Iter3newN6constrS9926GUsRPB4JsonEE;
    }
    return new _M0TPB4IterGUsRPB4JsonEE(f, size_hint$2);
  }
  function _M0MPB4Iter3newGcE(f, size_hint) {
    let size_hint$2;
    if (size_hint === undefined) {
      size_hint$2 = undefined;
    } else {
      const _Some = size_hint;
      const _n = _Some;
      size_hint$2 = _n > 0 ? _n : _M0MPB4Iter3newN6constrS9926GcE;
    }
    return new _M0TPB4IterGcE(f, size_hint$2);
  }
  function _M0MPC16string10StringView9to__owned(self) {
    return self.str.substring(self.start, self.end);
  }
  function _M0MPC16string10StringView4iter(self) {
    const start = self.start;
    const end = self.end;
    const index = new _M0TPB8MutLocalGiE(start);
    return _M0MPB4Iter3newGcE(() => {
      if (index.val < end) {
        const c1 = self.str.charCodeAt(index.val);
        if (c1 >= 55296 && c1 <= 56319 && (index.val + 1 | 0) < self.end) {
          const c2 = self.str.charCodeAt(index.val + 1 | 0);
          if (c2 >= 56320 && c2 <= 57343) {
            index.val = index.val + 2 | 0;
            return _M0FPB32code__point__of__surrogate__pair(c1, c2);
          }
        }
        index.val = index.val + 1 | 0;
        return c1;
      } else {
        return -1;
      }
    }, undefined);
  }
  function _M0MPC16string6String20unsafe__range__equal(self, self_off, other, other_off, len) {
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < len) {
        const _p = self.charCodeAt(self_off + i | 0);
        const _p$2 = other.charCodeAt(other_off + i | 0);
        if (_p === _p$2) {
        } else {
          return false;
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return true;
  }
  function _M0MPC16string6String31offset__of__nth__char__backward(self, n, start_offset, end_offset) {
    let _tmp = end_offset;
    let _tmp$2 = 0;
    while (true) {
      const utf16_offset = _tmp;
      const char_count = _tmp$2;
      if ((utf16_offset - 1 | 0) >= start_offset && char_count < n) {
        const c = self.charCodeAt(utf16_offset - 1 | 0);
        if (c >= 56320 && c <= 57343) {
          _tmp = utf16_offset - 2 | 0;
          _tmp$2 = char_count + 1 | 0;
          continue;
        } else {
          _tmp = utf16_offset - 1 | 0;
          _tmp$2 = char_count + 1 | 0;
          continue;
        }
      } else {
        return char_count < n || utf16_offset < start_offset ? undefined : utf16_offset;
      }
    }
  }
  function _M0MPC16string6String30offset__of__nth__char__forward(self, n, start_offset, end_offset) {
    if (start_offset >= 0 && start_offset <= end_offset) {
      let _tmp = start_offset;
      let _tmp$2 = 0;
      while (true) {
        const utf16_offset = _tmp;
        const char_count = _tmp$2;
        if (utf16_offset < end_offset && char_count < n) {
          const c = self.charCodeAt(utf16_offset);
          if (c >= 55296 && c <= 56319) {
            _tmp = utf16_offset + 2 | 0;
            _tmp$2 = char_count + 1 | 0;
            continue;
          } else {
            _tmp = utf16_offset + 1 | 0;
            _tmp$2 = char_count + 1 | 0;
            continue;
          }
        } else {
          return char_count < n || utf16_offset >= end_offset ? undefined : utf16_offset;
        }
      }
    } else {
      return $panic();
    }
  }
  function _M0MPC16string6String29offset__of__nth__char_2einner(self, i, start_offset, end_offset) {
    let end_offset$2;
    if (end_offset === undefined) {
      end_offset$2 = self.length;
    } else {
      const _Some = end_offset;
      end_offset$2 = _Some;
    }
    return i >= 0 ? _M0MPC16string6String30offset__of__nth__char__forward(self, i, start_offset, end_offset$2) : _M0MPC16string6String31offset__of__nth__char__backward(self, -i | 0, start_offset, end_offset$2);
  }
  function _M0MPC16string6String12view_2einner(self, start_offset, end_offset) {
    let end_offset$2;
    if (end_offset === undefined) {
      end_offset$2 = self.length;
    } else {
      const _Some = end_offset;
      end_offset$2 = _Some;
    }
    if (start_offset >= 0 && (start_offset <= end_offset$2 && end_offset$2 <= self.length)) {
      return new _M0TPC16string10StringView(self, start_offset, end_offset$2);
    } else {
      return $panic();
    }
  }
  function _M0IPB13StringBuilderPB6Logger11write__view(self, str) {
    self.val = `${self.val}${_M0MPC16string10StringView9to__owned(str)}`;
  }
  function _M0FPB19kmp__failure__table(pattern) {
    const m = pattern.end - pattern.start | 0;
    const table = $make_array_len_and_init(m, 0);
    let k = 0;
    let _tmp = 1;
    while (true) {
      const i = _tmp;
      if (i < m) {
        const c = pattern.str.charCodeAt(pattern.start + i | 0);
        while (true) {
          let _tmp$2;
          if (k > 0) {
            const _p = pattern.str.charCodeAt(pattern.start + k | 0);
            _tmp$2 = c !== _p;
          } else {
            _tmp$2 = false;
          }
          if (_tmp$2) {
            const _tmp$3 = k - 1 | 0;
            k = _tmp$3 >>> 0 < table.length ? table[_tmp$3] : $oob();
            continue;
          } else {
            break;
          }
        }
        const _p = pattern.str.charCodeAt(pattern.start + k | 0);
        if (c === _p) {
          k = k + 1 | 0;
        }
        if (i >>> 0 < table.length) {
          table[i] = k;
        } else {
          $oob();
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return table;
  }
  function _M0FPB24find__pattern__kmp__from(target, pattern, start) {
    const n = target.end - target.start | 0;
    const m = pattern.end - pattern.start | 0;
    const table = _M0FPB19kmp__failure__table(pattern);
    let k = 0;
    let _tmp = start;
    while (true) {
      const i = _tmp;
      if (i < n) {
        const c = target.str.charCodeAt(target.start + i | 0);
        while (true) {
          let _tmp$2;
          if (k > 0) {
            const _p = pattern.str.charCodeAt(pattern.start + k | 0);
            _tmp$2 = c !== _p;
          } else {
            _tmp$2 = false;
          }
          if (_tmp$2) {
            const _tmp$3 = k - 1 | 0;
            k = _tmp$3 >>> 0 < table.length ? table[_tmp$3] : $oob();
            continue;
          } else {
            break;
          }
        }
        const _p = pattern.str.charCodeAt(pattern.start + k | 0);
        if (c === _p) {
          k = k + 1 | 0;
        }
        if (k === m) {
          return (i - m | 0) + 1 | 0;
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return undefined;
  }
  function _M0FPB36find__two__anchor__candidate__scalar(data, start, candidate_end, first, last_offset, last) {
    let _tmp = start;
    while (true) {
      const pos = _tmp;
      if (pos < candidate_end) {
        let _tmp$2;
        const _p = data.charCodeAt(pos);
        if (_p === first) {
          const _p$2 = data.charCodeAt(pos + last_offset | 0);
          _tmp$2 = _p$2 === last;
        } else {
          _tmp$2 = false;
        }
        if (_tmp$2) {
          return pos;
        }
        _tmp = pos + 1 | 0;
        continue;
      } else {
        return -1;
      }
    }
  }
  function _M0FPB42find__two__anchor__candidate__from__string(data, start, candidate_end, first, last_offset, last) {
    return _M0FPB36find__two__anchor__candidate__scalar(data, start, candidate_end, first, last_offset, last);
  }
  function _M0FPB21string__ranges__equal(left, left_start, right, right_start, length) {
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < length) {
        const _p = left.charCodeAt(left_start + i | 0);
        const _p$2 = right.charCodeAt(right_start + i | 0);
        if (_p !== _p$2) {
          return false;
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return true;
  }
  function _M0FPB22find__by__two__anchors(target, pattern) {
    const target_len = target.end - target.start | 0;
    const pattern_len = pattern.end - pattern.start | 0;
    const target_start = target.start;
    const pattern_start = pattern.start;
    const last_offset = pattern_len - 1 | 0;
    const candidate_end = ((target_start + target_len | 0) - pattern_len | 0) + 1 | 0;
    const first = pattern.str.charCodeAt(pattern.start);
    const last = pattern.str.charCodeAt(pattern.start + last_offset | 0);
    const middle_len = last_offset - 1 | 0;
    let _tmp = target_start;
    let _tmp$2 = 0;
    while (true) {
      const pos = _tmp;
      const failures = _tmp$2;
      if (pos < candidate_end) {
        const found = _M0FPB42find__two__anchor__candidate__from__string(target.str, pos, candidate_end, first, last_offset, last);
        if (found < 0) {
          return undefined;
        }
        if (_M0FPB21string__ranges__equal(target.str, found + 1 | 0, pattern.str, pattern_start + 1 | 0, middle_len)) {
          return found - target_start | 0;
        }
        const failures$2 = failures + 1 | 0;
        const scanned = found - target_start | 0;
        if (failures$2 > 64 || failures$2 > (4 + (scanned / 8 | 0) | 0)) {
          return _M0FPB24find__pattern__kmp__from(target, pattern, scanned + 1 | 0);
        }
        _tmp = found + 1 | 0;
        _tmp$2 = failures$2;
        continue;
      } else {
        return undefined;
      }
    }
  }
  function _M0FPB24find__code__unit__scalar(data, start, end, code) {
    let _tmp = start;
    while (true) {
      const pos = _tmp;
      if (pos < end) {
        const _p = data.charCodeAt(pos);
        if (_p === code) {
          return pos;
        }
        _tmp = pos + 1 | 0;
        continue;
      } else {
        return -1;
      }
    }
  }
  function _M0FPB30find__code__unit__from__string(data, start, end, code) {
    return _M0FPB24find__code__unit__scalar(data, start, end, code);
  }
  function _M0FPB28find__code__unit__from__view(target, start, end, code) {
    const target_start = target.start;
    const found = _M0FPB30find__code__unit__from__string(target.str, target_start + start | 0, target_start + end | 0, code);
    return found < 0 ? -1 : found - target_start | 0;
  }
  function _M0MPC16string10StringView4find(self, str) {
    const pattern_len = str.end - str.start | 0;
    switch (pattern_len) {
      case 0: {
        return _M0MPC16string10StringView4findN6constrS9928;
      }
      case 1: {
        const found = _M0FPB28find__code__unit__from__view(self, 0, self.end - self.start | 0, str.str.charCodeAt(str.start));
        return found < 0 ? undefined : found;
      }
      default: {
        return pattern_len > (self.end - self.start | 0) ? undefined : _M0FPB22find__by__two__anchors(self, str);
      }
    }
  }
  function _M0MPC16string6String4find(self, str) {
    return _M0MPC16string10StringView4find(new _M0TPC16string10StringView(self, 0, self.length), str);
  }
  function _M0MPC16string6String6repeat(self, n) {
    if (n < 0) {
      return $panic();
    } else {
      if (n === 0) {
        return "";
      } else {
        if (n === 1) {
          return self;
        } else {
          const len = self.length;
          const total = Math.imul(len, n) | 0;
          if (len === 0 || (total / n | 0) === len) {
            const buf = _M0MPB13StringBuilder21StringBuilder_2einner(total);
            const str = self;
            let _tmp = 0;
            while (true) {
              const _ = _tmp;
              if (_ < n) {
                _M0IPB13StringBuilderPB6Logger13write__string(buf, str);
                _tmp = _ + 1 | 0;
                continue;
              } else {
                break;
              }
            }
            return buf.val;
          } else {
            return $panic();
          }
        }
      }
    }
  }
  function _M0MPC16string6String8find__by(self, pred) {
    const _p = new _M0TPC16string10StringView(self, 0, self.length);
    const _p$2 = _p.str;
    const _p$3 = _p.start;
    const _p$4 = _p.end;
    let _tmp = _p$3;
    let _tmp$2 = 0;
    while (true) {
      const _p$5 = _tmp;
      const _p$6 = _tmp$2;
      if (_p$5 < _p$4) {
        let _p$7;
        let _p$8;
        _L: {
          const _p$9 = _p$2.charCodeAt(_p$5);
          if (_p$9 >= 55296 && _p$9 <= 56319 && (_p$5 + 1 | 0) < _p$4) {
            const _p$10 = _p$2.charCodeAt(_p$5 + 1 | 0);
            if (_p$10 >= 56320 && _p$10 <= 57343) {
              const _tmp$3 = _p$5 + 2 | 0;
              const _p$11 = (((Math.imul(_p$9 - 55296 | 0, 1024) | 0) + _p$10 | 0) - 56320 | 0) + 65536 | 0;
              _p$7 = _tmp$3;
              _p$8 = _p$11;
              break _L;
            } else {
              const _tmp$3 = _p$5 + 1 | 0;
              const _p$11 = _p$9;
              _p$7 = _tmp$3;
              _p$8 = _p$11;
              break _L;
            }
          } else {
            const _tmp$3 = _p$5 + 1 | 0;
            const _p$10 = _p$9;
            _p$7 = _tmp$3;
            _p$8 = _p$10;
            break _L;
          }
        }
        if (pred(_p$8)) {
          return _p$6;
        }
        _tmp = _p$7;
        const _p$9 = _p$8;
        _tmp$2 = _p$6 + (_p$9 <= 65535 ? 1 : 2) | 0;
        continue;
      } else {
        return undefined;
      }
    }
  }
  function _M0MPC16string10StringView11has__suffix(self, str) {
    const self_len = self.end - self.start | 0;
    const str_len = str.end - str.start | 0;
    if (str_len <= self_len) {
      const start = self_len - str_len | 0;
      let _tmp;
      if (str_len === 0) {
        _tmp = true;
      } else {
        const _p = self.str.charCodeAt(self.start + start | 0);
        const _p$2 = str.str.charCodeAt(str.start);
        _tmp = _p === _p$2;
      }
      if (_tmp) {
        return _M0MPC16string6String20unsafe__range__equal(self.str, self.start + start | 0, str.str, str.start, str_len);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  function _M0MPC16string6String11has__suffix(self, str) {
    return _M0MPC16string10StringView11has__suffix(new _M0TPC16string10StringView(self, 0, self.length), str);
  }
  function _M0MPC16string10StringView11has__prefix(self, str) {
    const str_len = str.end - str.start | 0;
    if (str_len <= (self.end - self.start | 0)) {
      let _tmp;
      if (str_len === 0) {
        _tmp = true;
      } else {
        const _p = self.str.charCodeAt(self.start);
        const _p$2 = str.str.charCodeAt(str.start);
        _tmp = _p === _p$2;
      }
      if (_tmp) {
        return _M0MPC16string6String20unsafe__range__equal(self.str, self.start, str.str, str.start, str_len);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  function _M0MPC16string6String11has__prefix(self, str) {
    return _M0MPC16string10StringView11has__prefix(new _M0TPC16string10StringView(self, 0, self.length), str);
  }
  function _M0MPC15array5Array4pushGRP28yrz1234510moonrobots10DiagnosticE(self, value) {
    _M0MPB7JSArray4push(self, value);
  }
  function _M0MPC15array5Array4pushGcE(self, value) {
    _M0MPB7JSArray4push(self, value);
  }
  function _M0FPB36string__contains__code__unit__scalar(str, start, end, code) {
    let _tmp = start;
    while (true) {
      const i = _tmp;
      if (i < end) {
        const _p = str.charCodeAt(i);
        if (_p === code) {
          return true;
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return false;
  }
  function _M0FPB28string__contains__code__unit(str, start, end, code) {
    return _M0FPB36string__contains__code__unit__scalar(str, start, end, code);
  }
  function _M0MPC16string10StringView20contains__code__unit(self, code) {
    return _M0FPB28string__contains__code__unit(self.str, self.start, self.end, code);
  }
  function _M0FPB23build__ascii__char__set(chars) {
    let bits0 = 0;
    let bits1 = 0;
    let bits2 = 0;
    let bits3 = 0;
    const _bind = chars.str;
    const _bind$2 = chars.start;
    const _bind$3 = chars.end;
    let _tmp = _bind$2;
    while (true) {
      const _string_index = _tmp;
      if (_string_index < _bind$3) {
        let _decoded_next_string_index;
        let _decoded_char;
        _L: {
          const _bind$4 = _bind.charCodeAt(_string_index);
          if (_bind$4 >= 55296 && _bind$4 <= 56319 && (_string_index + 1 | 0) < _bind$3) {
            const _bind$5 = _bind.charCodeAt(_string_index + 1 | 0);
            if (_bind$5 >= 56320 && _bind$5 <= 57343) {
              const _tmp$2 = _string_index + 2 | 0;
              const _p = (((Math.imul(_bind$4 - 55296 | 0, 1024) | 0) + _bind$5 | 0) - 56320 | 0) + 65536 | 0;
              _decoded_next_string_index = _tmp$2;
              _decoded_char = _p;
              break _L;
            } else {
              const _tmp$2 = _string_index + 1 | 0;
              const _p = _bind$4;
              _decoded_next_string_index = _tmp$2;
              _decoded_char = _p;
              break _L;
            }
          } else {
            const _tmp$2 = _string_index + 1 | 0;
            const _p = _bind$4;
            _decoded_next_string_index = _tmp$2;
            _decoded_char = _p;
            break _L;
          }
        }
        const code = _decoded_char;
        if (code >>> 0 < 128 >>> 0) {
          const bit = 1 << (code & 31);
          const _bind$4 = code >>> 5 | 0;
          switch (_bind$4) {
            case 0: {
              bits0 = bits0 | bit;
              break;
            }
            case 1: {
              bits1 = bits1 | bit;
              break;
            }
            case 2: {
              bits2 = bits2 | bit;
              break;
            }
            default: {
              bits3 = bits3 | bit;
            }
          }
        } else {
          return undefined;
        }
        _tmp = _decoded_next_string_index;
        continue;
      } else {
        break;
      }
    }
    return { _0: bits0, _1: bits1, _2: bits2, _3: bits3 };
  }
  function _M0FPB26ascii__char__set__contains(bits0, bits1, bits2, bits3, code) {
    if (code >>> 0 < 128 >>> 0) {
      const bit = 1 << (code & 31);
      const _bind = code >>> 5 | 0;
      switch (_bind) {
        case 0: {
          return (bits0 & bit) !== 0;
        }
        case 1: {
          return (bits1 & bit) !== 0;
        }
        case 2: {
          return (bits2 & bit) !== 0;
        }
        default: {
          return (bits3 & bit) !== 0;
        }
      }
    } else {
      return false;
    }
  }
  function _M0FPB34string__trim__start__ascii__scalar(str, start, end, bits0, bits1, bits2, bits3) {
    let _tmp = start;
    while (true) {
      const pos = _tmp;
      let _tmp$2;
      if (pos < end) {
        const _p = str.charCodeAt(pos);
        _tmp$2 = _M0FPB26ascii__char__set__contains(bits0, bits1, bits2, bits3, _p);
      } else {
        _tmp$2 = false;
      }
      if (_tmp$2) {
        _tmp = pos + 1 | 0;
        continue;
      } else {
        return pos;
      }
    }
  }
  function _M0FPB32string__trim__end__ascii__scalar(str, start, end, bits0, bits1, bits2, bits3) {
    let _tmp = end;
    while (true) {
      const pos = _tmp;
      let _tmp$2;
      if (pos > start) {
        const _p = str.charCodeAt(pos - 1 | 0);
        _tmp$2 = _M0FPB26ascii__char__set__contains(bits0, bits1, bits2, bits3, _p);
      } else {
        _tmp$2 = false;
      }
      if (_tmp$2) {
        _tmp = pos - 1 | 0;
        continue;
      } else {
        return pos;
      }
    }
  }
  function _M0FPB26string__trim__start__ascii(str, start, end, _chars, bits0, bits1, bits2, bits3) {
    return _M0FPB34string__trim__start__ascii__scalar(str, start, end, bits0, bits1, bits2, bits3);
  }
  function _M0FPB24string__trim__end__ascii(str, start, end, _chars, bits0, bits1, bits2, bits3) {
    return _M0FPB32string__trim__end__ascii__scalar(str, start, end, bits0, bits1, bits2, bits3);
  }
  function _M0MPC16string10StringView14contains__char(self, c) {
    const len = self.end - self.start | 0;
    if (len > 0) {
      const c$2 = c;
      if (c$2 >= 0 && c$2 <= 65535) {
        return _M0MPC16string10StringView20contains__code__unit(self, c$2 & 65535);
      } else {
        if (c$2 < 0) {
          return false;
        } else {
          if (len >= 2) {
            const adj = c$2 - 65536 | 0;
            const high = 55296 + (adj >> 10) | 0;
            if (high <= 65535) {
              const high$2 = high & 65535;
              const low = (56320 + (adj & 1023) | 0) & 65535;
              let _tmp = 0;
              while (true) {
                const i = _tmp;
                if (i < (len - 1 | 0)) {
                  const _p = self.str.charCodeAt(self.start + i | 0);
                  if (_p === high$2) {
                    const _p$2 = self.str.charCodeAt(self.start + (i + 1 | 0) | 0);
                    if (_p$2 === low) {
                      return true;
                    }
                    _tmp = i + 2 | 0;
                    continue;
                  }
                  _tmp = i + 1 | 0;
                  continue;
                } else {
                  break;
                }
              }
            } else {
              return false;
            }
          } else {
            return false;
          }
        }
      }
      return false;
    } else {
      return false;
    }
  }
  function _M0MPC16string10StringView24trim__start__with__chars(self, chars) {
    let _tmp = self;
    while (true) {
      const x = _tmp;
      if ((x.end - x.start | 0) === 0) {
        return x;
      } else {
        const _c = _M0MPC16string6String16unsafe__char__at(x.str, _M0MPC16string6String29offset__of__nth__char_2einner(x.str, 0, x.start, x.end));
        const _tmp$2 = x.str;
        const _bind = _M0MPC16string6String29offset__of__nth__char_2einner(x.str, 1, x.start, x.end);
        let _tmp$3;
        if (_bind === undefined) {
          _tmp$3 = x.end;
        } else {
          const _Some = _bind;
          _tmp$3 = _Some;
        }
        const _x = new _M0TPC16string10StringView(_tmp$2, _tmp$3, x.end);
        if (_M0MPC16string10StringView14contains__char(chars, _c)) {
          _tmp = _x;
          continue;
        } else {
          return x;
        }
      }
    }
  }
  function _M0MPC16string10StringView22trim__end__with__chars(self, chars) {
    let _tmp = self;
    while (true) {
      const x = _tmp;
      if ((x.end - x.start | 0) === 0) {
        return x;
      } else {
        const _c = _M0MPC16string6String16unsafe__char__at(x.str, _M0MPC16string6String29offset__of__nth__char_2einner(x.str, -1, x.start, x.end));
        const _x = new _M0TPC16string10StringView(x.str, x.start, _M0MPC16string6String29offset__of__nth__char_2einner(x.str, -1, x.start, x.end));
        if (_M0MPC16string10StringView14contains__char(chars, _c)) {
          _tmp = _x;
          continue;
        } else {
          return x;
        }
      }
    }
  }
  function _M0MPC16string10StringView12trim_2einner(self, chars) {
    const _bind = _M0FPB23build__ascii__char__set(chars);
    if (_bind === undefined) {
      return _M0MPC16string10StringView22trim__end__with__chars(_M0MPC16string10StringView24trim__start__with__chars(self, chars), chars);
    } else {
      const _Some = _bind;
      const _x = _Some;
      const _bits0 = _x._0;
      const _bits1 = _x._1;
      const _bits2 = _x._2;
      const _bits3 = _x._3;
      const start = _M0FPB26string__trim__start__ascii(self.str, self.start, self.end, chars, _bits0, _bits1, _bits2, _bits3);
      const end = _M0FPB24string__trim__end__ascii(self.str, start, self.end, chars, _bits0, _bits1, _bits2, _bits3);
      return new _M0TPC16string10StringView(self.str, start, end);
    }
  }
  function _M0MPC16string10StringView4trim(self, chars$46$opt) {
    let chars;
    if (chars$46$opt === undefined) {
      chars = new _M0TPC16string10StringView(_M0MPC16string10StringView4trimN7_2abindS6841, 0, _M0MPC16string10StringView4trimN7_2abindS6841.length);
    } else {
      const _Some = chars$46$opt;
      chars = _Some;
    }
    return _M0MPC16string10StringView12trim_2einner(self, chars);
  }
  function _M0MPC16string6String12trim_2einner(self, chars) {
    return _M0MPC16string10StringView12trim_2einner(new _M0TPC16string10StringView(self, 0, self.length), chars);
  }
  function _M0MPC16string6String4trim(self, chars$46$opt) {
    let chars;
    if (chars$46$opt === undefined) {
      chars = new _M0TPC16string10StringView(_M0MPC16string6String4trimN7_2abindS6942, 0, _M0MPC16string6String4trimN7_2abindS6942.length);
    } else {
      const _Some = chars$46$opt;
      chars = _Some;
    }
    return _M0MPC16string6String12trim_2einner(self, chars);
  }
  function _M0MPC16string6String4iter(self) {
    const len = self.length;
    const index = new _M0TPB8MutLocalGiE(0);
    return _M0MPB4Iter3newGcE(() => {
      if (index.val < len) {
        const c1 = self.charCodeAt(index.val);
        if (c1 >= 55296 && c1 <= 56319 && (index.val + 1 | 0) < len) {
          const c2 = self.charCodeAt(index.val + 1 | 0);
          if (c2 >= 56320 && c2 <= 57343) {
            const c = _M0FPB32code__point__of__surrogate__pair(c1, c2);
            index.val = index.val + 2 | 0;
            return c;
          }
        }
        index.val = index.val + 1 | 0;
        return c1;
      } else {
        return -1;
      }
    }, undefined);
  }
  function _M0MPB4Iter3mapGcRPC16string10StringViewE(self, f) {
    return new _M0TPB4IterGRPC16string10StringViewE(() => {
      const _bind = _M0MPB4Iter4nextGcE(self);
      if (_bind === -1) {
        return undefined;
      } else {
        const _Some = _bind;
        const _x = _Some;
        return f(_x);
      }
    }, self.size_hint);
  }
  function _M0IPC14char4CharPB4Show10to__string(self) {
    return String.fromCodePoint(self);
  }
  function _M0MPC16string10StringView5split(self, sep) {
    const sep_len = sep.end - sep.start | 0;
    if (sep_len === 0) {
      return _M0MPB4Iter3mapGcRPC16string10StringViewE(_M0MPC16string10StringView4iter(self), (c) => _M0MPC16string6String12view_2einner(_M0IPC14char4CharPB4Show10to__string(c), 0, undefined));
    }
    const remaining = new _M0TPB8MutLocalGORPC16string10StringViewE(self);
    return _M0MPB4Iter3newGUsRPB4JsonEE(() => {
      const _bind = remaining.val;
      if (_bind === undefined) {
        return undefined;
      } else {
        const _Some = _bind;
        const _view = _Some;
        const _bind$2 = _M0MPC16string10StringView4find(_view, sep);
        if (_bind$2 === undefined) {
          remaining.val = undefined;
          return _view;
        } else {
          const _Some$2 = _bind$2;
          const _end = _Some$2;
          remaining.val = _M0MPC16string10StringView12view_2einner(_view, _end + sep_len | 0, undefined);
          return _M0MPC16string10StringView12view_2einner(_view, 0, _end);
        }
      }
    }, undefined);
  }
  function _M0MPC16string6String5split(self, sep) {
    return _M0MPC16string10StringView5split(new _M0TPC16string10StringView(self, 0, self.length), sep);
  }
  function _M0MPC14char4Char20is__ascii__uppercase(self) {
    return self >= 65 && self <= 90;
  }
  function _M0MPC16string6String9to__lower(self) {
    const _bind = _M0MPC16string6String8find__by(self, (c) => _M0MPC14char4Char20is__ascii__uppercase(c));
    if (_bind === undefined) {
      return self;
    } else {
      const _Some = _bind;
      const _idx = _Some;
      const buf = _M0MPB13StringBuilder21StringBuilder_2einner(self.length);
      const head = _M0MPC16string6String12view_2einner(self, 0, _idx);
      _M0IP016_24default__implPB6Logger16write__substringGRPB13StringBuilderE(buf, head.str, head.start, head.end - head.start | 0);
      const _bind$2 = _M0MPC16string6String12view_2einner(self, _idx, undefined);
      const _bind$3 = _bind$2.str;
      const _bind$4 = _bind$2.start;
      const _bind$5 = _bind$2.end;
      let _tmp = _bind$4;
      while (true) {
        const _string_index = _tmp;
        if (_string_index < _bind$5) {
          let _decoded_next_string_index;
          let _decoded_char;
          _L: {
            const _bind$6 = _bind$3.charCodeAt(_string_index);
            if (_bind$6 >= 55296 && _bind$6 <= 56319 && (_string_index + 1 | 0) < _bind$5) {
              const _bind$7 = _bind$3.charCodeAt(_string_index + 1 | 0);
              if (_bind$7 >= 56320 && _bind$7 <= 57343) {
                const _tmp$2 = _string_index + 2 | 0;
                const _p = (((Math.imul(_bind$6 - 55296 | 0, 1024) | 0) + _bind$7 | 0) - 56320 | 0) + 65536 | 0;
                _decoded_next_string_index = _tmp$2;
                _decoded_char = _p;
                break _L;
              } else {
                const _tmp$2 = _string_index + 1 | 0;
                const _p = _bind$6;
                _decoded_next_string_index = _tmp$2;
                _decoded_char = _p;
                break _L;
              }
            } else {
              const _tmp$2 = _string_index + 1 | 0;
              const _p = _bind$6;
              _decoded_next_string_index = _tmp$2;
              _decoded_char = _p;
              break _L;
            }
          }
          if (_M0MPC14char4Char20is__ascii__uppercase(_decoded_char)) {
            _M0IPB13StringBuilderPB6Logger11write__char(buf, _decoded_char + 32 | 0);
          } else {
            _M0IPB13StringBuilderPB6Logger11write__char(buf, _decoded_char);
          }
          _tmp = _decoded_next_string_index;
          continue;
        } else {
          break;
        }
      }
      return buf.val;
    }
  }
  function _M0MPC16string6String9get__char(self, idx) {
    if (idx >= 0 && idx < self.length) {
      const c = self.charCodeAt(idx);
      if (c >= 55296 && c <= 56319) {
        if ((idx + 1 | 0) < self.length) {
          const next = self.charCodeAt(idx + 1 | 0);
          return next >= 56320 && next <= 57343 ? _M0FPB32code__point__of__surrogate__pair(c, next) : -1;
        } else {
          return -1;
        }
      } else {
        return c >= 56320 && c <= 57343 ? -1 : c;
      }
    } else {
      return -1;
    }
  }
  function _M0MPC16string6String9to__array(self) {
    const _p = _M0MPC16string6String4iter(self);
    const _p$2 = [];
    let _p$3 = _p$2;
    while (true) {
      const _p$4 = _M0MPB4Iter4nextGcE(_p);
      if (_p$4 === -1) {
        break;
      } else {
        const _p$5 = _p$4;
        const _p$6 = _p$5;
        const _p$7 = _p$3;
        _M0MPC15array5Array4pushGcE(_p$7, _p$6);
        _p$3 = _p$7;
        continue;
      }
    }
    return _p$3;
  }
  function _M0MPC13int3Int20next__power__of__two(self) {
    if (self >= 0) {
      if (self <= 1) {
        return 1;
      }
      if (self > 1073741824) {
        return 1073741824;
      }
      return (2147483647 >> (Math.clz32(self - 1 | 0) - 1 | 0)) + 1 | 0;
    } else {
      return $panic();
    }
  }
  function _M0FPB8new__mapGsRPB4JsonE(capacity) {
    const capacity$2 = _M0MPC13int3Int20next__power__of__two(capacity);
    const _bind = capacity$2 - 1 | 0;
    const _bind$2 = (Math.imul(capacity$2, 13) | 0) / 16 | 0;
    const _bind$3 = $make_array_len_and_init(capacity$2, undefined);
    const _bind$4 = undefined;
    return new _M0TPB3MapGsRPB4JsonE(_bind$3, 0, capacity$2, _bind, _bind$2, _bind$4, -1);
  }
  function _M0FPB21capacity__for__length(length) {
    let capacity = _M0MPC13int3Int20next__power__of__two(length);
    const _p = capacity;
    if (length > ((Math.imul(_p, 13) | 0) / 16 | 0)) {
      capacity = Math.imul(capacity, 2) | 0;
    }
    return capacity;
  }
  function _M0MPB3Map20add__entry__to__tailGsRPB4JsonE(self, idx, entry) {
    const _bind = self.tail;
    if (_bind === -1) {
      self.head = entry;
    } else {
      const _tmp = self.entries;
      const _p = _bind >>> 0 < _tmp.length ? _tmp[_bind] : $oob();
      let _tmp$2;
      if (_p === undefined) {
        _tmp$2 = $panic();
      } else {
        const _p$2 = _p;
        _tmp$2 = _p$2;
      }
      _tmp$2.next = entry;
    }
    self.tail = idx;
    self.entries[idx] = entry;
    self.size = self.size + 1 | 0;
  }
  function _M0MPB3Map10set__entryGsRPB4JsonE(self, entry, new_idx) {
    const _bind = entry.next;
    if (_bind === undefined) {
      self.tail = new_idx;
    } else {
      const _Some = _bind;
      const _next = _Some;
      _next.prev = new_idx;
    }
    self.entries[new_idx] = entry;
  }
  function _M0MPB3Map10push__awayGsRPB4JsonE(self, idx, entry) {
    let _tmp = entry.psl + 1 | 0;
    let _tmp$2 = idx + 1 & self.capacity_mask;
    let _tmp$3 = entry;
    while (true) {
      const psl = _tmp;
      const idx$2 = _tmp$2;
      const entry$2 = _tmp$3;
      const _bind = self.entries[idx$2];
      if (_bind === undefined) {
        entry$2.psl = psl;
        _M0MPB3Map10set__entryGsRPB4JsonE(self, entry$2, idx$2);
        return;
      } else {
        const _Some = _bind;
        const _curr_entry = _Some;
        if (psl > _curr_entry.psl) {
          entry$2.psl = psl;
          _M0MPB3Map10set__entryGsRPB4JsonE(self, entry$2, idx$2);
          _tmp = _curr_entry.psl + 1 | 0;
          _tmp$2 = idx$2 + 1 & self.capacity_mask;
          _tmp$3 = _curr_entry;
          continue;
        } else {
          _tmp = psl + 1 | 0;
          _tmp$2 = idx$2 + 1 & self.capacity_mask;
          continue;
        }
      }
    }
  }
  function _M0MPB3Map20rehash__place__entryGsRPB4JsonE(self, outer) {
    const hash = outer.hash;
    let _tmp = 0;
    let _tmp$2 = hash & self.capacity_mask;
    while (true) {
      const psl = _tmp;
      const idx = _tmp$2;
      const _bind = self.entries[idx];
      if (_bind === undefined) {
        outer.psl = psl;
        outer.prev = self.tail;
        _M0MPB3Map20add__entry__to__tailGsRPB4JsonE(self, idx, outer);
        return undefined;
      } else {
        const _Some = _bind;
        const _curr = _Some;
        if (psl > _curr.psl) {
          _M0MPB3Map10push__awayGsRPB4JsonE(self, idx, _curr);
          outer.psl = psl;
          outer.prev = self.tail;
          _M0MPB3Map20add__entry__to__tailGsRPB4JsonE(self, idx, outer);
          return undefined;
        } else {
          _tmp = psl + 1 | 0;
          _tmp$2 = idx + 1 & self.capacity_mask;
          continue;
        }
      }
    }
  }
  function _M0MPB3Map4growGsRPB4JsonE(self) {
    const old_head = self.head;
    const new_capacity = self.capacity << 1;
    self.entries = $make_array_len_and_init(new_capacity, undefined);
    self.capacity = new_capacity;
    self.capacity_mask = new_capacity - 1 | 0;
    const _p = self.capacity;
    self.grow_at = (Math.imul(_p, 13) | 0) / 16 | 0;
    self.size = 0;
    self.head = undefined;
    self.tail = -1;
    let _tmp = old_head;
    while (true) {
      const x = _tmp;
      if (x === undefined) {
        return;
      } else {
        const _Some = x;
        const _e = _Some;
        const next_in_chain = _e.next;
        _e.next = undefined;
        _M0MPB3Map20rehash__place__entryGsRPB4JsonE(self, _e);
        _tmp = next_in_chain;
        continue;
      }
    }
  }
  function _M0MPB3Map15set__with__hashGsRPB4JsonE(self, key, value, hash) {
    let _tmp = 0;
    let _tmp$2 = hash & self.capacity_mask;
    while (true) {
      const psl = _tmp;
      const idx = _tmp$2;
      const _bind = self.entries[idx];
      if (_bind === undefined) {
        if (self.size >= self.grow_at) {
          _M0MPB3Map4growGsRPB4JsonE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        const _bind$2 = self.tail;
        const _bind$3 = undefined;
        const entry = new _M0TPB5EntryGsRPB4JsonE(_bind$2, _bind$3, psl, hash, key, value);
        _M0MPB3Map20add__entry__to__tailGsRPB4JsonE(self, idx, entry);
        return undefined;
      } else {
        const _Some = _bind;
        const _curr_entry = _Some;
        if (_curr_entry.hash === hash && _curr_entry.key === key) {
          _curr_entry.value = value;
          return undefined;
        }
        if (psl > _curr_entry.psl) {
          if (self.size >= self.grow_at) {
            _M0MPB3Map4growGsRPB4JsonE(self);
            _tmp = 0;
            _tmp$2 = hash & self.capacity_mask;
            continue;
          }
          _M0MPB3Map10push__awayGsRPB4JsonE(self, idx, _curr_entry);
          const _bind$2 = self.tail;
          const _bind$3 = undefined;
          const entry = new _M0TPB5EntryGsRPB4JsonE(_bind$2, _bind$3, psl, hash, key, value);
          _M0MPB3Map20add__entry__to__tailGsRPB4JsonE(self, idx, entry);
          return undefined;
        }
        _tmp = psl + 1 | 0;
        _tmp$2 = idx + 1 & self.capacity_mask;
        continue;
      }
    }
  }
  function _M0MPB3Map3setGsRPB4JsonE(self, key, value) {
    _M0MPB3Map15set__with__hashGsRPB4JsonE(self, key, value, _M0IPC16string6StringPB4Hash4hash(key));
  }
  function _M0MPB3Map3MapGsRPB4JsonE(arr, capacity) {
    const length = arr.end - arr.start | 0;
    let capacity$2;
    if (capacity === undefined) {
      capacity$2 = length === 0 ? 8 : _M0FPB21capacity__for__length(length);
    } else {
      const _Some = capacity;
      const _capacity = _Some;
      const _p = _M0FPB21capacity__for__length(length);
      capacity$2 = _capacity > _p ? _capacity : _p;
    }
    const m = _M0FPB8new__mapGsRPB4JsonE(capacity$2);
    const _bind = arr.end - arr.start | 0;
    let _tmp = 0;
    while (true) {
      const _ = _tmp;
      if (_ < _bind) {
        const e = arr.buf[arr.start + _ | 0];
        _M0MPB3Map3setGsRPB4JsonE(m, e._0, e._1);
        _tmp = _ + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return m;
  }
  function _M0MPB3Map4iterGsRPB4JsonE(self) {
    const curr_entry = new _M0TPB8MutLocalGORPB5EntryGsRPB4JsonEE(self.head);
    const len = self.size;
    const remaining = new _M0TPB8MutLocalGiE(len);
    return _M0MPB4Iter3newGUsRPB4JsonEE(() => {
      _L: {
        if (remaining.val > 0) {
          const _bind = curr_entry.val;
          if (_bind === undefined) {
            break _L;
          } else {
            const _Some = _bind;
            const _x = _Some;
            const _key = _x.key;
            const _value = _x.value;
            const _next = _x.next;
            curr_entry.val = _next;
            remaining.val = remaining.val - 1 | 0;
            return { _0: _key, _1: _value };
          }
        } else {
          break _L;
        }
      }
      return undefined;
    }, len);
  }
  function _M0MPC14json4Json4JsonGsE(value) {
    return new _M0DTPB4Json6String(value);
  }
  function _M0MPC14json4Json4JsonGiE(value) {
    return _M0IPC13int3IntPB6ToJson8to__json(value);
  }
  function _M0MPC14json4Json4JsonGRPB5ArrayGsEE(value) {
    return _M0IPC15array5ArrayPB6ToJson8to__jsonGsE(value);
  }
  function _M0MPC14json4Json4JsonGRPB5ArrayGRPB4JsonEE(value) {
    return _M0IPC15array5ArrayPB6ToJson8to__jsonGRPB4JsonE(value);
  }
  function _M0MPC14json4Json4JsonGbE(value) {
    return _M0IPC14bool4BoolPB6ToJson8to__json(value);
  }
  function _M0IPC14bool4BoolPB6ToJson8to__json(self) {
    if (self) {
      const _p = true;
      return _p ? _M0DTPB4Json4True__ : _M0DTPB4Json5False__;
    } else {
      const _p = false;
      return _p ? _M0DTPB4Json4True__ : _M0DTPB4Json5False__;
    }
  }
  function _M0IPC13int3IntPB6ToJson8to__json(self) {
    const _p = self + 0;
    const _p$2 = undefined;
    return new _M0DTPB4Json6Number(_p, _p$2);
  }
  function _M0IPC15array5ArrayPB6ToJson8to__jsonGsE(self) {
    const _p = new Array(self.length);
    const _p$2 = self.length;
    let _tmp = 0;
    while (true) {
      const _p$3 = _tmp;
      if (_p$3 < _p$2) {
        const _p$4 = self[_p$3];
        _p[_p$3] = new _M0DTPB4Json6String(_p$4);
        _tmp = _p$3 + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return new _M0DTPB4Json5Array(_p);
  }
  function _M0IPC15array5ArrayPB6ToJson8to__jsonGRPB4JsonE(self) {
    const _p = new Array(self.length);
    const _p$2 = self.length;
    let _tmp = 0;
    while (true) {
      const _p$3 = _tmp;
      if (_p$3 < _p$2) {
        const _p$4 = self[_p$3];
        _p[_p$3] = _p$4;
        _tmp = _p$3 + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return new _M0DTPB4Json5Array(_p);
  }
  function _M0MPC13int3Int8to__char(self) {
    _L: {
      if (self >= 0 && self <= 55295) {
        break _L;
      } else {
        if (self >= 57344 && self <= 1114111) {
          break _L;
        } else {
          return -1;
        }
      }
    }
    return self;
  }
  function _M0IPC16string6StringPB4Hash4hash(self) {
    let acc = (_M0FPB4seed >>> 0) + (374761393 >>> 0) | 0;
    const _bind = self.length;
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < _bind) {
        acc = (acc >>> 0) + (4 >>> 0) | 0;
        const v = self.charCodeAt(i);
        acc = _M0FPB13consume4__acc(acc, v);
        _tmp = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return _M0FPB13finalize__acc(acc);
  }
  function _M0IPC16double6DoublePB4Show10to__string(self) {
    return String(self);
  }
  function _M0MPC14char4Char21is__ascii__alphabetic(self) {
    return self >= 65 && self <= 90 ? true : self >= 97 && self <= 122;
  }
  function _M0MPC15array5Array11unsafe__popGRPC14json10WriteFrameE(self) {
    return _M0MPB7JSArray3pop(self);
  }
  function _M0MPC15array5Array3popGRPC14json10WriteFrameE(self) {
    if (self.length === 0) {
      return undefined;
    } else {
      const v = _M0MPC15array5Array11unsafe__popGRPC14json10WriteFrameE(self);
      return v;
    }
  }
  function _M0MPC15array5Array4copyGRP28yrz1234510moonrobots10DiagnosticE(self) {
    return _M0MPB7JSArray4copy(self);
  }
  function _M0MPC15array5Array2atGRPB4JsonE(self, index) {
    const len = self.length;
    return index >= 0 && index < len ? self[index] : $panic();
  }
  function _M0MPC15array5Array2atGcE(self, index) {
    const len = self.length;
    return index >= 0 && index < len ? self[index] : $panic();
  }
  function _M0MPC15array5Array8containsGsE(self, value) {
    const _bind = self.length;
    let _tmp = 0;
    while (true) {
      const _ = _tmp;
      if (_ < _bind) {
        const v = self[_];
        if (v === value) {
          return true;
        }
        _tmp = _ + 1 | 0;
        continue;
      } else {
        return false;
      }
    }
  }
  function _M0FPC28encoding4utf814encode_2einner(str, bom) {
    return _M0FPC28encoding4utf816encode__utf8__js(str.str, str.start, str.end - str.start | 0, bom);
  }
  function _M0FPC14json20need__escape__scalar(str, escape_slash, start, end) {
    let _tmp = start;
    while (true) {
      const i = _tmp;
      if (i < end) {
        const code = str.charCodeAt(i);
        let _tmp$2;
        const _p = 34;
        if (code === _p) {
          _tmp$2 = true;
        } else {
          let _tmp$3;
          const _p$2 = 92;
          if (code === _p$2) {
            _tmp$3 = true;
          } else {
            let _tmp$4;
            if (code < 32) {
              _tmp$4 = true;
            } else {
              let _tmp$5;
              if (escape_slash) {
                const _p$3 = 47;
                _tmp$5 = code === _p$3;
              } else {
                _tmp$5 = false;
              }
              _tmp$4 = _tmp$5;
            }
            _tmp$3 = _tmp$4;
          }
          _tmp$2 = _tmp$3;
        }
        if (_tmp$2) {
          return true;
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return false;
  }
  function _M0FPC14json12need__escape(str, escape_slash) {
    return _M0FPC14json20need__escape__scalar(str, escape_slash, 0, str.length);
  }
  function _M0FPC14json14write__escaped(buf, str, escape_slash) {
    if (!_M0FPC14json12need__escape(str, escape_slash)) {
      _M0IPB13StringBuilderPB6Logger13write__string(buf, str);
      return undefined;
    }
    const _bind = str.length;
    let _tmp = 0;
    while (true) {
      const _ = _tmp;
      if (_ < _bind) {
        const code = str.charCodeAt(_);
        switch (code) {
          case 34: {
            _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\\"");
            break;
          }
          case 92: {
            _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\\\");
            break;
          }
          case 47: {
            if (escape_slash) {
              _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\/");
            } else {
              _M0IPB13StringBuilderPB6Logger11write__char(buf, 47);
            }
            break;
          }
          case 10: {
            _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\n");
            break;
          }
          case 13: {
            _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\r");
            break;
          }
          case 8: {
            _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\b");
            break;
          }
          case 9: {
            _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\t");
            break;
          }
          case 12: {
            _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\f");
            break;
          }
          default: {
            if (code < 32) {
              _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\u00");
              _M0IPB13StringBuilderPB6Logger13write__string(buf, _M0MPC14byte4Byte7to__hex(code & 255));
            } else {
              _M0IPB13StringBuilderPB6Logger11write__char(buf, code);
            }
          }
        }
        _tmp = _ + 1 | 0;
        continue;
      } else {
        return;
      }
    }
  }
  function _M0FPC14json13write__indent(buf, cache, level, indent) {
    while (true) {
      if (cache.length <= level) {
        if (cache.length >= 1) {
          const _last = cache[cache.length - 1 | 0];
          _M0MPC15array5Array4pushGRP28yrz1234510moonrobots10DiagnosticE(cache, `${_last}${_M0MPC16string6String6repeat(" ", indent)}`);
        } else {
          _M0MPC15array5Array4pushGRP28yrz1234510moonrobots10DiagnosticE(cache, "\n");
        }
        continue;
      } else {
        break;
      }
    }
    _M0IPB13StringBuilderPB6Logger13write__string(buf, _M0MPC15array5Array2atGRPB4JsonE(cache, level));
  }
  function _M0MPC14json4Json17stringify_2einner(self, escape_slash, indent, replacer) {
    const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
    const indent_cache = [];
    const stack = [];
    let depth = 0;
    let _tmp = self;
    while (true) {
      const x = _tmp;
      if (x === undefined) {
        if (stack.length === 0) {
          break;
        } else {
          const _x = stack[stack.length - 1 | 0];
          if (_x.$tag === 0) {
            const _Array = _x;
            const _arr = _Array._0;
            const _i = _Array._1;
            if (_i < _arr.length) {
              const element = _M0MPC15array5Array2atGRPB4JsonE(_arr, _i);
              _Array._1 = _i + 1 | 0;
              if (_i > 0) {
                _M0IPB13StringBuilderPB6Logger11write__char(buf, 44);
                if (indent > 0) {
                  _M0FPC14json13write__indent(buf, indent_cache, depth, indent);
                }
              }
              _tmp = element;
              continue;
            } else {
              depth = depth - 1 | 0;
              _M0MPC15array5Array3popGRPC14json10WriteFrameE(stack);
              if (indent > 0) {
                _M0FPC14json13write__indent(buf, indent_cache, depth, indent);
              }
              _M0IPB13StringBuilderPB6Logger11write__char(buf, 93);
              _tmp = undefined;
              continue;
            }
          } else {
            const _Object = _x;
            const _iterator = _Object._0;
            const _first = _Object._1;
            const _bind = _M0MPB4Iter4nextGRPC16string10StringViewE(_iterator);
            if (_bind === undefined) {
              depth = depth - 1 | 0;
              _M0MPC15array5Array3popGRPC14json10WriteFrameE(stack);
              if (indent > 0) {
                _M0FPC14json13write__indent(buf, indent_cache, depth, indent);
              }
              _M0IPB13StringBuilderPB6Logger11write__char(buf, 125);
              _tmp = undefined;
              continue;
            } else {
              const _Some = _bind;
              const _x$2 = _Some;
              const _k = _x$2._0;
              const _v = _x$2._1;
              let v2 = _v;
              if (replacer === undefined) {
              } else {
                const _Some$2 = replacer;
                const _replacer = _Some$2;
                const _func = _replacer.f;
                const _bind$2 = _func(_k, _v);
                if (_bind$2 === undefined) {
                  _tmp = undefined;
                  continue;
                } else {
                  const _Some$3 = _bind$2;
                  const _v$2 = _Some$3;
                  v2 = _v$2;
                }
              }
              if (!_first) {
                _M0IPB13StringBuilderPB6Logger11write__char(buf, 44);
                if (indent > 0) {
                  _M0FPC14json13write__indent(buf, indent_cache, depth, indent);
                }
              }
              _M0IPB13StringBuilderPB6Logger11write__char(buf, 34);
              _M0FPC14json14write__escaped(buf, _k, escape_slash);
              _M0IPB13StringBuilderPB6Logger11write__char(buf, 34);
              _M0IPB13StringBuilderPB6Logger11write__char(buf, 58);
              if (indent > 0) {
                _M0IPB13StringBuilderPB6Logger11write__char(buf, 32);
              }
              _Object._1 = false;
              _tmp = v2;
              continue;
            }
          }
        }
      } else {
        const _Some = x;
        const _value = _Some;
        switch (_value.$tag) {
          case 6: {
            const _Object = _value;
            const _members = _Object._0;
            if (_members.size === 0) {
              _M0IPB13StringBuilderPB6Logger13write__string(buf, "{}");
            } else {
              depth = depth + 1 | 0;
              _M0IPB13StringBuilderPB6Logger11write__char(buf, 123);
              if (indent > 0) {
                _M0FPC14json13write__indent(buf, indent_cache, depth, indent);
              }
              _M0MPC15array5Array4pushGRP28yrz1234510moonrobots10DiagnosticE(stack, new _M0DTPC14json10WriteFrame6Object(_M0MPB3Map4iterGsRPB4JsonE(_members), true));
            }
            break;
          }
          case 5: {
            const _Array = _value;
            const _arr = _Array._0;
            if (_arr.length === 0) {
              _M0IPB13StringBuilderPB6Logger13write__string(buf, "[]");
            } else {
              depth = depth + 1 | 0;
              _M0IPB13StringBuilderPB6Logger11write__char(buf, 91);
              if (indent > 0) {
                _M0FPC14json13write__indent(buf, indent_cache, depth, indent);
              }
              _M0MPC15array5Array4pushGRP28yrz1234510moonrobots10DiagnosticE(stack, new _M0DTPC14json10WriteFrame5Array(_arr, 0));
            }
            break;
          }
          case 4: {
            const _String = _value;
            const _s = _String._0;
            _M0IPB13StringBuilderPB6Logger11write__char(buf, 34);
            _M0FPC14json14write__escaped(buf, _s, escape_slash);
            _M0IPB13StringBuilderPB6Logger11write__char(buf, 34);
            break;
          }
          case 3: {
            const _Number = _value;
            const _n = _Number._0;
            const _repr = _Number._1;
            if (_repr === undefined) {
              _M0MPB13StringBuilder13write__objectGdE(buf, _n);
            } else {
              const _Some$2 = _repr;
              const _r = _Some$2;
              _M0IPB13StringBuilderPB6Logger13write__string(buf, _r);
            }
            break;
          }
          case 1: {
            _M0IPB13StringBuilderPB6Logger13write__string(buf, "true");
            break;
          }
          case 2: {
            _M0IPB13StringBuilderPB6Logger13write__string(buf, "false");
            break;
          }
          default: {
            _M0IPB13StringBuilderPB6Logger13write__string(buf, "null");
          }
        }
        _tmp = undefined;
        continue;
      }
    }
    return buf.val;
  }
  function _M0IP28yrz1234510moonrobots8RuleKindPB2Eq5equal(_x_169, _x_170) {
    if (_x_169 === 0) {
      if (_x_170 === 0) {
        return true;
      } else {
        return false;
      }
    } else {
      if (_x_170 === 1) {
        return true;
      } else {
        return false;
      }
    }
  }
  function _M0FP28yrz1234510moonrobots16rule__kind__name(kind) {
    if (kind === 0) {
      return "allow";
    } else {
      return "disallow";
    }
  }
  function _M0FP28yrz1234510moonrobots22decision__reason__name(reason) {
    switch (reason) {
      case 0: {
        return "implicit_robots_txt";
      }
      case 1: {
        return "no_matching_group";
      }
      case 2: {
        return "no_matching_rule";
      }
      default: {
        return "matched_rule";
      }
    }
  }
  function _M0FP28yrz1234510moonrobots14decision__json(decision) {
    const _bind = decision.matched_rule;
    let matched_rule;
    if (_bind === undefined) {
      matched_rule = _M0FPC17prelude4null;
    } else {
      const _Some = _bind;
      const _rule = _Some;
      const _bind$2 = [{ _0: "kind", _1: _M0MPC14json4Json4JsonGsE(_M0FP28yrz1234510moonrobots16rule__kind__name(_rule.kind)) }, { _0: "pattern", _1: _M0MPC14json4Json4JsonGsE(_rule.pattern) }, { _0: "line", _1: _M0MPC14json4Json4JsonGiE(_rule.line) }];
      const _p = _M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$2, 0, 3), undefined);
      matched_rule = new _M0DTPB4Json6Object(_p);
    }
    const _bind$2 = [{ _0: "allowed", _1: _M0MPC14json4Json4JsonGbE(decision.allowed) }, { _0: "userAgent", _1: _M0MPC14json4Json4JsonGsE(decision.user_agent) }, { _0: "path", _1: _M0MPC14json4Json4JsonGsE(decision.path) }, { _0: "selectedAgents", _1: _M0MPC14json4Json4JsonGRPB5ArrayGsEE(decision.selected_agents) }, { _0: "matchedRule", _1: matched_rule }, { _0: "matchLength", _1: _M0MPC14json4Json4JsonGiE(decision.match_length) }, { _0: "reason", _1: _M0MPC14json4Json4JsonGsE(_M0FP28yrz1234510moonrobots22decision__reason__name(decision.reason)) }];
    const _p = _M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$2, 0, 7), undefined);
    return new _M0DTPB4Json6Object(_p);
  }
  function _M0FP28yrz1234510moonrobots23evaluation__trace__json(trace) {
    const _p = trace.candidates;
    const _p$2 = new Array(_p.length);
    const _p$3 = _p.length;
    let _tmp = 0;
    while (true) {
      const _p$4 = _tmp;
      if (_p$4 < _p$3) {
        const _p$5 = _p[_p$4];
        const _p$6 = [{ _0: "kind", _1: _M0MPC14json4Json4JsonGsE(_M0FP28yrz1234510moonrobots16rule__kind__name(_p$5.rule.kind)) }, { _0: "pattern", _1: _M0MPC14json4Json4JsonGsE(_p$5.rule.pattern) }, { _0: "normalizedPattern", _1: _M0MPC14json4Json4JsonGsE(_p$5.normalized_pattern) }, { _0: "line", _1: _M0MPC14json4Json4JsonGiE(_p$5.rule.line) }, { _0: "matched", _1: _M0MPC14json4Json4JsonGbE(_p$5.matched) }, { _0: "matchLength", _1: _M0MPC14json4Json4JsonGiE(_p$5.match_length) }];
        const _p$7 = _M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_p$6, 0, 6), undefined);
        _p$2[_p$4] = new _M0DTPB4Json6Object(_p$7);
        _tmp = _p$4 + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    const candidates = _p$2;
    const _bind = [{ _0: "decision", _1: _M0FP28yrz1234510moonrobots14decision__json(trace.decision) }, { _0: "candidates", _1: _M0MPC14json4Json4JsonGRPB5ArrayGRPB4JsonEE(candidates) }];
    const _p$4 = _M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind, 0, 2), undefined);
    return new _M0DTPB4Json6Object(_p$4);
  }
  function _M0FP28yrz1234510moonrobots16diagnostic__json(item) {
    const _bind = item.severity;
    let severity;
    if (_bind === 0) {
      severity = "info";
    } else {
      severity = "warning";
    }
    const _bind$2 = [{ _0: "severity", _1: _M0MPC14json4Json4JsonGsE(severity) }, { _0: "code", _1: _M0MPC14json4Json4JsonGsE(item.code) }, { _0: "line", _1: _M0MPC14json4Json4JsonGiE(item.line) }, { _0: "message", _1: _M0MPC14json4Json4JsonGsE(item.message) }];
    const _p = _M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$2, 0, 4), undefined);
    return new _M0DTPB4Json6Object(_p);
  }
  function _M0FP28yrz1234510moonrobots10lint__item(severity, code, line, message) {
    return new _M0TP28yrz1234510moonrobots10Diagnostic(severity, code, line, message);
  }
  function _M0FP28yrz1234510moonrobots4lint(file) {
    const output = _M0MPC15array5Array4copyGRP28yrz1234510moonrobots10DiagnosticE(file.diagnostics);
    const seen_agents = [];
    const _bind = file.groups;
    const _bind$2 = _bind.length;
    let _tmp = 0;
    while (true) {
      const _ = _tmp;
      if (_ < _bind$2) {
        const group = _bind[_];
        if (group.rules.length === 0) {
          _M0MPC15array5Array4pushGRP28yrz1234510moonrobots10DiagnosticE(output, _M0FP28yrz1234510moonrobots10lint__item(0, "L002", group.line, "group has no rules and therefore allows every path"));
        }
        const seen_rules = [];
        const _bind$3 = group.rules;
        const _bind$4 = _bind$3.length;
        let _tmp$2 = 0;
        while (true) {
          const _$2 = _tmp$2;
          if (_$2 < _bind$4) {
            const rule = _bind$3[_$2];
            const key = `${_M0FP28yrz1234510moonrobots16rule__kind__name(rule.kind)}:${rule.pattern}`;
            if (_M0MPC15array5Array8containsGsE(seen_rules, key)) {
              _M0MPC15array5Array4pushGRP28yrz1234510moonrobots10DiagnosticE(output, _M0FP28yrz1234510moonrobots10lint__item(0, "L001", rule.line, "duplicate rule has no additional effect"));
            } else {
              _M0MPC15array5Array4pushGRP28yrz1234510moonrobots10DiagnosticE(seen_rules, key);
            }
            if (_M0IP28yrz1234510moonrobots8RuleKindPB2Eq5equal(rule.kind, 1) && rule.pattern === "/") {
              _M0MPC15array5Array4pushGRP28yrz1234510moonrobots10DiagnosticE(output, _M0FP28yrz1234510moonrobots10lint__item(1, "L003", rule.line, "rule denies the entire site unless a more specific Allow rule wins"));
            }
            _tmp$2 = _$2 + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        const _bind$5 = group.agents;
        const _bind$6 = _bind$5.length;
        let _tmp$3 = 0;
        while (true) {
          const _$2 = _tmp$3;
          if (_$2 < _bind$6) {
            const agent = _bind$5[_$2];
            if (_M0MPC15array5Array8containsGsE(seen_agents, agent)) {
              _M0MPC15array5Array4pushGRP28yrz1234510moonrobots10DiagnosticE(output, _M0FP28yrz1234510moonrobots10lint__item(0, "L006", group.line, "User-agent appears in multiple groups; their rules will be merged"));
            } else {
              _M0MPC15array5Array4pushGRP28yrz1234510moonrobots10DiagnosticE(seen_agents, agent);
            }
            _tmp$3 = _$2 + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        _tmp = _ + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    const seen_sitemaps = [];
    const _bind$3 = file.sitemaps;
    const _bind$4 = _bind$3.length;
    let _tmp$2 = 0;
    while (true) {
      const _ = _tmp$2;
      if (_ < _bind$4) {
        const sitemap = _bind$3[_];
        if (!_M0MPC16string6String11has__prefix(sitemap, new _M0TPC16string10StringView(_M0FP28yrz1234510moonrobots4lintN7_2abindS259, 0, _M0FP28yrz1234510moonrobots4lintN7_2abindS259.length)) && !_M0MPC16string6String11has__prefix(sitemap, new _M0TPC16string10StringView(_M0FP28yrz1234510moonrobots4lintN7_2abindS260, 0, _M0FP28yrz1234510moonrobots4lintN7_2abindS260.length))) {
          _M0MPC15array5Array4pushGRP28yrz1234510moonrobots10DiagnosticE(output, _M0FP28yrz1234510moonrobots10lint__item(1, "L004", 0, `Sitemap should use an absolute HTTP or HTTPS URL: ${sitemap}`));
        }
        if (_M0MPC15array5Array8containsGsE(seen_sitemaps, sitemap)) {
          _M0MPC15array5Array4pushGRP28yrz1234510moonrobots10DiagnosticE(output, _M0FP28yrz1234510moonrobots10lint__item(0, "L005", 0, `duplicate Sitemap record: ${sitemap}`));
        } else {
          _M0MPC15array5Array4pushGRP28yrz1234510moonrobots10DiagnosticE(seen_sitemaps, sitemap);
        }
        _tmp$2 = _ + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return output;
  }
  function _M0FP28yrz1234510moonrobots10diagnostic(severity, code, line, message) {
    return new _M0TP28yrz1234510moonrobots10Diagnostic(severity, code, line, message);
  }
  function _M0FP28yrz1234510moonrobots13finish__group(groups, agents, rules, line) {
    if (agents.length > 0) {
      _M0MPC15array5Array4pushGRP28yrz1234510moonrobots10DiagnosticE(groups, new _M0TP28yrz1234510moonrobots5Group(_M0MPC15array5Array4copyGRP28yrz1234510moonrobots10DiagnosticE(agents), _M0MPC15array5Array4copyGRP28yrz1234510moonrobots10DiagnosticE(rules), line));
      return;
    } else {
      return;
    }
  }
  function _M0FP28yrz1234510moonrobots12valid__agent(value) {
    if (value === "*") {
      return true;
    }
    if (value === "") {
      return false;
    }
    const _bind = value.length;
    let _tmp = 0;
    while (true) {
      const _string_index = _tmp;
      if (_string_index < _bind) {
        let _decoded_next_string_index;
        let _decoded_char;
        _L: {
          const _bind$2 = value.charCodeAt(_string_index);
          if (_bind$2 >= 55296 && _bind$2 <= 56319 && (_string_index + 1 | 0) < _bind) {
            const _bind$3 = value.charCodeAt(_string_index + 1 | 0);
            if (_bind$3 >= 56320 && _bind$3 <= 57343) {
              const _tmp$2 = _string_index + 2 | 0;
              const _p = (((Math.imul(_bind$2 - 55296 | 0, 1024) | 0) + _bind$3 | 0) - 56320 | 0) + 65536 | 0;
              _decoded_next_string_index = _tmp$2;
              _decoded_char = _p;
              break _L;
            } else {
              const _tmp$2 = _string_index + 1 | 0;
              const _p = _bind$2;
              _decoded_next_string_index = _tmp$2;
              _decoded_char = _p;
              break _L;
            }
          } else {
            const _tmp$2 = _string_index + 1 | 0;
            const _p = _bind$2;
            _decoded_next_string_index = _tmp$2;
            _decoded_char = _p;
            break _L;
          }
        }
        if (!_M0MPC14char4Char21is__ascii__alphabetic(_decoded_char) && (_decoded_char !== 95 && _decoded_char !== 45)) {
          return false;
        }
        _tmp = _decoded_next_string_index;
        continue;
      } else {
        break;
      }
    }
    return true;
  }
  function _M0FP28yrz1234510moonrobots5parse(source) {
    const groups = [];
    const sitemaps = [];
    const diagnostics = [];
    let agents = [];
    let rules = [];
    let group_line = 0;
    let group_has_rule = false;
    let line_number = 0;
    const _it = _M0MPC16string6String5split(source, new _M0TPC16string10StringView(_M0FP28yrz1234510moonrobots5parseN7_2abindS302, 0, _M0FP28yrz1234510moonrobots5parseN7_2abindS302.length));
    _L: while (true) {
      const _bind = _M0MPB4Iter4nextGRPC16string10StringViewE(_it);
      if (_bind === undefined) {
        break;
      } else {
        const _Some = _bind;
        const _raw_line = _Some;
        line_number = line_number + 1 | 0;
        let line = _M0MPC16string10StringView9to__owned(_raw_line);
        if (_M0MPC16string6String11has__suffix(line, new _M0TPC16string10StringView(_M0FP28yrz1234510moonrobots5parseN7_2abindS273, 0, _M0FP28yrz1234510moonrobots5parseN7_2abindS273.length))) {
          line = _M0MPC16string10StringView9to__owned(_M0MPC16string6String21clamped__view_2einner(line, 0, line.length - 1 | 0));
        }
        const _bind$2 = _M0MPC16string6String4find(line, new _M0TPC16string10StringView(_M0FP28yrz1234510moonrobots5parseN7_2abindS274, 0, _M0FP28yrz1234510moonrobots5parseN7_2abindS274.length));
        if (_bind$2 === undefined) {
        } else {
          const _Some$2 = _bind$2;
          const _comment_at = _Some$2;
          line = _M0MPC16string10StringView9to__owned(_M0MPC16string6String21clamped__view_2einner(line, 0, _comment_at));
        }
        const trimmed = _M0MPC16string10StringView9to__owned(_M0MPC16string6String4trim(line, undefined));
        if (trimmed === "") {
          continue;
        }
        const _bind$3 = _M0MPC16string6String4find(trimmed, new _M0TPC16string10StringView(_M0FP28yrz1234510moonrobots5parseN7_2abindS286, 0, _M0FP28yrz1234510moonrobots5parseN7_2abindS286.length));
        if (_bind$3 === undefined) {
          _M0MPC15array5Array4pushGRP28yrz1234510moonrobots10DiagnosticE(diagnostics, _M0FP28yrz1234510moonrobots10diagnostic(1, "R001", line_number, "record has no ':' separator and was ignored"));
          continue;
        } else {
          const _Some$2 = _bind$3;
          const _colon = _Some$2;
          const key = _M0MPC16string6String9to__lower(_M0MPC16string10StringView9to__owned(_M0MPC16string10StringView4trim(_M0MPC16string6String21clamped__view_2einner(trimmed, 0, _colon), undefined)));
          const value = _M0MPC16string10StringView9to__owned(_M0MPC16string10StringView4trim(_M0MPC16string6String21clamped__view_2einner(trimmed, _colon + 1 | 0, undefined), undefined));
          _L$2: {
            _L$3: {
              switch (key) {
                case "user-agent": {
                  if (!_M0FP28yrz1234510moonrobots12valid__agent(value)) {
                    _M0MPC15array5Array4pushGRP28yrz1234510moonrobots10DiagnosticE(diagnostics, _M0FP28yrz1234510moonrobots10diagnostic(1, "R002", line_number, "invalid User-agent product token was ignored"));
                    continue _L;
                  }
                  if (group_has_rule) {
                    _M0FP28yrz1234510moonrobots13finish__group(groups, agents, rules, group_line);
                    agents = [];
                    rules = [];
                    group_has_rule = false;
                    group_line = line_number;
                  } else {
                    if (agents.length === 0) {
                      group_line = line_number;
                    }
                  }
                  _M0MPC15array5Array4pushGRP28yrz1234510moonrobots10DiagnosticE(agents, _M0MPC16string6String9to__lower(value));
                  break;
                }
                case "allow": {
                  break _L$3;
                }
                case "disallow": {
                  break _L$3;
                }
                case "sitemap": {
                  if (value === "") {
                    _M0MPC15array5Array4pushGRP28yrz1234510moonrobots10DiagnosticE(diagnostics, _M0FP28yrz1234510moonrobots10diagnostic(1, "R004", line_number, "empty Sitemap record was ignored"));
                  } else {
                    _M0MPC15array5Array4pushGRP28yrz1234510moonrobots10DiagnosticE(sitemaps, value);
                  }
                  break;
                }
                default: {
                  _M0MPC15array5Array4pushGRP28yrz1234510moonrobots10DiagnosticE(diagnostics, _M0FP28yrz1234510moonrobots10diagnostic(0, "R005", line_number, `unknown record '${key}' was ignored`));
                }
              }
              break _L$2;
            }
            if (agents.length === 0) {
              _M0MPC15array5Array4pushGRP28yrz1234510moonrobots10DiagnosticE(diagnostics, _M0FP28yrz1234510moonrobots10diagnostic(1, "R003", line_number, "rule before the first User-agent record was ignored"));
              continue;
            }
            group_has_rule = true;
            let _tmp;
            const _p = "";
            if (!(value === _p)) {
              _tmp = !_M0MPC16string6String11has__prefix(value, new _M0TPC16string10StringView(_M0FP28yrz1234510moonrobots5parseN7_2abindS280, 0, _M0FP28yrz1234510moonrobots5parseN7_2abindS280.length)) && !_M0MPC16string6String11has__prefix(value, new _M0TPC16string10StringView(_M0FP28yrz1234510moonrobots5parseN7_2abindS281, 0, _M0FP28yrz1234510moonrobots5parseN7_2abindS281.length));
            } else {
              _tmp = false;
            }
            if (_tmp) {
              _M0MPC15array5Array4pushGRP28yrz1234510moonrobots10DiagnosticE(diagnostics, _M0FP28yrz1234510moonrobots10diagnostic(1, "R006", line_number, "rule path must start with '/' or '*' and was ignored"));
            } else {
              const _p$2 = "";
              if (!(value === _p$2)) {
                const kind = key === "allow" ? 0 : 1;
                _M0MPC15array5Array4pushGRP28yrz1234510moonrobots10DiagnosticE(rules, new _M0TP28yrz1234510moonrobots4Rule(kind, value, line_number));
              }
            }
          }
        }
        continue;
      }
    }
    _M0FP28yrz1234510moonrobots13finish__group(groups, agents, rules, group_line);
    if (groups.length === 0) {
      _M0MPC15array5Array4pushGRP28yrz1234510moonrobots10DiagnosticE(diagnostics, _M0FP28yrz1234510moonrobots10diagnostic(1, "R007", 0, "document contains no valid User-agent groups"));
    }
    return new _M0TP28yrz1234510moonrobots10RobotsFile(groups, sitemaps, diagnostics);
  }
  function _M0FP28yrz1234510moonrobots7is__hex(c) {
    return c >= 48 && c <= 57 || (c >= 97 && c <= 102 || c >= 65 && c <= 70);
  }
  function _M0FP28yrz1234510moonrobots10hex__value(c) {
    return c >= 48 && c <= 57 ? c - 48 | 0 : c >= 97 && c <= 102 ? (c - 97 | 0) + 10 | 0 : (c - 65 | 0) + 10 | 0;
  }
  function _M0FP28yrz1234510moonrobots10hex__digit(value) {
    const _p = _M0MPC16string6String9get__char("0123456789ABCDEF", value);
    return _p === -1 ? $panic() : _p;
  }
  function _M0FP28yrz1234510moonrobots20write__percent__byte(out, value) {
    _M0IPB13StringBuilderPB6Logger11write__char(out, 37);
    _M0IPB13StringBuilderPB6Logger11write__char(out, _M0FP28yrz1234510moonrobots10hex__digit(value >> 4 & 15));
    _M0IPB13StringBuilderPB6Logger11write__char(out, _M0FP28yrz1234510moonrobots10hex__digit(value & 15));
  }
  function _M0FP28yrz1234510moonrobots20is__unreserved__byte(value) {
    return value >= 97 && value <= 122 || (value >= 65 && value <= 90 || (value >= 48 && value <= 57 || (value === 45 || (value === 46 || (value === 95 || value === 126)))));
  }
  function _M0FP28yrz1234510moonrobots15normalize__path(input, preserve_pattern_tokens) {
    const bytes = _M0FPC28encoding4utf814encode_2einner(new _M0TPC16string10StringView(input, 0, input.length), false);
    const out = _M0MPB13StringBuilder21StringBuilder_2einner(Math.imul(bytes.length, 3) | 0);
    let index = 0;
    while (true) {
      if (index < bytes.length) {
        const _tmp = index;
        const value = _tmp >>> 0 < bytes.length ? bytes[_tmp] : $oob();
        let _tmp$2;
        if (value === 37) {
          let _tmp$3;
          if ((index + 2 | 0) < bytes.length) {
            let _tmp$4;
            const _tmp$5 = index + 1 | 0;
            const _p = _tmp$5 >>> 0 < bytes.length ? bytes[_tmp$5] : $oob();
            if (_M0FP28yrz1234510moonrobots7is__hex(_p)) {
              const _tmp$6 = index + 2 | 0;
              const _p$2 = _tmp$6 >>> 0 < bytes.length ? bytes[_tmp$6] : $oob();
              _tmp$4 = _M0FP28yrz1234510moonrobots7is__hex(_p$2);
            } else {
              _tmp$4 = false;
            }
            _tmp$3 = _tmp$4;
          } else {
            _tmp$3 = false;
          }
          _tmp$2 = _tmp$3;
        } else {
          _tmp$2 = false;
        }
        if (_tmp$2) {
          const _tmp$3 = index + 1 | 0;
          const _p = _tmp$3 >>> 0 < bytes.length ? bytes[_tmp$3] : $oob();
          const _tmp$4 = Math.imul(_M0FP28yrz1234510moonrobots10hex__value(_p), 16) | 0;
          const _tmp$5 = index + 2 | 0;
          const _p$2 = _tmp$5 >>> 0 < bytes.length ? bytes[_tmp$5] : $oob();
          const decoded = _tmp$4 + _M0FP28yrz1234510moonrobots10hex__value(_p$2) | 0;
          if (_M0FP28yrz1234510moonrobots20is__unreserved__byte(decoded)) {
            const _p$3 = _M0MPC13int3Int8to__char(decoded);
            _M0IPB13StringBuilderPB6Logger11write__char(out, _p$3 === -1 ? $panic() : _p$3);
          } else {
            _M0FP28yrz1234510moonrobots20write__percent__byte(out, decoded);
          }
          index = index + 3 | 0;
        } else {
          if (value < 128) {
            if (value === 37) {
              _M0FP28yrz1234510moonrobots20write__percent__byte(out, value);
            } else {
              if (!preserve_pattern_tokens && (value === 42 || value === 36)) {
                _M0FP28yrz1234510moonrobots20write__percent__byte(out, value);
              } else {
                const _p = _M0MPC13int3Int8to__char(value);
                _M0IPB13StringBuilderPB6Logger11write__char(out, _p === -1 ? $panic() : _p);
              }
            }
            index = index + 1 | 0;
          } else {
            _M0FP28yrz1234510moonrobots20write__percent__byte(out, value);
            index = index + 1 | 0;
          }
        }
        continue;
      } else {
        break;
      }
    }
    return out.val;
  }
  function _M0FP28yrz1234510moonrobots15path__from__url(url) {
    const _bind = _M0MPC16string6String4find(url, new _M0TPC16string10StringView(_M0FP28yrz1234510moonrobots15path__from__urlN7_2abindS324, 0, _M0FP28yrz1234510moonrobots15path__from__urlN7_2abindS324.length));
    let without_fragment;
    if (_bind === undefined) {
      without_fragment = url;
    } else {
      const _Some = _bind;
      const _index = _Some;
      without_fragment = _M0MPC16string10StringView9to__owned(_M0MPC16string6String21clamped__view_2einner(url, 0, _index));
    }
    const _bind$2 = _M0MPC16string6String4find(without_fragment, new _M0TPC16string10StringView(_M0FP28yrz1234510moonrobots15path__from__urlN7_2abindS318, 0, _M0FP28yrz1234510moonrobots15path__from__urlN7_2abindS318.length));
    if (_bind$2 === undefined) {
      return _M0MPC16string6String11has__prefix(without_fragment, new _M0TPC16string10StringView(_M0FP28yrz1234510moonrobots15path__from__urlN7_2abindS317, 0, _M0FP28yrz1234510moonrobots15path__from__urlN7_2abindS317.length)) ? without_fragment : `/${without_fragment}`;
    } else {
      const _Some = _bind$2;
      const _scheme_end = _Some;
      const authority_start = _scheme_end + 3 | 0;
      const rest = _M0MPC16string10StringView9to__owned(_M0MPC16string6String21clamped__view_2einner(without_fragment, authority_start, undefined));
      const slash = _M0MPC16string6String4find(rest, new _M0TPC16string10StringView(_M0FP28yrz1234510moonrobots15path__from__urlN7_2abindS316, 0, _M0FP28yrz1234510moonrobots15path__from__urlN7_2abindS316.length));
      const query = _M0MPC16string6String4find(rest, new _M0TPC16string10StringView(_M0FP28yrz1234510moonrobots15path__from__urlN7_2abindS315, 0, _M0FP28yrz1234510moonrobots15path__from__urlN7_2abindS315.length));
      if (slash === undefined) {
        if (query === undefined) {
          return "/";
        } else {
          const _Some$2 = query;
          const _query_at = _Some$2;
          return `/${_M0MPC16string10StringView9to__owned(_M0MPC16string6String21clamped__view_2einner(rest, _query_at, undefined))}`;
        }
      } else {
        const _Some$2 = slash;
        const _path_at = _Some$2;
        if (query === undefined) {
          return _M0MPC16string10StringView9to__owned(_M0MPC16string6String21clamped__view_2einner(without_fragment, authority_start + _path_at | 0, undefined));
        } else {
          const _Some$3 = query;
          const _query_at = _Some$3;
          return _path_at < _query_at ? _M0MPC16string10StringView9to__owned(_M0MPC16string6String21clamped__view_2einner(without_fragment, authority_start + _path_at | 0, undefined)) : `/${_M0MPC16string10StringView9to__owned(_M0MPC16string6String21clamped__view_2einner(rest, _query_at, undefined))}`;
        }
      }
    }
  }
  function _M0FP28yrz1234510moonrobots14pattern__match(pattern, target) {
    let exact_end = false;
    let body = pattern;
    if (_M0MPC16string6String11has__suffix(body, new _M0TPC16string10StringView(_M0FP28yrz1234510moonrobots14pattern__matchN7_2abindS330, 0, _M0FP28yrz1234510moonrobots14pattern__matchN7_2abindS330.length))) {
      exact_end = true;
      body = _M0MPC16string10StringView9to__owned(_M0MPC16string6String21clamped__view_2einner(body, 0, body.length - 1 | 0));
    }
    const p = _M0MPC16string6String9to__array(body);
    const t = _M0MPC16string6String9to__array(target);
    let pi = 0;
    let ti = 0;
    let star = -1;
    let star_target = -1;
    while (true) {
      if (ti < t.length) {
        if (pi === p.length) {
          if (!exact_end) {
            return true;
          }
          if (star >= 0) {
            star_target = star_target + 1 | 0;
            ti = star_target;
            pi = star + 1 | 0;
            continue;
          } else {
            return false;
          }
        }
        if (_M0MPC15array5Array2atGcE(p, pi) === 42) {
          star = pi;
          star_target = ti;
          pi = pi + 1 | 0;
        } else {
          if (_M0MPC15array5Array2atGcE(p, pi) === _M0MPC15array5Array2atGcE(t, ti)) {
            pi = pi + 1 | 0;
            ti = ti + 1 | 0;
          } else {
            if (star >= 0) {
              star_target = star_target + 1 | 0;
              ti = star_target;
              pi = star + 1 | 0;
            } else {
              return false;
            }
          }
        }
        continue;
      } else {
        break;
      }
    }
    while (true) {
      if (pi < p.length && _M0MPC15array5Array2atGcE(p, pi) === 42) {
        pi = pi + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return pi === p.length;
  }
  function _M0FP28yrz1234510moonrobots11specificity(pattern) {
    let count = 0;
    const _bind = pattern.length;
    let _tmp = 0;
    while (true) {
      const _string_index = _tmp;
      if (_string_index < _bind) {
        let _decoded_next_string_index;
        let _decoded_char;
        _L: {
          const _bind$2 = pattern.charCodeAt(_string_index);
          if (_bind$2 >= 55296 && _bind$2 <= 56319 && (_string_index + 1 | 0) < _bind) {
            const _bind$3 = pattern.charCodeAt(_string_index + 1 | 0);
            if (_bind$3 >= 56320 && _bind$3 <= 57343) {
              const _tmp$2 = _string_index + 2 | 0;
              const _p = (((Math.imul(_bind$2 - 55296 | 0, 1024) | 0) + _bind$3 | 0) - 56320 | 0) + 65536 | 0;
              _decoded_next_string_index = _tmp$2;
              _decoded_char = _p;
              break _L;
            } else {
              const _tmp$2 = _string_index + 1 | 0;
              const _p = _bind$2;
              _decoded_next_string_index = _tmp$2;
              _decoded_char = _p;
              break _L;
            }
          } else {
            const _tmp$2 = _string_index + 1 | 0;
            const _p = _bind$2;
            _decoded_next_string_index = _tmp$2;
            _decoded_char = _p;
            break _L;
          }
        }
        if (_decoded_char !== 42 && _decoded_char !== 36) {
          count = count + 1 | 0;
        }
        _tmp = _decoded_next_string_index;
        continue;
      } else {
        break;
      }
    }
    return count;
  }
  function _M0FP28yrz1234510moonrobots15selected__rules(robots, user_agent) {
    const requested = _M0MPC16string6String9to__lower(user_agent);
    let best = 0;
    const _bind = robots.groups;
    const _bind$2 = _bind.length;
    let _tmp = 0;
    while (true) {
      const _ = _tmp;
      if (_ < _bind$2) {
        const group = _bind[_];
        const _bind$3 = group.agents;
        const _bind$4 = _bind$3.length;
        let _tmp$2 = 0;
        while (true) {
          const _$2 = _tmp$2;
          if (_$2 < _bind$4) {
            const agent = _bind$3[_$2];
            let _tmp$3;
            const _p = "*";
            if (!(agent === _p)) {
              _tmp$3 = requested === agent && agent.length > best;
            } else {
              _tmp$3 = false;
            }
            if (_tmp$3) {
              best = agent.length;
            }
            _tmp$2 = _$2 + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        _tmp = _ + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    const rules = [];
    const selected = [];
    const _bind$3 = robots.groups;
    const _bind$4 = _bind$3.length;
    let _tmp$2 = 0;
    while (true) {
      const _ = _tmp$2;
      if (_ < _bind$4) {
        const group = _bind$3[_];
        let chosen = false;
        const _bind$5 = group.agents;
        const _bind$6 = _bind$5.length;
        let _tmp$3 = 0;
        while (true) {
          const _$2 = _tmp$3;
          if (_$2 < _bind$6) {
            const agent = _bind$5[_$2];
            if (best > 0) {
              let _tmp$4;
              const _p = "*";
              if (!(agent === _p)) {
                _tmp$4 = requested === agent && agent.length === best;
              } else {
                _tmp$4 = false;
              }
              if (_tmp$4) {
                chosen = true;
              }
            } else {
              if (agent === "*") {
                chosen = true;
              }
            }
            _tmp$3 = _$2 + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        if (chosen) {
          const _bind$7 = group.rules;
          const _bind$8 = _bind$7.length;
          let _tmp$4 = 0;
          while (true) {
            const _$2 = _tmp$4;
            if (_$2 < _bind$8) {
              const rule = _bind$7[_$2];
              _M0MPC15array5Array4pushGRP28yrz1234510moonrobots10DiagnosticE(rules, rule);
              _tmp$4 = _$2 + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          const _bind$9 = group.agents;
          const _bind$10 = _bind$9.length;
          let _tmp$5 = 0;
          while (true) {
            const _$2 = _tmp$5;
            if (_$2 < _bind$10) {
              const agent = _bind$9[_$2];
              if (!_M0MPC15array5Array8containsGsE(selected, agent)) {
                _M0MPC15array5Array4pushGRP28yrz1234510moonrobots10DiagnosticE(selected, agent);
              }
              _tmp$5 = _$2 + 1 | 0;
              continue;
            } else {
              break;
            }
          }
        }
        _tmp$2 = _ + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return { _0: rules, _1: selected };
  }
  function _M0FP28yrz1234510moonrobots15evaluate__trace(robots, user_agent, url) {
    const raw_path = _M0FP28yrz1234510moonrobots15path__from__url(url);
    const path = _M0FP28yrz1234510moonrobots15normalize__path(raw_path, false);
    if (raw_path === "/robots.txt" || _M0MPC16string6String11has__prefix(raw_path, new _M0TPC16string10StringView(_M0FP28yrz1234510moonrobots15evaluate__traceN7_2abindS373, 0, _M0FP28yrz1234510moonrobots15evaluate__traceN7_2abindS373.length))) {
      return new _M0TP28yrz1234510moonrobots15EvaluationTrace(new _M0TP28yrz1234510moonrobots8Decision(true, user_agent, path, [], undefined, 0, 0), []);
    }
    const _bind = _M0FP28yrz1234510moonrobots15selected__rules(robots, user_agent);
    const _rules = _bind._0;
    const _selected_agents = _bind._1;
    if (_selected_agents.length === 0) {
      return new _M0TP28yrz1234510moonrobots15EvaluationTrace(new _M0TP28yrz1234510moonrobots8Decision(true, user_agent, path, _selected_agents, undefined, 0, 1), []);
    }
    let winner = undefined;
    let winner_length = -1;
    const candidates = [];
    const _bind$2 = _rules.length;
    let _tmp = 0;
    while (true) {
      const _ = _tmp;
      if (_ < _bind$2) {
        const rule = _rules[_];
        const normalized = _M0FP28yrz1234510moonrobots15normalize__path(rule.pattern, true);
        const matched = _M0FP28yrz1234510moonrobots14pattern__match(normalized, path);
        const length = _M0FP28yrz1234510moonrobots11specificity(normalized);
        _M0MPC15array5Array4pushGRP28yrz1234510moonrobots10DiagnosticE(candidates, new _M0TP28yrz1234510moonrobots14RuleEvaluation(rule, normalized, matched, length));
        if (matched) {
          const replace = length > winner_length || length === winner_length && _M0IP28yrz1234510moonrobots8RuleKindPB2Eq5equal(rule.kind, 0);
          if (replace) {
            winner = rule;
            winner_length = length;
          }
        }
        _tmp = _ + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    const _bind$3 = winner;
    let decision;
    if (_bind$3 === undefined) {
      decision = new _M0TP28yrz1234510moonrobots8Decision(true, user_agent, path, _selected_agents, undefined, 0, 2);
    } else {
      const _Some = _bind$3;
      const _rule = _Some;
      decision = new _M0TP28yrz1234510moonrobots8Decision(_M0IP28yrz1234510moonrobots8RuleKindPB2Eq5equal(_rule.kind, 0), user_agent, path, _selected_agents, _rule, winner_length, 3);
    }
    return new _M0TP28yrz1234510moonrobots15EvaluationTrace(decision, candidates);
  }
  function _M0FP38yrz1234510moonrobots8web__api7analyze(source, user_agent, url) {
    const file = _M0FP28yrz1234510moonrobots5parse(source);
    const trace = _M0FP28yrz1234510moonrobots15evaluate__trace(file, user_agent, url);
    const _p = _M0FP28yrz1234510moonrobots4lint(file);
    const _p$2 = new Array(_p.length);
    const _p$3 = _p.length;
    let _tmp = 0;
    while (true) {
      const _p$4 = _tmp;
      if (_p$4 < _p$3) {
        const _p$5 = _p[_p$4];
        _p$2[_p$4] = _M0FP28yrz1234510moonrobots16diagnostic__json(_p$5);
        _tmp = _p$4 + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    const diagnostics = _p$2;
    const _tmp$2 = { _0: "engineVersion", _1: _M0MPC14json4Json4JsonGsE("0.1.0") };
    const _tmp$3 = { _0: "groups", _1: _M0MPC14json4Json4JsonGiE(file.groups.length) };
    const _p$4 = file.groups;
    const _p$5 = 0;
    const _p$6 = _p$4.length;
    let _tmp$4;
    let _tmp$5 = 0;
    let _tmp$6 = _p$5;
    while (true) {
      const _p$7 = _tmp$5;
      const _p$8 = _tmp$6;
      if (_p$7 < _p$6) {
        const _p$9 = _p$4[_p$7];
        _tmp$5 = _p$7 + 1 | 0;
        _tmp$6 = _p$8 + _p$9.rules.length | 0;
        continue;
      } else {
        _tmp$4 = _p$8;
        break;
      }
    }
    const _bind = [_tmp$2, _tmp$3, { _0: "rules", _1: _M0MPC14json4Json4JsonGiE(_tmp$4) }, { _0: "sitemaps", _1: _M0MPC14json4Json4JsonGRPB5ArrayGsEE(file.sitemaps) }, { _0: "diagnostics", _1: _M0MPC14json4Json4JsonGRPB5ArrayGRPB4JsonEE(diagnostics) }, { _0: "trace", _1: _M0FP28yrz1234510moonrobots23evaluation__trace__json(trace) }];
    const _p$7 = _M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind, 0, 6), undefined);
    const result = new _M0DTPB4Json6Object(_p$7);
    return _M0MPC14json4Json17stringify_2einner(result, false, 0, undefined);
  }
  globalThis.analyze = _M0FP38yrz1234510moonrobots8web__api7analyze;
})();
