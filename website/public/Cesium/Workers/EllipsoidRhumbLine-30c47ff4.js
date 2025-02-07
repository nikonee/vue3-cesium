define(['exports', './Matrix2-9aa31791', './RuntimeError-346a3079', './when-4bbc8319', './ComponentDatatype-93750d1a'], function (t, i, a, e, n) {
  'use strict'
  function s(t, i, a) {
    if (0 === t) return i * a
    var e = t * t,
      n = e * e,
      s = n * e,
      h = s * e,
      u = h * e,
      r = u * e,
      o = a
    return (
      i *
      ((1 - e / 4 - (3 * n) / 64 - (5 * s) / 256 - (175 * h) / 16384 - (441 * u) / 65536 - (4851 * r) / 1048576) * o -
        ((3 * e) / 8 + (3 * n) / 32 + (45 * s) / 1024 + (105 * h) / 4096 + (2205 * u) / 131072 + (6237 * r) / 524288) * Math.sin(2 * o) +
        ((15 * n) / 256 + (45 * s) / 1024 + (525 * h) / 16384 + (1575 * u) / 65536 + (155925 * r) / 8388608) * Math.sin(4 * o) -
        ((35 * s) / 3072 + (175 * h) / 12288 + (3675 * u) / 262144 + (13475 * r) / 1048576) * Math.sin(6 * o) +
        ((315 * h) / 131072 + (2205 * u) / 524288 + (43659 * r) / 8388608) * Math.sin(8 * o) -
        ((693 * u) / 1310720 + (6237 * r) / 5242880) * Math.sin(10 * o) +
        ((1001 * r) / 8388608) * Math.sin(12 * o))
    )
  }
  function h(t, i) {
    if (0 === t) return Math.log(Math.tan(0.5 * (n.CesiumMath.PI_OVER_TWO + i)))
    var a = t * Math.sin(i)
    return Math.log(Math.tan(0.5 * (n.CesiumMath.PI_OVER_TWO + i))) - (t / 2) * Math.log((1 + a) / (1 - a))
  }
  var u = new i.Cartesian3(),
    r = new i.Cartesian3()
  function o(t, a, e, o) {
    i.Cartesian3.normalize(o.cartographicToCartesian(a, r), u), i.Cartesian3.normalize(o.cartographicToCartesian(e, r), r)
    var l = o.maximumRadius,
      d = o.minimumRadius,
      M = l * l,
      c = d * d
    ;(t._ellipticitySquared = (M - c) / M),
      (t._ellipticity = Math.sqrt(t._ellipticitySquared)),
      (t._start = i.Cartographic.clone(a, t._start)),
      (t._start.height = 0),
      (t._end = i.Cartographic.clone(e, t._end)),
      (t._end.height = 0),
      (t._heading = (function (t, i, a, e, s) {
        var u = h(t._ellipticity, a),
          r = h(t._ellipticity, s)
        return Math.atan2(n.CesiumMath.negativePiToPi(e - i), r - u)
      })(t, a.longitude, a.latitude, e.longitude, e.latitude)),
      (t._distance = (function (t, i, a, e, h, u, r) {
        var o = t._heading,
          l = u - e,
          d = 0
        if (n.CesiumMath.equalsEpsilon(Math.abs(o), n.CesiumMath.PI_OVER_TWO, n.CesiumMath.EPSILON8))
          if (i === a) d = i * Math.cos(h) * n.CesiumMath.negativePiToPi(l)
          else {
            var M = Math.sin(h)
            d = (i * Math.cos(h) * n.CesiumMath.negativePiToPi(l)) / Math.sqrt(1 - t._ellipticitySquared * M * M)
          }
        else {
          var c = s(t._ellipticity, i, h)
          d = (s(t._ellipticity, i, r) - c) / Math.cos(o)
        }
        return Math.abs(d)
      })(t, o.maximumRadius, o.minimumRadius, a.longitude, a.latitude, e.longitude, e.latitude))
  }
  function l(t, a, u, r, o, l) {
    if (0 === u) return i.Cartographic.clone(t, l)
    var d,
      M,
      c,
      m = o * o
    if (Math.abs(n.CesiumMath.PI_OVER_TWO - Math.abs(a)) > n.CesiumMath.EPSILON8) {
      M = (function (t, i, a) {
        var e = t / a
        if (0 === i) return e
        var n = e * e,
          s = n * e,
          h = s * e,
          u = i * i,
          r = u * u,
          o = r * u,
          l = o * u,
          d = l * u,
          M = d * u,
          c = Math.sin(2 * e),
          m = Math.cos(2 * e),
          g = Math.sin(4 * e),
          _ = Math.cos(4 * e),
          p = Math.sin(6 * e),
          C = Math.cos(6 * e),
          f = Math.sin(8 * e),
          P = Math.cos(8 * e),
          v = Math.sin(10 * e)
        return (
          e +
          (e * u) / 4 +
          (7 * e * r) / 64 +
          (15 * e * o) / 256 +
          (579 * e * l) / 16384 +
          (1515 * e * d) / 65536 +
          (16837 * e * M) / 1048576 +
          ((3 * e * r) / 16 +
            (45 * e * o) / 256 -
            (e * (32 * n - 561) * l) / 4096 -
            (e * (232 * n - 1677) * d) / 16384 +
            (e * (399985 - 90560 * n + 512 * h) * M) / 5242880) *
            m +
          ((21 * e * o) / 256 + (483 * e * l) / 4096 - (e * (224 * n - 1969) * d) / 16384 - (e * (33152 * n - 112599) * M) / 1048576) * _ +
          ((151 * e * l) / 4096 + (4681 * e * d) / 65536 + (1479 * e * M) / 16384 - (453 * s * M) / 32768) * C +
          ((1097 * e * d) / 65536 + (42783 * e * M) / 1048576) * P +
          ((8011 * e * M) / 1048576) * Math.cos(10 * e) +
          ((3 * u) / 8 +
            (3 * r) / 16 +
            (213 * o) / 2048 -
            (3 * n * o) / 64 +
            (255 * l) / 4096 -
            (33 * n * l) / 512 +
            (20861 * d) / 524288 -
            (33 * n * d) / 512 +
            (h * d) / 1024 +
            (28273 * M) / 1048576 -
            (471 * n * M) / 8192 +
            (9 * h * M) / 4096) *
            c +
          ((21 * r) / 256 +
            (21 * o) / 256 +
            (533 * l) / 8192 -
            (21 * n * l) / 512 +
            (197 * d) / 4096 -
            (315 * n * d) / 4096 +
            (584039 * M) / 16777216 -
            (12517 * n * M) / 131072 +
            (7 * h * M) / 2048) *
            g +
          ((151 * o) / 6144 + (151 * l) / 4096 + (5019 * d) / 131072 - (453 * n * d) / 16384 + (26965 * M) / 786432 - (8607 * n * M) / 131072) * p +
          ((1097 * l) / 131072 + (1097 * d) / 65536 + (225797 * M) / 10485760 - (1097 * n * M) / 65536) * f +
          ((8011 * d) / 2621440 + (8011 * M) / 1048576) * v +
          ((293393 * M) / 251658240) * Math.sin(12 * e)
        )
      })(s(o, r, t.latitude) + u * Math.cos(a), o, r)
      var g = h(o, t.latitude),
        _ = h(o, M)
      ;(c = Math.tan(a) * (_ - g)), (d = n.CesiumMath.negativePiToPi(t.longitude + c))
    } else {
      var p
      if (((M = t.latitude), 0 === o)) p = r * Math.cos(t.latitude)
      else {
        var C = Math.sin(t.latitude)
        p = (r * Math.cos(t.latitude)) / Math.sqrt(1 - m * C * C)
      }
      ;(c = u / p), (d = a > 0 ? n.CesiumMath.negativePiToPi(t.longitude + c) : n.CesiumMath.negativePiToPi(t.longitude - c))
    }
    return e.defined(l) ? ((l.longitude = d), (l.latitude = M), (l.height = 0), l) : new i.Cartographic(d, M, 0)
  }
  function d(t, a, n) {
    var s = e.defaultValue(n, i.Ellipsoid.WGS84)
    ;(this._ellipsoid = s),
      (this._start = new i.Cartographic()),
      (this._end = new i.Cartographic()),
      (this._heading = void 0),
      (this._distance = void 0),
      (this._ellipticity = void 0),
      (this._ellipticitySquared = void 0),
      e.defined(t) && e.defined(a) && o(this, t, a, s)
  }
  Object.defineProperties(d.prototype, {
    ellipsoid: {
      get: function () {
        return this._ellipsoid
      }
    },
    surfaceDistance: {
      get: function () {
        return this._distance
      }
    },
    start: {
      get: function () {
        return this._start
      }
    },
    end: {
      get: function () {
        return this._end
      }
    },
    heading: {
      get: function () {
        return this._heading
      }
    }
  }),
    (d.fromStartHeadingDistance = function (t, a, s, h, u) {
      var r = e.defaultValue(h, i.Ellipsoid.WGS84),
        o = r.maximumRadius,
        M = r.minimumRadius,
        c = o * o,
        m = M * M,
        g = Math.sqrt((c - m) / c),
        _ = l(t, (a = n.CesiumMath.negativePiToPi(a)), s, r.maximumRadius, g)
      return !e.defined(u) || (e.defined(h) && !h.equals(u.ellipsoid)) ? new d(t, _, r) : (u.setEndPoints(t, _), u)
    }),
    (d.prototype.setEndPoints = function (t, i) {
      o(this, t, i, this._ellipsoid)
    }),
    (d.prototype.interpolateUsingFraction = function (t, i) {
      return this.interpolateUsingSurfaceDistance(t * this._distance, i)
    }),
    (d.prototype.interpolateUsingSurfaceDistance = function (t, i) {
      return l(this._start, this._heading, t, this._ellipsoid.maximumRadius, this._ellipticity, i)
    }),
    (d.prototype.findIntersectionWithLongitude = function (t, a) {
      var s = this._ellipticity,
        h = this._heading,
        u = Math.abs(h),
        r = this._start
      if (
        ((t = n.CesiumMath.negativePiToPi(t)),
        n.CesiumMath.equalsEpsilon(Math.abs(t), Math.PI, n.CesiumMath.EPSILON14) && (t = n.CesiumMath.sign(r.longitude) * Math.PI),
        e.defined(a) || (a = new i.Cartographic()),
        Math.abs(n.CesiumMath.PI_OVER_TWO - u) <= n.CesiumMath.EPSILON8)
      )
        return (a.longitude = t), (a.latitude = r.latitude), (a.height = 0), a
      if (n.CesiumMath.equalsEpsilon(Math.abs(n.CesiumMath.PI_OVER_TWO - u), n.CesiumMath.PI_OVER_TWO, n.CesiumMath.EPSILON8)) {
        if (n.CesiumMath.equalsEpsilon(t, r.longitude, n.CesiumMath.EPSILON12)) return
        return (a.longitude = t), (a.latitude = n.CesiumMath.PI_OVER_TWO * n.CesiumMath.sign(n.CesiumMath.PI_OVER_TWO - h)), (a.height = 0), a
      }
      var o,
        l = r.latitude,
        d = s * Math.sin(l),
        M = Math.tan(0.5 * (n.CesiumMath.PI_OVER_TWO + l)) * Math.exp((t - r.longitude) / Math.tan(h)),
        c = (1 + d) / (1 - d),
        m = r.latitude
      do {
        o = m
        var g = s * Math.sin(o),
          _ = (1 + g) / (1 - g)
        m = 2 * Math.atan(M * Math.pow(_ / c, s / 2)) - n.CesiumMath.PI_OVER_TWO
      } while (!n.CesiumMath.equalsEpsilon(m, o, n.CesiumMath.EPSILON12))
      return (a.longitude = t), (a.latitude = m), (a.height = 0), a
    }),
    (d.prototype.findIntersectionWithLatitude = function (t, a) {
      var s = this._ellipticity,
        u = this._heading,
        r = this._start
      if (!n.CesiumMath.equalsEpsilon(Math.abs(u), n.CesiumMath.PI_OVER_TWO, n.CesiumMath.EPSILON8)) {
        var o = h(s, r.latitude),
          l = h(s, t),
          d = Math.tan(u) * (l - o),
          M = n.CesiumMath.negativePiToPi(r.longitude + d)
        return e.defined(a) ? ((a.longitude = M), (a.latitude = t), (a.height = 0), a) : new i.Cartographic(M, t, 0)
      }
    }),
    (t.EllipsoidRhumbLine = d)
})
