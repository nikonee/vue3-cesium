define(['exports', './RuntimeError-346a3079', './when-4bbc8319'], function (t, e, r) {
  'use strict'
  var a = Object.freeze({ NONE: 0, TOP: 1, ALL: 2 })
  ;(t.GeometryOffsetAttribute = a),
    (t.arrayFill = function (t, e, a, f) {
      if ('function' == typeof t.fill) return t.fill(e, a, f)
      for (
        var n = t.length >>> 0,
          i = r.defaultValue(a, 0),
          u = i < 0 ? Math.max(n + i, 0) : Math.min(i, n),
          l = r.defaultValue(f, n),
          o = l < 0 ? Math.max(n + l, 0) : Math.min(l, n);
        u < o;

      )
        (t[u] = e), u++
      return t
    })
})
