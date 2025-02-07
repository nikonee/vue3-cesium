define([
  './AttributeCompression-af389d04',
  './Transforms-d13cc04e',
  './Matrix2-9aa31791',
  './when-4bbc8319',
  './TerrainEncoding-ba779f11',
  './IndexDatatype-b7d979a6',
  './RuntimeError-346a3079',
  './ComponentDatatype-93750d1a',
  './OrientedBoundingBox-4b932f63',
  './createTaskProcessorWorker',
  './combine-83860057',
  './WebGLConstants-1c8239cc',
  './EllipsoidTangentPlane-eecce7e8',
  './AxisAlignedBoundingBox-07c6b7f2',
  './IntersectionTests-96a04219',
  './Plane-318d6937'
], function (e, i, t, n, s, r, h, u, o, a, p, d, l, f, c, g) {
  'use strict'
  var m = {
      clipTriangleAtAxisAlignedThreshold: function (e, i, t, s, r, h) {
        var u, o, a
        n.defined(h) ? (h.length = 0) : (h = []), i ? ((u = t < e), (o = s < e), (a = r < e)) : ((u = t > e), (o = s > e), (a = r > e))
        var p,
          d,
          l,
          f,
          c,
          g,
          m = u + o + a
        return (
          1 === m
            ? u
              ? ((p = (e - t) / (s - t)),
                (d = (e - t) / (r - t)),
                h.push(1),
                h.push(2),
                1 !== d && (h.push(-1), h.push(0), h.push(2), h.push(d)),
                1 !== p && (h.push(-1), h.push(0), h.push(1), h.push(p)))
              : o
              ? ((l = (e - s) / (r - s)),
                (f = (e - s) / (t - s)),
                h.push(2),
                h.push(0),
                1 !== f && (h.push(-1), h.push(1), h.push(0), h.push(f)),
                1 !== l && (h.push(-1), h.push(1), h.push(2), h.push(l)))
              : a &&
                ((c = (e - r) / (t - r)),
                (g = (e - r) / (s - r)),
                h.push(0),
                h.push(1),
                1 !== g && (h.push(-1), h.push(2), h.push(1), h.push(g)),
                1 !== c && (h.push(-1), h.push(2), h.push(0), h.push(c)))
            : 2 === m
            ? u || t === e
              ? o || s === e
                ? a ||
                  r === e ||
                  ((d = (e - t) / (r - t)),
                  (l = (e - s) / (r - s)),
                  h.push(2),
                  h.push(-1),
                  h.push(0),
                  h.push(2),
                  h.push(d),
                  h.push(-1),
                  h.push(1),
                  h.push(2),
                  h.push(l))
                : ((g = (e - r) / (s - r)),
                  (p = (e - t) / (s - t)),
                  h.push(1),
                  h.push(-1),
                  h.push(2),
                  h.push(1),
                  h.push(g),
                  h.push(-1),
                  h.push(0),
                  h.push(1),
                  h.push(p))
              : ((f = (e - s) / (t - s)),
                (c = (e - r) / (t - r)),
                h.push(0),
                h.push(-1),
                h.push(1),
                h.push(0),
                h.push(f),
                h.push(-1),
                h.push(2),
                h.push(0),
                h.push(c))
            : 3 !== m && (h.push(0), h.push(1), h.push(2)),
          h
        )
      },
      computeBarycentricCoordinates: function (e, i, s, r, h, u, o, a, p) {
        var d = s - o,
          l = o - h,
          f = u - a,
          c = r - a,
          g = 1 / (f * d + l * c),
          m = i - a,
          x = e - o,
          v = (f * x + l * m) * g,
          w = (-c * x + d * m) * g,
          C = 1 - v - w
        return n.defined(p) ? ((p.x = v), (p.y = w), (p.z = C), p) : new t.Cartesian3(v, w, C)
      },
      computeLineSegmentLineSegmentIntersection: function (e, i, s, r, h, u, o, a, p) {
        var d = (a - u) * (s - e) - (o - h) * (r - i)
        if (0 !== d) {
          var l = ((o - h) * (i - u) - (a - u) * (e - h)) / d,
            f = ((s - e) * (i - u) - (r - i) * (e - h)) / d
          return l >= 0 && l <= 1 && f >= 0 && f <= 1
            ? (n.defined(p) || (p = new t.Cartesian2()), (p.x = e + l * (s - e)), (p.y = i + l * (r - i)), p)
            : void 0
        }
      }
    },
    x = 32767,
    v = 16383,
    w = [],
    C = [],
    B = [],
    y = new t.Cartographic(),
    I = new t.Cartesian3(),
    A = [],
    b = [],
    T = [],
    z = [],
    M = [],
    N = new t.Cartesian3(),
    V = new i.BoundingSphere(),
    E = new o.OrientedBoundingBox(),
    R = new t.Cartesian2(),
    H = new t.Cartesian3()
  function O() {
    ;(this.vertexBuffer = void 0), (this.index = void 0), (this.first = void 0), (this.second = void 0), (this.ratio = void 0)
  }
  ;(O.prototype.clone = function (e) {
    return (
      n.defined(e) || (e = new O()),
      (e.uBuffer = this.uBuffer),
      (e.vBuffer = this.vBuffer),
      (e.heightBuffer = this.heightBuffer),
      (e.normalBuffer = this.normalBuffer),
      (e.index = this.index),
      (e.first = this.first),
      (e.second = this.second),
      (e.ratio = this.ratio),
      e
    )
  }),
    (O.prototype.initializeIndexed = function (e, i, t, n, s) {
      ;(this.uBuffer = e),
        (this.vBuffer = i),
        (this.heightBuffer = t),
        (this.normalBuffer = n),
        (this.index = s),
        (this.first = void 0),
        (this.second = void 0),
        (this.ratio = void 0)
    }),
    (O.prototype.initializeFromClipResult = function (e, i, t) {
      var n = i + 1
      return (
        -1 !== e[i]
          ? t[e[i]].clone(this)
          : ((this.vertexBuffer = void 0),
            (this.index = void 0),
            (this.first = t[e[n]]),
            ++n,
            (this.second = t[e[n]]),
            ++n,
            (this.ratio = e[n]),
            ++n),
        n
      )
    }),
    (O.prototype.getKey = function () {
      return this.isIndexed() ? this.index : JSON.stringify({ first: this.first.getKey(), second: this.second.getKey(), ratio: this.ratio })
    }),
    (O.prototype.isIndexed = function () {
      return n.defined(this.index)
    }),
    (O.prototype.getH = function () {
      return n.defined(this.index) ? this.heightBuffer[this.index] : u.CesiumMath.lerp(this.first.getH(), this.second.getH(), this.ratio)
    }),
    (O.prototype.getU = function () {
      return n.defined(this.index) ? this.uBuffer[this.index] : u.CesiumMath.lerp(this.first.getU(), this.second.getU(), this.ratio)
    }),
    (O.prototype.getV = function () {
      return n.defined(this.index) ? this.vBuffer[this.index] : u.CesiumMath.lerp(this.first.getV(), this.second.getV(), this.ratio)
    })
  var S = new t.Cartesian2(),
    U = -1,
    F = [new t.Cartesian3(), new t.Cartesian3()],
    P = [new t.Cartesian3(), new t.Cartesian3()]
  function D(i, n) {
    ++U
    var s = F[U],
      r = P[U]
    return (
      (s = e.AttributeCompression.octDecode(i.first.getNormalX(), i.first.getNormalY(), s)),
      (r = e.AttributeCompression.octDecode(i.second.getNormalX(), i.second.getNormalY(), r)),
      (I = t.Cartesian3.lerp(s, r, i.ratio, I)),
      t.Cartesian3.normalize(I, I),
      e.AttributeCompression.octEncode(I, n),
      --U,
      n
    )
  }
  ;(O.prototype.getNormalX = function () {
    return n.defined(this.index) ? this.normalBuffer[2 * this.index] : (S = D(this, S)).x
  }),
    (O.prototype.getNormalY = function () {
      return n.defined(this.index) ? this.normalBuffer[2 * this.index + 1] : (S = D(this, S)).y
    })
  var W = []
  function X(e, i, t, s, r, h, u, o, a) {
    if (0 !== u.length) {
      for (var p = 0, d = 0; d < u.length; ) d = W[p++].initializeFromClipResult(u, d, o)
      for (var l = 0; l < p; ++l) {
        var f = W[l]
        if (f.isIndexed()) (f.newIndex = h[f.index]), (f.uBuffer = e), (f.vBuffer = i), (f.heightBuffer = t), a && (f.normalBuffer = s)
        else {
          var c = f.getKey()
          if (n.defined(h[c])) f.newIndex = h[c]
          else {
            var g = e.length
            e.push(f.getU()), i.push(f.getV()), t.push(f.getH()), a && (s.push(f.getNormalX()), s.push(f.getNormalY())), (f.newIndex = g), (h[c] = g)
          }
        }
      }
      3 === p
        ? (r.push(W[0].newIndex), r.push(W[1].newIndex), r.push(W[2].newIndex))
        : 4 === p &&
          (r.push(W[0].newIndex), r.push(W[1].newIndex), r.push(W[2].newIndex), r.push(W[0].newIndex), r.push(W[2].newIndex), r.push(W[3].newIndex))
    }
  }
  return (
    W.push(new O()),
    W.push(new O()),
    W.push(new O()),
    W.push(new O()),
    a(function (e, n) {
      var h = e.isEastChild,
        a = e.isNorthChild,
        p = h ? v : 0,
        d = h ? x : v,
        l = a ? v : 0,
        f = a ? x : v,
        c = A,
        g = b,
        S = T,
        U = M
      ;(c.length = 0), (g.length = 0), (S.length = 0), (U.length = 0)
      var F = z
      F.length = 0
      var P = {},
        D = e.vertices,
        W = e.indices
      W = W.subarray(0, e.indexCountWithoutSkirts)
      var k,
        K,
        L,
        Y,
        _,
        G = s.TerrainEncoding.clone(e.encoding),
        J = G.hasVertexNormals,
        Z = 0,
        j = e.vertexCountWithoutSkirts,
        q = e.minimumHeight,
        Q = e.maximumHeight,
        $ = new Array(j),
        ee = new Array(j),
        ie = new Array(j),
        te = J ? new Array(2 * j) : void 0
      for (K = 0, L = 0; K < j; ++K, L += 2) {
        var ne = G.decodeTextureCoordinates(D, K, R)
        if (
          ((k = G.decodeHeight(D, K)),
          (Y = u.CesiumMath.clamp((ne.x * x) | 0, 0, x)),
          (_ = u.CesiumMath.clamp((ne.y * x) | 0, 0, x)),
          (ie[K] = u.CesiumMath.clamp((((k - q) / (Q - q)) * x) | 0, 0, x)),
          Y < 20 && (Y = 0),
          _ < 20 && (_ = 0),
          x - Y < 20 && (Y = x),
          x - _ < 20 && (_ = x),
          ($[K] = Y),
          (ee[K] = _),
          J)
        ) {
          var se = G.getOctEncodedNormal(D, K, H)
          ;(te[L] = se.x), (te[L + 1] = se.y)
        }
        ;((h && Y >= v) || (!h && Y <= v)) &&
          ((a && _ >= v) || (!a && _ <= v)) &&
          ((P[K] = Z), c.push(Y), g.push(_), S.push(ie[K]), J && (U.push(te[L]), U.push(te[L + 1])), ++Z)
      }
      var re = []
      re.push(new O()), re.push(new O()), re.push(new O())
      var he,
        ue = []
      for (ue.push(new O()), ue.push(new O()), ue.push(new O()), K = 0; K < W.length; K += 3) {
        var oe = W[K],
          ae = W[K + 1],
          pe = W[K + 2],
          de = $[oe],
          le = $[ae],
          fe = $[pe]
        re[0].initializeIndexed($, ee, ie, te, oe), re[1].initializeIndexed($, ee, ie, te, ae), re[2].initializeIndexed($, ee, ie, te, pe)
        var ce = m.clipTriangleAtAxisAlignedThreshold(v, h, de, le, fe, w)
        ;(he = 0) >= ce.length ||
          (he = ue[0].initializeFromClipResult(ce, he, re)) >= ce.length ||
          (he = ue[1].initializeFromClipResult(ce, he, re)) >= ce.length ||
          ((he = ue[2].initializeFromClipResult(ce, he, re)),
          X(c, g, S, U, F, P, m.clipTriangleAtAxisAlignedThreshold(v, a, ue[0].getV(), ue[1].getV(), ue[2].getV(), C), ue, J),
          he < ce.length &&
            (ue[2].clone(ue[1]),
            ue[2].initializeFromClipResult(ce, he, re),
            X(c, g, S, U, F, P, m.clipTriangleAtAxisAlignedThreshold(v, a, ue[0].getV(), ue[1].getV(), ue[2].getV(), C), ue, J)))
      }
      var ge = h ? -32767 : 0,
        me = a ? -32767 : 0,
        xe = [],
        ve = [],
        we = [],
        Ce = [],
        Be = Number.MAX_VALUE,
        ye = -Be,
        Ie = B
      Ie.length = 0
      var Ae = t.Ellipsoid.clone(e.ellipsoid),
        be = t.Rectangle.clone(e.childRectangle),
        Te = be.north,
        ze = be.south,
        Me = be.east,
        Ne = be.west
      for (Me < Ne && (Me += u.CesiumMath.TWO_PI), K = 0; K < c.length; ++K)
        (Y = Math.round(c[K])) <= p ? (xe.push(K), (Y = 0)) : Y >= d ? (we.push(K), (Y = x)) : (Y = 2 * Y + ge),
          (c[K] = Y),
          (_ = Math.round(g[K])) <= l ? (ve.push(K), (_ = 0)) : _ >= f ? (Ce.push(K), (_ = x)) : (_ = 2 * _ + me),
          (g[K] = _),
          (k = u.CesiumMath.lerp(q, Q, S[K] / x)) < Be && (Be = k),
          k > ye && (ye = k),
          (S[K] = k),
          (y.longitude = u.CesiumMath.lerp(Ne, Me, Y / x)),
          (y.latitude = u.CesiumMath.lerp(ze, Te, _ / x)),
          (y.height = k),
          Ae.cartographicToCartesian(y, I),
          Ie.push(I.x),
          Ie.push(I.y),
          Ie.push(I.z)
      var Ve = i.BoundingSphere.fromVertices(Ie, t.Cartesian3.ZERO, 3, V),
        Ee = o.OrientedBoundingBox.fromRectangle(be, Be, ye, Ae, E),
        Re = new s.EllipsoidalOccluder(Ae).computeHorizonCullingPointFromVerticesPossiblyUnderEllipsoid(Ve.center, Ie, 3, Ve.center, Be, N),
        He = ye - Be,
        Oe = new Uint16Array(c.length + g.length + S.length)
      for (K = 0; K < c.length; ++K) Oe[K] = c[K]
      var Se = c.length
      for (K = 0; K < g.length; ++K) Oe[Se + K] = g[K]
      for (Se += g.length, K = 0; K < S.length; ++K) Oe[Se + K] = (x * (S[K] - Be)) / He
      var Ue,
        Fe = r.IndexDatatype.createTypedArray(c.length, F)
      if (J) {
        var Pe = new Uint8Array(U)
        n.push(Oe.buffer, Fe.buffer, Pe.buffer), (Ue = Pe.buffer)
      } else n.push(Oe.buffer, Fe.buffer)
      return {
        vertices: Oe.buffer,
        encodedNormals: Ue,
        indices: Fe.buffer,
        minimumHeight: Be,
        maximumHeight: ye,
        westIndices: xe,
        southIndices: ve,
        eastIndices: we,
        northIndices: Ce,
        boundingSphere: Ve,
        orientedBoundingBox: Ee,
        horizonOcclusionPoint: Re
      }
    })
  )
})
