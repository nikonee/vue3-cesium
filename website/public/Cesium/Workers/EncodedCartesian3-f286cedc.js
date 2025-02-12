define(['exports', './Matrix2-9aa31791', './RuntimeError-346a3079', './when-4bbc8319'], function (e, n, i, o) {
  'use strict'
  function r() {
    ;(this.high = n.Cartesian3.clone(n.Cartesian3.ZERO)), (this.low = n.Cartesian3.clone(n.Cartesian3.ZERO))
  }
  r.encode = function (e, n) {
    var i
    return (
      o.defined(n) || (n = { high: 0, low: 0 }),
      e >= 0
        ? ((i = 65536 * Math.floor(e / 65536)), (n.high = i), (n.low = e - i))
        : ((i = 65536 * Math.floor(-e / 65536)), (n.high = -i), (n.low = e + i)),
      n
    )
  }
  var a = { high: 0, low: 0 }
  r.fromCartesian = function (e, n) {
    o.defined(n) || (n = new r())
    var i = n.high,
      h = n.low
    return (
      r.encode(e.x, a),
      (i.x = a.high),
      (h.x = a.low),
      r.encode(e.y, a),
      (i.y = a.high),
      (h.y = a.low),
      r.encode(e.z, a),
      (i.z = a.high),
      (h.z = a.low),
      n
    )
  }
  var h = new r()
  ;(r.writeElements = function (e, n, i) {
    r.fromCartesian(e, h)
    var o = h.high,
      a = h.low
    ;(n[i] = o.x), (n[i + 1] = o.y), (n[i + 2] = o.z), (n[i + 3] = a.x), (n[i + 4] = a.y), (n[i + 5] = a.z)
  }),
    (e.EncodedCartesian3 = r)
})
