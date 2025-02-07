define([
  './Matrix2-9aa31791',
  './combine-83860057',
  './AttributeCompression-af389d04',
  './ComponentDatatype-93750d1a',
  './IndexDatatype-b7d979a6',
  './createTaskProcessorWorker',
  './RuntimeError-346a3079',
  './when-4bbc8319',
  './WebGLConstants-1c8239cc'
], function (a, e, r, n, t, i, s, o, u) {
  'use strict'
  var c = 32767,
    f = new a.Cartographic(),
    p = new a.Cartesian3()
  var d = new a.Rectangle(),
    C = new a.Ellipsoid(),
    b = new a.Cartesian3(),
    l = { min: void 0, max: void 0 }
  var w = new a.Cartesian3(),
    h = new a.Cartesian3(),
    v = new a.Cartesian3(),
    y = new a.Cartesian3(),
    k = new a.Cartesian3()
  return i(function (i, s) {
    var o = new Uint16Array(i.positions),
      u = new Uint16Array(i.widths),
      m = new Uint32Array(i.counts),
      A = new Uint16Array(i.batchIds)
    !(function (e) {
      e = new Float64Array(e)
      var r = 0
      ;(l.min = e[r++]),
        (l.max = e[r++]),
        a.Rectangle.unpack(e, r, d),
        (r += a.Rectangle.packedLength),
        a.Ellipsoid.unpack(e, r, C),
        (r += a.Ellipsoid.packedLength),
        a.Cartesian3.unpack(e, r, b)
    })(i.packedBuffer)
    var g,
      x = C,
      D = b,
      E = (function (e, t, i, s, o) {
        var u = e.length / 3,
          d = e.subarray(0, u),
          C = e.subarray(u, 2 * u),
          b = e.subarray(2 * u, 3 * u)
        r.AttributeCompression.zigZagDeltaDecode(d, C, b)
        for (var l = new Float64Array(e.length), w = 0; w < u; ++w) {
          var h = d[w],
            v = C[w],
            y = b[w],
            k = n.CesiumMath.lerp(t.west, t.east, h / c),
            m = n.CesiumMath.lerp(t.south, t.north, v / c),
            A = n.CesiumMath.lerp(i, s, y / c),
            g = a.Cartographic.fromRadians(k, m, A, f),
            x = o.cartographicToCartesian(g, p)
          a.Cartesian3.pack(x, l, 3 * w)
        }
        return l
      })(o, d, l.min, l.max, x),
      I = E.length / 3,
      P = 4 * I - 4,
      U = new Float32Array(3 * P),
      R = new Float32Array(3 * P),
      T = new Float32Array(3 * P),
      F = new Float32Array(2 * P),
      N = new Uint16Array(P),
      M = 0,
      L = 0,
      S = 0,
      _ = 0,
      G = m.length
    for (g = 0; g < G; ++g) {
      for (var W = m[g], B = u[g], O = A[g], z = 0; z < W; ++z) {
        var H
        if (0 === z) {
          var Y = a.Cartesian3.unpack(E, 3 * _, w),
            Z = a.Cartesian3.unpack(E, 3 * (_ + 1), h)
          ;(H = a.Cartesian3.subtract(Y, Z, v)), a.Cartesian3.add(Y, H, H)
        } else H = a.Cartesian3.unpack(E, 3 * (_ + z - 1), v)
        var j,
          q = a.Cartesian3.unpack(E, 3 * (_ + z), y)
        if (z === W - 1) {
          var J = a.Cartesian3.unpack(E, 3 * (_ + W - 1), w),
            K = a.Cartesian3.unpack(E, 3 * (_ + W - 2), h)
          ;(j = a.Cartesian3.subtract(J, K, k)), a.Cartesian3.add(J, j, j)
        } else j = a.Cartesian3.unpack(E, 3 * (_ + z + 1), k)
        a.Cartesian3.subtract(H, D, H), a.Cartesian3.subtract(q, D, q), a.Cartesian3.subtract(j, D, j)
        for (var Q = z === W - 1 ? 2 : 4, V = 0 === z ? 2 : 0; V < Q; ++V) {
          a.Cartesian3.pack(q, U, M), a.Cartesian3.pack(H, R, M), a.Cartesian3.pack(j, T, M), (M += 3)
          var X = V - 2 < 0 ? -1 : 1
          ;(F[L++] = (V % 2) * 2 - 1), (F[L++] = X * B), (N[S++] = O)
        }
      }
      _ += W
    }
    var $ = t.IndexDatatype.createTypedArray(P, 6 * I - 6),
      aa = 0,
      ea = 0
    for (G = I - 1, g = 0; g < G; ++g)
      ($[ea++] = aa), ($[ea++] = aa + 2), ($[ea++] = aa + 1), ($[ea++] = aa + 1), ($[ea++] = aa + 2), ($[ea++] = aa + 3), (aa += 4)
    s.push(U.buffer, R.buffer, T.buffer), s.push(F.buffer, N.buffer, $.buffer)
    var ra = {
      indexDatatype: 2 === $.BYTES_PER_ELEMENT ? t.IndexDatatype.UNSIGNED_SHORT : t.IndexDatatype.UNSIGNED_INT,
      currentPositions: U.buffer,
      previousPositions: R.buffer,
      nextPositions: T.buffer,
      expandAndWidth: F.buffer,
      batchIds: N.buffer,
      indices: $.buffer
    }
    if (i.keepDecodedPositions) {
      var na = (function (a) {
        for (var e = a.length, r = new Uint32Array(e + 1), n = 0, t = 0; t < e; ++t) (r[t] = n), (n += a[t])
        return (r[e] = n), r
      })(m)
      s.push(E.buffer, na.buffer), (ra = e.combine(ra, { decodedPositions: E.buffer, decodedPositionOffsets: na.buffer }))
    }
    return ra
  })
})
