define(['exports', './RuntimeError-346a3079', './when-4bbc8319', './ComponentDatatype-93750d1a'], function (e, n, i, d) {
  'use strict'
  var t = d.CesiumMath.EPSILON10
  e.arrayRemoveDuplicates = function (e, n, d, r) {
    if (i.defined(e)) {
      d = i.defaultValue(d, !1)
      var f,
        a = i.defined(r),
        u = e.length
      if (u < 2) return e
      var s,
        l,
        c = e[0],
        h = 0,
        o = -1
      for (f = 1; f < u; ++f)
        n(c, (s = e[f]), t)
          ? (i.defined(l) || ((l = e.slice(0, f)), (h = f - 1), (o = 0)), a && r.push(f))
          : (i.defined(l) && (l.push(s), (h = f), a && (o = r.length)), (c = s))
      return (
        d && n(e[0], e[u - 1], t) && (a && (i.defined(l) ? r.splice(o, 0, h) : r.push(u - 1)), i.defined(l) ? (l.length -= 1) : (l = e.slice(0, -1))),
        i.defined(l) ? l : e
      )
    }
  }
})
