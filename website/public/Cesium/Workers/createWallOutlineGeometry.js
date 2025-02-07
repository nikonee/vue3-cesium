define([
  './when-4bbc8319',
  './Matrix2-9aa31791',
  './Transforms-d13cc04e',
  './ComponentDatatype-93750d1a',
  './RuntimeError-346a3079',
  './GeometryAttribute-43536dc0',
  './GeometryAttributes-7827a6c2',
  './IndexDatatype-b7d979a6',
  './WallGeometryLibrary-d3b18e7c',
  './combine-83860057',
  './WebGLConstants-1c8239cc',
  './arrayRemoveDuplicates-18786327',
  './PolylinePipeline-64021a2e',
  './EllipsoidGeodesic-dd8f2afb',
  './EllipsoidRhumbLine-30c47ff4',
  './IntersectionTests-96a04219',
  './Plane-318d6937'
], function (e, i, t, a, n, r, o, s, l, m, d, u, p, f, c, h, g) {
  'use strict'
  var y = new i.Cartesian3(),
    v = new i.Cartesian3()
  function _(t) {
    var n = (t = e.defaultValue(t, e.defaultValue.EMPTY_OBJECT)).positions,
      r = t.maximumHeights,
      o = t.minimumHeights,
      s = e.defaultValue(t.granularity, a.CesiumMath.RADIANS_PER_DEGREE),
      l = e.defaultValue(t.ellipsoid, i.Ellipsoid.WGS84)
    ;(this._positions = n),
      (this._minimumHeights = o),
      (this._maximumHeights = r),
      (this._granularity = s),
      (this._ellipsoid = i.Ellipsoid.clone(l)),
      (this._workerName = 'createWallOutlineGeometry')
    var m = 1 + n.length * i.Cartesian3.packedLength + 2
    e.defined(o) && (m += o.length), e.defined(r) && (m += r.length), (this.packedLength = m + i.Ellipsoid.packedLength + 1)
  }
  _.pack = function (t, a, n) {
    var r
    n = e.defaultValue(n, 0)
    var o = t._positions,
      s = o.length
    for (a[n++] = s, r = 0; r < s; ++r, n += i.Cartesian3.packedLength) i.Cartesian3.pack(o[r], a, n)
    var l = t._minimumHeights
    if (((s = e.defined(l) ? l.length : 0), (a[n++] = s), e.defined(l))) for (r = 0; r < s; ++r) a[n++] = l[r]
    var m = t._maximumHeights
    if (((s = e.defined(m) ? m.length : 0), (a[n++] = s), e.defined(m))) for (r = 0; r < s; ++r) a[n++] = m[r]
    return i.Ellipsoid.pack(t._ellipsoid, a, n), (a[(n += i.Ellipsoid.packedLength)] = t._granularity), a
  }
  var E = i.Ellipsoid.clone(i.Ellipsoid.UNIT_SPHERE),
    C = { positions: void 0, minimumHeights: void 0, maximumHeights: void 0, ellipsoid: E, granularity: void 0 }
  return (
    (_.unpack = function (t, a, n) {
      var r
      a = e.defaultValue(a, 0)
      var o,
        s,
        l = t[a++],
        m = new Array(l)
      for (r = 0; r < l; ++r, a += i.Cartesian3.packedLength) m[r] = i.Cartesian3.unpack(t, a)
      if ((l = t[a++]) > 0) for (o = new Array(l), r = 0; r < l; ++r) o[r] = t[a++]
      if ((l = t[a++]) > 0) for (s = new Array(l), r = 0; r < l; ++r) s[r] = t[a++]
      var d = i.Ellipsoid.unpack(t, a, E),
        u = t[(a += i.Ellipsoid.packedLength)]
      return e.defined(n)
        ? ((n._positions = m),
          (n._minimumHeights = o),
          (n._maximumHeights = s),
          (n._ellipsoid = i.Ellipsoid.clone(d, n._ellipsoid)),
          (n._granularity = u),
          n)
        : ((C.positions = m), (C.minimumHeights = o), (C.maximumHeights = s), (C.granularity = u), new _(C))
    }),
    (_.fromConstantHeights = function (i) {
      var t,
        a,
        n = (i = e.defaultValue(i, e.defaultValue.EMPTY_OBJECT)).positions,
        r = i.minimumHeight,
        o = i.maximumHeight,
        s = e.defined(r),
        l = e.defined(o)
      if (s || l) {
        var m = n.length
        ;(t = s ? new Array(m) : void 0), (a = l ? new Array(m) : void 0)
        for (var d = 0; d < m; ++d) s && (t[d] = r), l && (a[d] = o)
      }
      return new _({ positions: n, maximumHeights: a, minimumHeights: t, ellipsoid: i.ellipsoid })
    }),
    (_.createGeometry = function (n) {
      var m = n._positions,
        d = n._minimumHeights,
        u = n._maximumHeights,
        p = n._granularity,
        f = n._ellipsoid,
        c = l.WallGeometryLibrary.computePositions(f, m, u, d, p, !1)
      if (e.defined(c)) {
        var h,
          g = c.bottomPositions,
          _ = c.topPositions,
          E = _.length,
          C = 2 * E,
          H = new Float64Array(C),
          b = 0
        for (E /= 3, h = 0; h < E; ++h) {
          var A = 3 * h,
            w = i.Cartesian3.fromArray(_, A, y),
            k = i.Cartesian3.fromArray(g, A, v)
          ;(H[b++] = k.x), (H[b++] = k.y), (H[b++] = k.z), (H[b++] = w.x), (H[b++] = w.y), (H[b++] = w.z)
        }
        var x = new o.GeometryAttributes({
            position: new r.GeometryAttribute({ componentDatatype: a.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: H })
          }),
          G = C / 3
        C = 2 * G - 4 + G
        var L = s.IndexDatatype.createTypedArray(G, C),
          P = 0
        for (h = 0; h < G - 2; h += 2) {
          var T = h,
            D = h + 2,
            V = i.Cartesian3.fromArray(H, 3 * T, y),
            I = i.Cartesian3.fromArray(H, 3 * D, v)
          if (!i.Cartesian3.equalsEpsilon(V, I, a.CesiumMath.EPSILON10)) {
            var R = h + 1,
              S = h + 3
            ;(L[P++] = R), (L[P++] = T), (L[P++] = R), (L[P++] = S), (L[P++] = T), (L[P++] = D)
          }
        }
        return (
          (L[P++] = G - 2),
          (L[P++] = G - 1),
          new r.Geometry({ attributes: x, indices: L, primitiveType: r.PrimitiveType.LINES, boundingSphere: new t.BoundingSphere.fromVertices(H) })
        )
      }
    }),
    function (t, a) {
      return e.defined(a) && (t = _.unpack(t, a)), (t._ellipsoid = i.Ellipsoid.clone(t._ellipsoid)), _.createGeometry(t)
    }
  )
})
