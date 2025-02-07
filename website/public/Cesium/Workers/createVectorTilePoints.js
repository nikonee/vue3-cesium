define([
  './AttributeCompression-af389d04',
  './Matrix2-9aa31791',
  './ComponentDatatype-93750d1a',
  './createTaskProcessorWorker',
  './RuntimeError-346a3079',
  './when-4bbc8319',
  './WebGLConstants-1c8239cc'
], function (a, r, e, t, n, i, o) {
  'use strict'
  var s = 32767,
    c = new r.Cartographic(),
    u = new r.Cartesian3(),
    p = new r.Rectangle(),
    l = new r.Ellipsoid(),
    m = { min: void 0, max: void 0 }
  return t(function (t, n) {
    var i = new Uint16Array(t.positions)
    !(function (a) {
      a = new Float64Array(a)
      var e = 0
      ;(m.min = a[e++]), (m.max = a[e++]), r.Rectangle.unpack(a, e, p), (e += r.Rectangle.packedLength), r.Ellipsoid.unpack(a, e, l)
    })(t.packedBuffer)
    var o = p,
      f = l,
      h = m.min,
      C = m.max,
      d = i.length / 3,
      g = i.subarray(0, d),
      b = i.subarray(d, 2 * d),
      w = i.subarray(2 * d, 3 * d)
    a.AttributeCompression.zigZagDeltaDecode(g, b, w)
    for (var v = new Float64Array(i.length), k = 0; k < d; ++k) {
      var y = g[k],
        A = b[k],
        R = w[k],
        x = e.CesiumMath.lerp(o.west, o.east, y / s),
        M = e.CesiumMath.lerp(o.south, o.north, A / s),
        D = e.CesiumMath.lerp(h, C, R / s),
        E = r.Cartographic.fromRadians(x, M, D, c),
        F = f.cartographicToCartesian(E, u)
      r.Cartesian3.pack(F, v, 3 * k)
    }
    return n.push(v.buffer), { positions: v.buffer }
  })
})
