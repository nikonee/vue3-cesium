define(['exports'], function (n) {
  'use strict'
  function r(n, r) {
    return null != n ? n : r
  }
  r.EMPTY_OBJECT = Object.freeze({})
  var e =
    'undefined' != typeof globalThis
      ? globalThis
      : 'undefined' != typeof window
      ? window
      : 'undefined' != typeof global
      ? global
      : 'undefined' != typeof self
      ? self
      : {}
  function t(n, r, e) {
    return (
      n(
        (e = {
          path: r,
          exports: {},
          require: function (n, r) {
            return (function () {
              throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs')
            })(null == r && e.path)
          }
        }),
        e.exports
      ),
      e.exports
    )
  }
  var u = t(function (n, r) {
    /** @license MIT License (c) copyright B Cavalier & J Hann */
    var e
    ;(e = function () {
      var n, r, e
      function t(n, r, e, t) {
        return u(n).then(r, e, t)
      }
      function u(n) {
        var r, e, t
        return (
          n instanceof o
            ? (r = n)
            : c(n)
            ? ((e = f()),
              n.then(
                function (n) {
                  e.resolve(n)
                },
                function (n) {
                  e.reject(n)
                },
                function (n) {
                  e.progress(n)
                }
              ),
              (r = e.promise))
            : ((t = n),
              (r = new o(function (n) {
                try {
                  return u(n ? n(t) : t)
                } catch (n) {
                  return i(n)
                }
              }))),
          r
        )
      }
      function o(n) {
        this.then = n
      }
      function i(n) {
        return new o(function (r, e) {
          try {
            return e ? u(e(n)) : i(n)
          } catch (n) {
            return i(n)
          }
        })
      }
      function f() {
        var n, r, t, c, s, l
        return (
          (n = new o(a)),
          (r = []),
          (t = []),
          (c = function (n, e, u) {
            var o, i
            return (
              (o = f()),
              (i =
                'function' == typeof u
                  ? function (n) {
                      try {
                        o.progress(u(n))
                      } catch (n) {
                        o.progress(n)
                      }
                    }
                  : function (n) {
                      o.progress(n)
                    }),
              r.push(function (r) {
                r.then(n, e).then(o.resolve, o.reject, i)
              }),
              t.push(i),
              o.promise
            )
          }),
          (s = function (n) {
            return h(t, n), n
          }),
          (l = function (n) {
            return (n = u(n)), (c = n.then), (l = u), (s = v), h(r, n), (t = r = e), n
          }),
          { then: a, resolve: p, reject: d, progress: g, promise: n, resolver: { resolve: p, reject: d, progress: g } }
        )
        function a(n, r, e) {
          return c(n, r, e)
        }
        function p(n) {
          return l(n)
        }
        function d(n) {
          return l(i(n))
        }
        function g(n) {
          return s(n)
        }
      }
      function c(n) {
        return n && 'function' == typeof n.then
      }
      function s(n, r, e, u, o) {
        return (
          p(2, arguments),
          t(n, function (n) {
            var i, c, s, l, a, h, p, d, g, y
            if (((g = n.length >>> 0), (i = Math.max(0, Math.min(r, g))), (s = []), (c = g - i + 1), (l = []), (a = f()), i))
              for (
                d = a.progress,
                  p = function (n) {
                    l.push(n), --c || ((h = p = v), a.reject(l))
                  },
                  h = function (n) {
                    s.push(n), --i || ((h = p = v), a.resolve(s))
                  },
                  y = 0;
                y < g;
                ++y
              )
                y in n && t(n[y], w, m, d)
            else a.resolve(s)
            return a.then(e, u, o)
            function m(n) {
              p(n)
            }
            function w(n) {
              h(n)
            }
          })
        )
      }
      function l(n, r, e, t) {
        return p(1, arguments), a(n, d).then(r, e, t)
      }
      function a(n, r) {
        return t(n, function (n) {
          var e, u, o, i, c, s
          if (((o = u = n.length >>> 0), (e = []), (s = f()), o))
            for (
              i = function (n, u) {
                t(n, r).then(function (n) {
                  ;(e[u] = n), --o || s.resolve(e)
                }, s.reject)
              },
                c = 0;
              c < u;
              c++
            )
              c in n ? i(n[c], c) : --o
          else s.resolve(e)
          return s.promise
        })
      }
      function h(n, r) {
        for (var e, t = 0; (e = n[t++]); ) e(r)
      }
      function p(n, r) {
        for (var e, t = r.length; t > n; ) if (null != (e = r[--t]) && 'function' != typeof e) throw new Error('arg ' + t + ' must be a function')
      }
      function v() {}
      function d(n) {
        return n
      }
      return (
        (t.defer = f),
        (t.resolve = u),
        (t.reject = function (n) {
          return t(n, i)
        }),
        (t.join = function () {
          return a(arguments, d)
        }),
        (t.all = l),
        (t.map = a),
        (t.reduce = function (e, u) {
          var o = r.call(arguments, 1)
          return t(e, function (r) {
            var e
            return (
              (e = r.length),
              (o[0] = function (n, r, o) {
                return t(n, function (n) {
                  return t(r, function (r) {
                    return u(n, r, o, e)
                  })
                })
              }),
              n.apply(r, o)
            )
          })
        }),
        (t.any = function (n, r, e, t) {
          return s(
            n,
            1,
            function (n) {
              return r ? r(n[0]) : n[0]
            },
            e,
            t
          )
        }),
        (t.some = s),
        (t.chain = function (n, r, e) {
          var u = arguments.length > 2
          return t(
            n,
            function (n) {
              return (n = u ? e : n), r.resolve(n), n
            },
            function (n) {
              return r.reject(n), i(n)
            },
            r.progress
          )
        }),
        (t.isPromise = c),
        (o.prototype = {
          always: function (n, r) {
            return this.then(n, n, r)
          },
          otherwise: function (n) {
            return this.then(e, n)
          },
          yield: function (n) {
            return this.then(function () {
              return n
            })
          },
          spread: function (n) {
            return this.then(function (r) {
              return l(r, function (r) {
                return n.apply(e, r)
              })
            })
          }
        }),
        (r = [].slice),
        (n =
          [].reduce ||
          function (n) {
            var r, e, t, u, o
            if (((o = 0), (u = (r = Object(this)).length >>> 0), (e = arguments).length <= 1))
              for (;;) {
                if (o in r) {
                  t = r[o++]
                  break
                }
                if (++o >= u) throw new TypeError()
              }
            else t = e[1]
            for (; o < u; ++o) o in r && (t = n(t, r[o], o, r))
            return t
          }),
        t
      )
    }),
      (n.exports = e())
  })
  ;(n.commonjsGlobal = e),
    (n.createCommonjsModule = t),
    (n.defaultValue = r),
    (n.defined = function (n) {
      return null != n
    }),
    (n.when = u)
})
