define(['exports', './RuntimeError-346a3079', './when-4bbc8319', './ComponentDatatype-93750d1a'], function (e, t, n, r) {
  'use strict'
  function a(e, t, r) {
    ;(this.x = n.defaultValue(e, 0)), (this.y = n.defaultValue(t, 0)), (this.z = n.defaultValue(r, 0))
  }
  ;(a.fromSpherical = function (e, t) {
    n.defined(t) || (t = new a())
    var r = e.clock,
      i = e.cone,
      u = n.defaultValue(e.magnitude, 1),
      o = u * Math.sin(i)
    return (t.x = o * Math.cos(r)), (t.y = o * Math.sin(r)), (t.z = u * Math.cos(i)), t
  }),
    (a.fromElements = function (e, t, r, i) {
      return n.defined(i) ? ((i.x = e), (i.y = t), (i.z = r), i) : new a(e, t, r)
    }),
    (a.clone = function (e, t) {
      if (n.defined(e)) return n.defined(t) ? ((t.x = e.x), (t.y = e.y), (t.z = e.z), t) : new a(e.x, e.y, e.z)
    }),
    (a.fromCartesian4 = a.clone),
    (a.packedLength = 3),
    (a.pack = function (e, t, r) {
      return (r = n.defaultValue(r, 0)), (t[r++] = e.x), (t[r++] = e.y), (t[r] = e.z), t
    }),
    (a.unpack = function (e, t, r) {
      return (t = n.defaultValue(t, 0)), n.defined(r) || (r = new a()), (r.x = e[t++]), (r.y = e[t++]), (r.z = e[t]), r
    }),
    (a.packArray = function (e, r) {
      var i = e.length,
        u = 3 * i
      if (n.defined(r)) {
        if (!Array.isArray(r) && r.length !== u)
          throw new t.DeveloperError('If result is a typed array, it must have exactly array.length * 3 elements')
        r.length !== u && (r.length = u)
      } else r = new Array(u)
      for (var o = 0; o < i; ++o) a.pack(e[o], r, 3 * o)
      return r
    }),
    (a.unpackArray = function (e, t) {
      var r = e.length
      n.defined(t) ? (t.length = r / 3) : (t = new Array(r / 3))
      for (var i = 0; i < r; i += 3) {
        var u = i / 3
        t[u] = a.unpack(e, i, t[u])
      }
      return t
    }),
    (a.fromArray = a.unpack),
    (a.maximumComponent = function (e) {
      return Math.max(e.x, e.y, e.z)
    }),
    (a.minimumComponent = function (e) {
      return Math.min(e.x, e.y, e.z)
    }),
    (a.minimumByComponent = function (e, t, n) {
      return (n.x = Math.min(e.x, t.x)), (n.y = Math.min(e.y, t.y)), (n.z = Math.min(e.z, t.z)), n
    }),
    (a.maximumByComponent = function (e, t, n) {
      return (n.x = Math.max(e.x, t.x)), (n.y = Math.max(e.y, t.y)), (n.z = Math.max(e.z, t.z)), n
    }),
    (a.magnitudeSquared = function (e) {
      return e.x * e.x + e.y * e.y + e.z * e.z
    }),
    (a.magnitude = function (e) {
      return Math.sqrt(a.magnitudeSquared(e))
    })
  var i = new a()
  ;(a.distance = function (e, t) {
    return a.subtract(e, t, i), a.magnitude(i)
  }),
    (a.distanceSquared = function (e, t) {
      return a.subtract(e, t, i), a.magnitudeSquared(i)
    }),
    (a.normalize = function (e, t) {
      var n = a.magnitude(e)
      return (t.x = e.x / n), (t.y = e.y / n), (t.z = e.z / n), t
    }),
    (a.dot = function (e, t) {
      return e.x * t.x + e.y * t.y + e.z * t.z
    }),
    (a.multiplyComponents = function (e, t, n) {
      return (n.x = e.x * t.x), (n.y = e.y * t.y), (n.z = e.z * t.z), n
    }),
    (a.divideComponents = function (e, t, n) {
      return (n.x = e.x / t.x), (n.y = e.y / t.y), (n.z = e.z / t.z), n
    }),
    (a.add = function (e, t, n) {
      return (n.x = e.x + t.x), (n.y = e.y + t.y), (n.z = e.z + t.z), n
    }),
    (a.subtract = function (e, t, n) {
      return (n.x = e.x - t.x), (n.y = e.y - t.y), (n.z = e.z - t.z), n
    }),
    (a.multiplyByScalar = function (e, t, n) {
      return (n.x = e.x * t), (n.y = e.y * t), (n.z = e.z * t), n
    }),
    (a.divideByScalar = function (e, t, n) {
      return (n.x = e.x / t), (n.y = e.y / t), (n.z = e.z / t), n
    }),
    (a.negate = function (e, t) {
      return (t.x = -e.x), (t.y = -e.y), (t.z = -e.z), t
    }),
    (a.abs = function (e, t) {
      return (t.x = Math.abs(e.x)), (t.y = Math.abs(e.y)), (t.z = Math.abs(e.z)), t
    })
  var u = new a()
  a.lerp = function (e, t, n, r) {
    return a.multiplyByScalar(t, n, u), (r = a.multiplyByScalar(e, 1 - n, r)), a.add(u, r, r)
  }
  var o = new a(),
    s = new a()
  a.angleBetween = function (e, t) {
    a.normalize(e, o), a.normalize(t, s)
    var n = a.dot(o, s),
      r = a.magnitude(a.cross(o, s, o))
    return Math.atan2(r, n)
  }
  var f = new a()
  ;(a.mostOrthogonalAxis = function (e, t) {
    var n = a.normalize(e, f)
    return (
      a.abs(n, n),
      (t = n.x <= n.y ? (n.x <= n.z ? a.clone(a.UNIT_X, t) : a.clone(a.UNIT_Z, t)) : n.y <= n.z ? a.clone(a.UNIT_Y, t) : a.clone(a.UNIT_Z, t))
    )
  }),
    (a.projectVector = function (e, t, n) {
      var r = a.dot(e, t) / a.dot(t, t)
      return a.multiplyByScalar(t, r, n)
    }),
    (a.equals = function (e, t) {
      return e === t || (n.defined(e) && n.defined(t) && e.x === t.x && e.y === t.y && e.z === t.z)
    }),
    (a.equalsArray = function (e, t, n) {
      return e.x === t[n] && e.y === t[n + 1] && e.z === t[n + 2]
    }),
    (a.equalsEpsilon = function (e, t, a, i) {
      return (
        e === t ||
        (n.defined(e) &&
          n.defined(t) &&
          r.CesiumMath.equalsEpsilon(e.x, t.x, a, i) &&
          r.CesiumMath.equalsEpsilon(e.y, t.y, a, i) &&
          r.CesiumMath.equalsEpsilon(e.z, t.z, a, i))
      )
    }),
    (a.cross = function (e, t, n) {
      var r = e.x,
        a = e.y,
        i = e.z,
        u = t.x,
        o = t.y,
        s = t.z,
        f = a * s - i * o,
        l = i * u - r * s,
        d = r * o - a * u
      return (n.x = f), (n.y = l), (n.z = d), n
    }),
    (a.midpoint = function (e, t, n) {
      return (n.x = 0.5 * (e.x + t.x)), (n.y = 0.5 * (e.y + t.y)), (n.z = 0.5 * (e.z + t.z)), n
    }),
    (a.fromDegrees = function (e, t, n, i, u) {
      return (e = r.CesiumMath.toRadians(e)), (t = r.CesiumMath.toRadians(t)), a.fromRadians(e, t, n, i, u)
    })
  var l = new a(),
    d = new a(),
    c = new a(40680631590769, 40680631590769, 40408299984661.445)
  ;(a.fromRadians = function (e, t, r, i, u) {
    r = n.defaultValue(r, 0)
    var o = n.defined(i) ? i.radiiSquared : c,
      s = Math.cos(t)
    ;(l.x = s * Math.cos(e)), (l.y = s * Math.sin(e)), (l.z = Math.sin(t)), (l = a.normalize(l, l)), a.multiplyComponents(o, l, d)
    var f = Math.sqrt(a.dot(l, d))
    return (d = a.divideByScalar(d, f, d)), (l = a.multiplyByScalar(l, r, l)), n.defined(u) || (u = new a()), a.add(d, l, u)
  }),
    (a.fromDegreesArray = function (e, t, r) {
      var i = e.length
      n.defined(r) ? (r.length = i / 2) : (r = new Array(i / 2))
      for (var u = 0; u < i; u += 2) {
        var o = e[u],
          s = e[u + 1],
          f = u / 2
        r[f] = a.fromDegrees(o, s, 0, t, r[f])
      }
      return r
    }),
    (a.fromRadiansArray = function (e, t, r) {
      var i = e.length
      n.defined(r) ? (r.length = i / 2) : (r = new Array(i / 2))
      for (var u = 0; u < i; u += 2) {
        var o = e[u],
          s = e[u + 1],
          f = u / 2
        r[f] = a.fromRadians(o, s, 0, t, r[f])
      }
      return r
    }),
    (a.fromDegreesArrayHeights = function (e, t, r) {
      var i = e.length
      n.defined(r) ? (r.length = i / 3) : (r = new Array(i / 3))
      for (var u = 0; u < i; u += 3) {
        var o = e[u],
          s = e[u + 1],
          f = e[u + 2],
          l = u / 3
        r[l] = a.fromDegrees(o, s, f, t, r[l])
      }
      return r
    }),
    (a.fromRadiansArrayHeights = function (e, t, r) {
      var i = e.length
      n.defined(r) ? (r.length = i / 3) : (r = new Array(i / 3))
      for (var u = 0; u < i; u += 3) {
        var o = e[u],
          s = e[u + 1],
          f = e[u + 2],
          l = u / 3
        r[l] = a.fromRadians(o, s, f, t, r[l])
      }
      return r
    }),
    (a.ZERO = Object.freeze(new a(0, 0, 0))),
    (a.ONE = Object.freeze(new a(1, 1, 1))),
    (a.UNIT_X = Object.freeze(new a(1, 0, 0))),
    (a.UNIT_Y = Object.freeze(new a(0, 1, 0))),
    (a.UNIT_Z = Object.freeze(new a(0, 0, 1))),
    (a.prototype.clone = function (e) {
      return a.clone(this, e)
    }),
    (a.prototype.equals = function (e) {
      return a.equals(this, e)
    }),
    (a.prototype.equalsEpsilon = function (e, t, n) {
      return a.equalsEpsilon(this, e, t, n)
    }),
    (a.prototype.toString = function () {
      return '(' + this.x + ', ' + this.y + ', ' + this.z + ')'
    })
  var h = new a(),
    m = new a()
  function y(e, t, i, u, o) {
    var s = e.x,
      f = e.y,
      l = e.z,
      d = t.x,
      c = t.y,
      y = t.z,
      p = s * s * d * d,
      x = f * f * c * c,
      M = l * l * y * y,
      w = p + x + M,
      g = Math.sqrt(1 / w),
      v = a.multiplyByScalar(e, g, h)
    if (w < u) return isFinite(g) ? a.clone(v, o) : void 0
    var z = i.x,
      C = i.y,
      O = i.z,
      b = m
    ;(b.x = v.x * z * 2), (b.y = v.y * C * 2), (b.z = v.z * O * 2)
    var S,
      q,
      _,
      R,
      V,
      E,
      T,
      A = ((1 - g) * a.magnitude(e)) / (0.5 * a.magnitude(b)),
      I = 0
    do {
      I =
        (S = p * (V = (q = 1 / (1 + (A -= I) * z)) * q) + x * (E = (_ = 1 / (1 + A * C)) * _) + M * (T = (R = 1 / (1 + A * O)) * R) - 1) /
        (-2 * (p * (V * q) * z + x * (E * _) * C + M * (T * R) * O))
    } while (Math.abs(S) > r.CesiumMath.EPSILON12)
    return n.defined(o) ? ((o.x = s * q), (o.y = f * _), (o.z = l * R), o) : new a(s * q, f * _, l * R)
  }
  function p(e, t, r) {
    ;(this.longitude = n.defaultValue(e, 0)), (this.latitude = n.defaultValue(t, 0)), (this.height = n.defaultValue(r, 0))
  }
  ;(p.fromRadians = function (e, t, r, a) {
    return (r = n.defaultValue(r, 0)), n.defined(a) ? ((a.longitude = e), (a.latitude = t), (a.height = r), a) : new p(e, t, r)
  }),
    (p.fromDegrees = function (e, t, n, a) {
      return (e = r.CesiumMath.toRadians(e)), (t = r.CesiumMath.toRadians(t)), p.fromRadians(e, t, n, a)
    })
  var x = new a(),
    M = new a(),
    w = new a(),
    g = new a(1 / 6378137, 1 / 6378137, 1 / 6356752.314245179),
    v = new a(1 / 40680631590769, 1 / 40680631590769, 1 / 40408299984661.445),
    z = r.CesiumMath.EPSILON1
  function C(e, t, i, u) {
    ;(t = n.defaultValue(t, 0)),
      (i = n.defaultValue(i, 0)),
      (u = n.defaultValue(u, 0)),
      (e._radii = new a(t, i, u)),
      (e._radiiSquared = new a(t * t, i * i, u * u)),
      (e._radiiToTheFourth = new a(t * t * t * t, i * i * i * i, u * u * u * u)),
      (e._oneOverRadii = new a(0 === t ? 0 : 1 / t, 0 === i ? 0 : 1 / i, 0 === u ? 0 : 1 / u)),
      (e._oneOverRadiiSquared = new a(0 === t ? 0 : 1 / (t * t), 0 === i ? 0 : 1 / (i * i), 0 === u ? 0 : 1 / (u * u))),
      (e._minimumRadius = Math.min(t, i, u)),
      (e._maximumRadius = Math.max(t, i, u)),
      (e._centerToleranceSquared = r.CesiumMath.EPSILON1),
      0 !== e._radiiSquared.z && (e._squaredXOverSquaredZ = e._radiiSquared.x / e._radiiSquared.z)
  }
  function O(e, t, n) {
    ;(this._radii = void 0),
      (this._radiiSquared = void 0),
      (this._radiiToTheFourth = void 0),
      (this._oneOverRadii = void 0),
      (this._oneOverRadiiSquared = void 0),
      (this._minimumRadius = void 0),
      (this._maximumRadius = void 0),
      (this._centerToleranceSquared = void 0),
      (this._squaredXOverSquaredZ = void 0),
      C(this, e, t, n)
  }
  ;(p.fromCartesian = function (e, t, i) {
    var u = n.defined(t) ? t.oneOverRadii : g,
      o = n.defined(t) ? t.oneOverRadiiSquared : v,
      s = y(e, u, o, n.defined(t) ? t._centerToleranceSquared : z, M)
    if (n.defined(s)) {
      var f = a.multiplyComponents(s, o, x)
      f = a.normalize(f, f)
      var l = a.subtract(e, s, w),
        d = Math.atan2(f.y, f.x),
        c = Math.asin(f.z),
        h = r.CesiumMath.sign(a.dot(l, e)) * a.magnitude(l)
      return n.defined(i) ? ((i.longitude = d), (i.latitude = c), (i.height = h), i) : new p(d, c, h)
    }
  }),
    (p.toCartesian = function (e, t, n) {
      return a.fromRadians(e.longitude, e.latitude, e.height, t, n)
    }),
    (p.clone = function (e, t) {
      if (n.defined(e))
        return n.defined(t)
          ? ((t.longitude = e.longitude), (t.latitude = e.latitude), (t.height = e.height), t)
          : new p(e.longitude, e.latitude, e.height)
    }),
    (p.equals = function (e, t) {
      return e === t || (n.defined(e) && n.defined(t) && e.longitude === t.longitude && e.latitude === t.latitude && e.height === t.height)
    }),
    (p.equalsEpsilon = function (e, t, r) {
      return (
        (r = n.defaultValue(r, 0)),
        e === t ||
          (n.defined(e) &&
            n.defined(t) &&
            Math.abs(e.longitude - t.longitude) <= r &&
            Math.abs(e.latitude - t.latitude) <= r &&
            Math.abs(e.height - t.height) <= r)
      )
    }),
    (p.ZERO = Object.freeze(new p(0, 0, 0))),
    (p.prototype.clone = function (e) {
      return p.clone(this, e)
    }),
    (p.prototype.equals = function (e) {
      return p.equals(this, e)
    }),
    (p.prototype.equalsEpsilon = function (e, t) {
      return p.equalsEpsilon(this, e, t)
    }),
    (p.prototype.toString = function () {
      return '(' + this.longitude + ', ' + this.latitude + ', ' + this.height + ')'
    }),
    Object.defineProperties(O.prototype, {
      radii: {
        get: function () {
          return this._radii
        }
      },
      radiiSquared: {
        get: function () {
          return this._radiiSquared
        }
      },
      radiiToTheFourth: {
        get: function () {
          return this._radiiToTheFourth
        }
      },
      oneOverRadii: {
        get: function () {
          return this._oneOverRadii
        }
      },
      oneOverRadiiSquared: {
        get: function () {
          return this._oneOverRadiiSquared
        }
      },
      minimumRadius: {
        get: function () {
          return this._minimumRadius
        }
      },
      maximumRadius: {
        get: function () {
          return this._maximumRadius
        }
      }
    }),
    (O.clone = function (e, t) {
      if (n.defined(e)) {
        var r = e._radii
        return n.defined(t)
          ? (a.clone(r, t._radii),
            a.clone(e._radiiSquared, t._radiiSquared),
            a.clone(e._radiiToTheFourth, t._radiiToTheFourth),
            a.clone(e._oneOverRadii, t._oneOverRadii),
            a.clone(e._oneOverRadiiSquared, t._oneOverRadiiSquared),
            (t._minimumRadius = e._minimumRadius),
            (t._maximumRadius = e._maximumRadius),
            (t._centerToleranceSquared = e._centerToleranceSquared),
            t)
          : new O(r.x, r.y, r.z)
      }
    }),
    (O.fromCartesian3 = function (e, t) {
      return n.defined(t) || (t = new O()), n.defined(e) ? (C(t, e.x, e.y, e.z), t) : t
    }),
    (O.WGS84 = Object.freeze(new O(6378137, 6378137, 6356752.314245179))),
    (O.UNIT_SPHERE = Object.freeze(new O(1, 1, 1))),
    (O.MOON = Object.freeze(new O(r.CesiumMath.LUNAR_RADIUS, r.CesiumMath.LUNAR_RADIUS, r.CesiumMath.LUNAR_RADIUS))),
    (O.prototype.clone = function (e) {
      return O.clone(this, e)
    }),
    (O.packedLength = a.packedLength),
    (O.pack = function (e, t, r) {
      return (r = n.defaultValue(r, 0)), a.pack(e._radii, t, r), t
    }),
    (O.unpack = function (e, t, r) {
      t = n.defaultValue(t, 0)
      var i = a.unpack(e, t)
      return O.fromCartesian3(i, r)
    }),
    (O.prototype.geocentricSurfaceNormal = a.normalize),
    (O.prototype.geodeticSurfaceNormalCartographic = function (e, t) {
      var r = e.longitude,
        i = e.latitude,
        u = Math.cos(i),
        o = u * Math.cos(r),
        s = u * Math.sin(r),
        f = Math.sin(i)
      return n.defined(t) || (t = new a()), (t.x = o), (t.y = s), (t.z = f), a.normalize(t, t)
    }),
    (O.prototype.geodeticSurfaceNormal = function (e, t) {
      if (!a.equalsEpsilon(e, a.ZERO, r.CesiumMath.EPSILON14))
        return n.defined(t) || (t = new a()), (t = a.multiplyComponents(e, this._oneOverRadiiSquared, t)), a.normalize(t, t)
    })
  var b = new a(),
    S = new a()
  ;(O.prototype.cartographicToCartesian = function (e, t) {
    var r = b,
      i = S
    this.geodeticSurfaceNormalCartographic(e, r), a.multiplyComponents(this._radiiSquared, r, i)
    var u = Math.sqrt(a.dot(r, i))
    return a.divideByScalar(i, u, i), a.multiplyByScalar(r, e.height, r), n.defined(t) || (t = new a()), a.add(i, r, t)
  }),
    (O.prototype.cartographicArrayToCartesianArray = function (e, t) {
      var r = e.length
      n.defined(t) ? (t.length = r) : (t = new Array(r))
      for (var a = 0; a < r; a++) t[a] = this.cartographicToCartesian(e[a], t[a])
      return t
    })
  var q = new a(),
    _ = new a(),
    R = new a()
  ;(O.prototype.cartesianToCartographic = function (e, t) {
    var i = this.scaleToGeodeticSurface(e, _)
    if (n.defined(i)) {
      var u = this.geodeticSurfaceNormal(i, q),
        o = a.subtract(e, i, R),
        s = Math.atan2(u.y, u.x),
        f = Math.asin(u.z),
        l = r.CesiumMath.sign(a.dot(o, e)) * a.magnitude(o)
      return n.defined(t) ? ((t.longitude = s), (t.latitude = f), (t.height = l), t) : new p(s, f, l)
    }
  }),
    (O.prototype.cartesianArrayToCartographicArray = function (e, t) {
      var r = e.length
      n.defined(t) ? (t.length = r) : (t = new Array(r))
      for (var a = 0; a < r; ++a) t[a] = this.cartesianToCartographic(e[a], t[a])
      return t
    }),
    (O.prototype.scaleToGeodeticSurface = function (e, t) {
      return y(e, this._oneOverRadii, this._oneOverRadiiSquared, this._centerToleranceSquared, t)
    }),
    (O.prototype.scaleToGeocentricSurface = function (e, t) {
      n.defined(t) || (t = new a())
      var r = e.x,
        i = e.y,
        u = e.z,
        o = this._oneOverRadiiSquared,
        s = 1 / Math.sqrt(r * r * o.x + i * i * o.y + u * u * o.z)
      return a.multiplyByScalar(e, s, t)
    }),
    (O.prototype.transformPositionToScaledSpace = function (e, t) {
      return n.defined(t) || (t = new a()), a.multiplyComponents(e, this._oneOverRadii, t)
    }),
    (O.prototype.transformPositionFromScaledSpace = function (e, t) {
      return n.defined(t) || (t = new a()), a.multiplyComponents(e, this._radii, t)
    }),
    (O.prototype.equals = function (e) {
      return this === e || (n.defined(e) && a.equals(this._radii, e._radii))
    }),
    (O.prototype.toString = function () {
      return this._radii.toString()
    }),
    (O.prototype.getSurfaceNormalIntersectionWithZAxis = function (e, t, r) {
      t = n.defaultValue(t, 0)
      var i = this._squaredXOverSquaredZ
      if ((n.defined(r) || (r = new a()), (r.x = 0), (r.y = 0), (r.z = e.z * (1 - i)), !(Math.abs(r.z) >= this._radii.z - t))) return r
    })
  var V = [0.14887433898163, 0.43339539412925, 0.67940956829902, 0.86506336668898, 0.97390652851717, 0],
    E = [0.29552422471475, 0.26926671930999, 0.21908636251598, 0.14945134915058, 0.066671344308684, 0]
  function T(e, t, n) {
    for (var r = 0.5 * (t + e), a = 0.5 * (t - e), i = 0, u = 0; u < 5; u++) {
      var o = a * V[u]
      i += E[u] * (n(r + o) + n(r - o))
    }
    return (i *= a)
  }
  function A(e, t, r, a, i, u, o, s, f) {
    ;(this[0] = n.defaultValue(e, 0)),
      (this[1] = n.defaultValue(a, 0)),
      (this[2] = n.defaultValue(o, 0)),
      (this[3] = n.defaultValue(t, 0)),
      (this[4] = n.defaultValue(i, 0)),
      (this[5] = n.defaultValue(s, 0)),
      (this[6] = n.defaultValue(r, 0)),
      (this[7] = n.defaultValue(u, 0)),
      (this[8] = n.defaultValue(f, 0))
  }
  ;(O.prototype.surfaceArea = function (e) {
    for (var t = e.west, n = e.east, a = e.south, i = e.north; n < t; ) n += r.CesiumMath.TWO_PI
    var u = this._radiiSquared,
      o = u.x,
      s = u.y,
      f = u.z,
      l = o * s
    return T(a, i, function (e) {
      var r = Math.cos(e),
        a = Math.sin(e)
      return (
        Math.cos(e) *
        T(t, n, function (e) {
          var t = Math.cos(e),
            n = Math.sin(e)
          return Math.sqrt(l * a * a + f * (s * t * t + o * n * n) * r * r)
        })
      )
    })
  }),
    (A.packedLength = 9),
    (A.pack = function (e, t, r) {
      return (
        (r = n.defaultValue(r, 0)),
        (t[r++] = e[0]),
        (t[r++] = e[1]),
        (t[r++] = e[2]),
        (t[r++] = e[3]),
        (t[r++] = e[4]),
        (t[r++] = e[5]),
        (t[r++] = e[6]),
        (t[r++] = e[7]),
        (t[r++] = e[8]),
        t
      )
    }),
    (A.unpack = function (e, t, r) {
      return (
        (t = n.defaultValue(t, 0)),
        n.defined(r) || (r = new A()),
        (r[0] = e[t++]),
        (r[1] = e[t++]),
        (r[2] = e[t++]),
        (r[3] = e[t++]),
        (r[4] = e[t++]),
        (r[5] = e[t++]),
        (r[6] = e[t++]),
        (r[7] = e[t++]),
        (r[8] = e[t++]),
        r
      )
    }),
    (A.clone = function (e, t) {
      if (n.defined(e))
        return n.defined(t)
          ? ((t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), (t[3] = e[3]), (t[4] = e[4]), (t[5] = e[5]), (t[6] = e[6]), (t[7] = e[7]), (t[8] = e[8]), t)
          : new A(e[0], e[3], e[6], e[1], e[4], e[7], e[2], e[5], e[8])
    }),
    (A.fromArray = function (e, t, r) {
      return (
        (t = n.defaultValue(t, 0)),
        n.defined(r) || (r = new A()),
        (r[0] = e[t]),
        (r[1] = e[t + 1]),
        (r[2] = e[t + 2]),
        (r[3] = e[t + 3]),
        (r[4] = e[t + 4]),
        (r[5] = e[t + 5]),
        (r[6] = e[t + 6]),
        (r[7] = e[t + 7]),
        (r[8] = e[t + 8]),
        r
      )
    }),
    (A.fromColumnMajorArray = function (e, t) {
      return A.clone(e, t)
    }),
    (A.fromRowMajorArray = function (e, t) {
      return n.defined(t)
        ? ((t[0] = e[0]), (t[1] = e[3]), (t[2] = e[6]), (t[3] = e[1]), (t[4] = e[4]), (t[5] = e[7]), (t[6] = e[2]), (t[7] = e[5]), (t[8] = e[8]), t)
        : new A(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8])
    }),
    (A.fromQuaternion = function (e, t) {
      var r = e.x * e.x,
        a = e.x * e.y,
        i = e.x * e.z,
        u = e.x * e.w,
        o = e.y * e.y,
        s = e.y * e.z,
        f = e.y * e.w,
        l = e.z * e.z,
        d = e.z * e.w,
        c = e.w * e.w,
        h = r - o - l + c,
        m = 2 * (a - d),
        y = 2 * (i + f),
        p = 2 * (a + d),
        x = -r + o - l + c,
        M = 2 * (s - u),
        w = 2 * (i - f),
        g = 2 * (s + u),
        v = -r - o + l + c
      return n.defined(t)
        ? ((t[0] = h), (t[1] = p), (t[2] = w), (t[3] = m), (t[4] = x), (t[5] = g), (t[6] = y), (t[7] = M), (t[8] = v), t)
        : new A(h, m, y, p, x, M, w, g, v)
    }),
    (A.fromHeadingPitchRoll = function (e, t) {
      var r = Math.cos(-e.pitch),
        a = Math.cos(-e.heading),
        i = Math.cos(e.roll),
        u = Math.sin(-e.pitch),
        o = Math.sin(-e.heading),
        s = Math.sin(e.roll),
        f = r * a,
        l = -i * o + s * u * a,
        d = s * o + i * u * a,
        c = r * o,
        h = i * a + s * u * o,
        m = -s * a + i * u * o,
        y = -u,
        p = s * r,
        x = i * r
      return n.defined(t)
        ? ((t[0] = f), (t[1] = c), (t[2] = y), (t[3] = l), (t[4] = h), (t[5] = p), (t[6] = d), (t[7] = m), (t[8] = x), t)
        : new A(f, l, d, c, h, m, y, p, x)
    }),
    (A.fromScale = function (e, t) {
      return n.defined(t)
        ? ((t[0] = e.x), (t[1] = 0), (t[2] = 0), (t[3] = 0), (t[4] = e.y), (t[5] = 0), (t[6] = 0), (t[7] = 0), (t[8] = e.z), t)
        : new A(e.x, 0, 0, 0, e.y, 0, 0, 0, e.z)
    }),
    (A.fromUniformScale = function (e, t) {
      return n.defined(t)
        ? ((t[0] = e), (t[1] = 0), (t[2] = 0), (t[3] = 0), (t[4] = e), (t[5] = 0), (t[6] = 0), (t[7] = 0), (t[8] = e), t)
        : new A(e, 0, 0, 0, e, 0, 0, 0, e)
    }),
    (A.fromCrossProduct = function (e, t) {
      return n.defined(t)
        ? ((t[0] = 0), (t[1] = e.z), (t[2] = -e.y), (t[3] = -e.z), (t[4] = 0), (t[5] = e.x), (t[6] = e.y), (t[7] = -e.x), (t[8] = 0), t)
        : new A(0, -e.z, e.y, e.z, 0, -e.x, -e.y, e.x, 0)
    }),
    (A.fromRotationX = function (e, t) {
      var r = Math.cos(e),
        a = Math.sin(e)
      return n.defined(t)
        ? ((t[0] = 1), (t[1] = 0), (t[2] = 0), (t[3] = 0), (t[4] = r), (t[5] = a), (t[6] = 0), (t[7] = -a), (t[8] = r), t)
        : new A(1, 0, 0, 0, r, -a, 0, a, r)
    }),
    (A.fromRotationY = function (e, t) {
      var r = Math.cos(e),
        a = Math.sin(e)
      return n.defined(t)
        ? ((t[0] = r), (t[1] = 0), (t[2] = -a), (t[3] = 0), (t[4] = 1), (t[5] = 0), (t[6] = a), (t[7] = 0), (t[8] = r), t)
        : new A(r, 0, a, 0, 1, 0, -a, 0, r)
    }),
    (A.fromRotationZ = function (e, t) {
      var r = Math.cos(e),
        a = Math.sin(e)
      return n.defined(t)
        ? ((t[0] = r), (t[1] = a), (t[2] = 0), (t[3] = -a), (t[4] = r), (t[5] = 0), (t[6] = 0), (t[7] = 0), (t[8] = 1), t)
        : new A(r, -a, 0, a, r, 0, 0, 0, 1)
    }),
    (A.toArray = function (e, t) {
      return n.defined(t)
        ? ((t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), (t[3] = e[3]), (t[4] = e[4]), (t[5] = e[5]), (t[6] = e[6]), (t[7] = e[7]), (t[8] = e[8]), t)
        : [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]]
    }),
    (A.getElementIndex = function (e, t) {
      return 3 * e + t
    }),
    (A.getColumn = function (e, t, n) {
      var r = 3 * t,
        a = e[r],
        i = e[r + 1],
        u = e[r + 2]
      return (n.x = a), (n.y = i), (n.z = u), n
    }),
    (A.setColumn = function (e, t, n, r) {
      var a = 3 * t
      return ((r = A.clone(e, r))[a] = n.x), (r[a + 1] = n.y), (r[a + 2] = n.z), r
    }),
    (A.getRow = function (e, t, n) {
      var r = e[t],
        a = e[t + 3],
        i = e[t + 6]
      return (n.x = r), (n.y = a), (n.z = i), n
    }),
    (A.setRow = function (e, t, n, r) {
      return ((r = A.clone(e, r))[t] = n.x), (r[t + 3] = n.y), (r[t + 6] = n.z), r
    })
  var I = new a()
  A.getScale = function (e, t) {
    return (
      (t.x = a.magnitude(a.fromElements(e[0], e[1], e[2], I))),
      (t.y = a.magnitude(a.fromElements(e[3], e[4], e[5], I))),
      (t.z = a.magnitude(a.fromElements(e[6], e[7], e[8], I))),
      t
    )
  }
  var N = new a()
  ;(A.getMaximumScale = function (e) {
    return A.getScale(e, N), a.maximumComponent(N)
  }),
    (A.multiply = function (e, t, n) {
      var r = e[0] * t[0] + e[3] * t[1] + e[6] * t[2],
        a = e[1] * t[0] + e[4] * t[1] + e[7] * t[2],
        i = e[2] * t[0] + e[5] * t[1] + e[8] * t[2],
        u = e[0] * t[3] + e[3] * t[4] + e[6] * t[5],
        o = e[1] * t[3] + e[4] * t[4] + e[7] * t[5],
        s = e[2] * t[3] + e[5] * t[4] + e[8] * t[5],
        f = e[0] * t[6] + e[3] * t[7] + e[6] * t[8],
        l = e[1] * t[6] + e[4] * t[7] + e[7] * t[8],
        d = e[2] * t[6] + e[5] * t[7] + e[8] * t[8]
      return (n[0] = r), (n[1] = a), (n[2] = i), (n[3] = u), (n[4] = o), (n[5] = s), (n[6] = f), (n[7] = l), (n[8] = d), n
    }),
    (A.add = function (e, t, n) {
      return (
        (n[0] = e[0] + t[0]),
        (n[1] = e[1] + t[1]),
        (n[2] = e[2] + t[2]),
        (n[3] = e[3] + t[3]),
        (n[4] = e[4] + t[4]),
        (n[5] = e[5] + t[5]),
        (n[6] = e[6] + t[6]),
        (n[7] = e[7] + t[7]),
        (n[8] = e[8] + t[8]),
        n
      )
    }),
    (A.subtract = function (e, t, n) {
      return (
        (n[0] = e[0] - t[0]),
        (n[1] = e[1] - t[1]),
        (n[2] = e[2] - t[2]),
        (n[3] = e[3] - t[3]),
        (n[4] = e[4] - t[4]),
        (n[5] = e[5] - t[5]),
        (n[6] = e[6] - t[6]),
        (n[7] = e[7] - t[7]),
        (n[8] = e[8] - t[8]),
        n
      )
    }),
    (A.multiplyByVector = function (e, t, n) {
      var r = t.x,
        a = t.y,
        i = t.z,
        u = e[0] * r + e[3] * a + e[6] * i,
        o = e[1] * r + e[4] * a + e[7] * i,
        s = e[2] * r + e[5] * a + e[8] * i
      return (n.x = u), (n.y = o), (n.z = s), n
    }),
    (A.multiplyByScalar = function (e, t, n) {
      return (
        (n[0] = e[0] * t),
        (n[1] = e[1] * t),
        (n[2] = e[2] * t),
        (n[3] = e[3] * t),
        (n[4] = e[4] * t),
        (n[5] = e[5] * t),
        (n[6] = e[6] * t),
        (n[7] = e[7] * t),
        (n[8] = e[8] * t),
        n
      )
    }),
    (A.multiplyByScale = function (e, t, n) {
      return (
        (n[0] = e[0] * t.x),
        (n[1] = e[1] * t.x),
        (n[2] = e[2] * t.x),
        (n[3] = e[3] * t.y),
        (n[4] = e[4] * t.y),
        (n[5] = e[5] * t.y),
        (n[6] = e[6] * t.z),
        (n[7] = e[7] * t.z),
        (n[8] = e[8] * t.z),
        n
      )
    }),
    (A.negate = function (e, t) {
      return (
        (t[0] = -e[0]),
        (t[1] = -e[1]),
        (t[2] = -e[2]),
        (t[3] = -e[3]),
        (t[4] = -e[4]),
        (t[5] = -e[5]),
        (t[6] = -e[6]),
        (t[7] = -e[7]),
        (t[8] = -e[8]),
        t
      )
    }),
    (A.transpose = function (e, t) {
      var n = e[0],
        r = e[3],
        a = e[6],
        i = e[1],
        u = e[4],
        o = e[7],
        s = e[2],
        f = e[5],
        l = e[8]
      return (t[0] = n), (t[1] = r), (t[2] = a), (t[3] = i), (t[4] = u), (t[5] = o), (t[6] = s), (t[7] = f), (t[8] = l), t
    })
  var U = new a(1, 1, 1)
  A.getRotation = function (e, t) {
    var n = a.divideComponents(U, A.getScale(e, N), N)
    return (t = A.multiplyByScale(e, n, t))
  }
  var L = [1, 0, 0],
    P = [2, 2, 1]
  function W(e) {
    for (var t = 0, n = 0; n < 3; ++n) {
      var r = e[A.getElementIndex(P[n], L[n])]
      t += 2 * r * r
    }
    return Math.sqrt(t)
  }
  function k(e, t) {
    for (var n = r.CesiumMath.EPSILON15, a = 0, i = 1, u = 0; u < 3; ++u) {
      var o = Math.abs(e[A.getElementIndex(P[u], L[u])])
      o > a && ((i = u), (a = o))
    }
    var s = 1,
      f = 0,
      l = L[i],
      d = P[i]
    if (Math.abs(e[A.getElementIndex(d, l)]) > n) {
      var c,
        h = (e[A.getElementIndex(d, d)] - e[A.getElementIndex(l, l)]) / 2 / e[A.getElementIndex(d, l)]
      f = (c = h < 0 ? -1 / (-h + Math.sqrt(1 + h * h)) : 1 / (h + Math.sqrt(1 + h * h))) * (s = 1 / Math.sqrt(1 + c * c))
    }
    return (
      ((t = A.clone(A.IDENTITY, t))[A.getElementIndex(l, l)] = t[A.getElementIndex(d, d)] = s),
      (t[A.getElementIndex(d, l)] = f),
      (t[A.getElementIndex(l, d)] = -f),
      t
    )
  }
  var B = new A(),
    j = new A()
  ;(A.computeEigenDecomposition = function (e, t) {
    var a = r.CesiumMath.EPSILON20,
      i = 0,
      u = 0
    n.defined(t) || (t = {})
    for (
      var o = (t.unitary = A.clone(A.IDENTITY, t.unitary)),
        s = (t.diagonal = A.clone(e, t.diagonal)),
        f =
          a *
          (function (e) {
            for (var t = 0, n = 0; n < 9; ++n) {
              var r = e[n]
              t += r * r
            }
            return Math.sqrt(t)
          })(s);
      u < 10 && W(s) > f;

    )
      k(s, B), A.transpose(B, j), A.multiply(s, B, s), A.multiply(j, s, s), A.multiply(o, B, o), ++i > 2 && (++u, (i = 0))
    return t
  }),
    (A.abs = function (e, t) {
      return (
        (t[0] = Math.abs(e[0])),
        (t[1] = Math.abs(e[1])),
        (t[2] = Math.abs(e[2])),
        (t[3] = Math.abs(e[3])),
        (t[4] = Math.abs(e[4])),
        (t[5] = Math.abs(e[5])),
        (t[6] = Math.abs(e[6])),
        (t[7] = Math.abs(e[7])),
        (t[8] = Math.abs(e[8])),
        t
      )
    }),
    (A.determinant = function (e) {
      var t = e[0],
        n = e[3],
        r = e[6],
        a = e[1],
        i = e[4],
        u = e[7],
        o = e[2],
        s = e[5],
        f = e[8]
      return t * (i * f - s * u) + a * (s * r - n * f) + o * (n * u - i * r)
    }),
    (A.inverse = function (e, t) {
      var n = e[0],
        r = e[1],
        a = e[2],
        i = e[3],
        u = e[4],
        o = e[5],
        s = e[6],
        f = e[7],
        l = e[8],
        d = A.determinant(e)
      ;(t[0] = u * l - f * o),
        (t[1] = f * a - r * l),
        (t[2] = r * o - u * a),
        (t[3] = s * o - i * l),
        (t[4] = n * l - s * a),
        (t[5] = i * a - n * o),
        (t[6] = i * f - s * u),
        (t[7] = s * r - n * f),
        (t[8] = n * u - i * r)
      var c = 1 / d
      return A.multiplyByScalar(t, c, t)
    })
  var X = new A()
  function D(e, t, r, a) {
    ;(this.x = n.defaultValue(e, 0)), (this.y = n.defaultValue(t, 0)), (this.z = n.defaultValue(r, 0)), (this.w = n.defaultValue(a, 0))
  }
  ;(A.inverseTranspose = function (e, t) {
    return A.inverse(A.transpose(e, X), t)
  }),
    (A.equals = function (e, t) {
      return (
        e === t ||
        (n.defined(e) &&
          n.defined(t) &&
          e[0] === t[0] &&
          e[1] === t[1] &&
          e[2] === t[2] &&
          e[3] === t[3] &&
          e[4] === t[4] &&
          e[5] === t[5] &&
          e[6] === t[6] &&
          e[7] === t[7] &&
          e[8] === t[8])
      )
    }),
    (A.equalsEpsilon = function (e, t, r) {
      return (
        (r = n.defaultValue(r, 0)),
        e === t ||
          (n.defined(e) &&
            n.defined(t) &&
            Math.abs(e[0] - t[0]) <= r &&
            Math.abs(e[1] - t[1]) <= r &&
            Math.abs(e[2] - t[2]) <= r &&
            Math.abs(e[3] - t[3]) <= r &&
            Math.abs(e[4] - t[4]) <= r &&
            Math.abs(e[5] - t[5]) <= r &&
            Math.abs(e[6] - t[6]) <= r &&
            Math.abs(e[7] - t[7]) <= r &&
            Math.abs(e[8] - t[8]) <= r)
      )
    }),
    (A.IDENTITY = Object.freeze(new A(1, 0, 0, 0, 1, 0, 0, 0, 1))),
    (A.ZERO = Object.freeze(new A(0, 0, 0, 0, 0, 0, 0, 0, 0))),
    (A.COLUMN0ROW0 = 0),
    (A.COLUMN0ROW1 = 1),
    (A.COLUMN0ROW2 = 2),
    (A.COLUMN1ROW0 = 3),
    (A.COLUMN1ROW1 = 4),
    (A.COLUMN1ROW2 = 5),
    (A.COLUMN2ROW0 = 6),
    (A.COLUMN2ROW1 = 7),
    (A.COLUMN2ROW2 = 8),
    Object.defineProperties(A.prototype, {
      length: {
        get: function () {
          return A.packedLength
        }
      }
    }),
    (A.prototype.clone = function (e) {
      return A.clone(this, e)
    }),
    (A.prototype.equals = function (e) {
      return A.equals(this, e)
    }),
    (A.equalsArray = function (e, t, n) {
      return (
        e[0] === t[n] &&
        e[1] === t[n + 1] &&
        e[2] === t[n + 2] &&
        e[3] === t[n + 3] &&
        e[4] === t[n + 4] &&
        e[5] === t[n + 5] &&
        e[6] === t[n + 6] &&
        e[7] === t[n + 7] &&
        e[8] === t[n + 8]
      )
    }),
    (A.prototype.equalsEpsilon = function (e, t) {
      return A.equalsEpsilon(this, e, t)
    }),
    (A.prototype.toString = function () {
      return (
        '(' +
        this[0] +
        ', ' +
        this[3] +
        ', ' +
        this[6] +
        ')\n(' +
        this[1] +
        ', ' +
        this[4] +
        ', ' +
        this[7] +
        ')\n(' +
        this[2] +
        ', ' +
        this[5] +
        ', ' +
        this[8] +
        ')'
      )
    }),
    (D.fromElements = function (e, t, r, a, i) {
      return n.defined(i) ? ((i.x = e), (i.y = t), (i.z = r), (i.w = a), i) : new D(e, t, r, a)
    }),
    (D.fromColor = function (e, t) {
      return n.defined(t) ? ((t.x = e.red), (t.y = e.green), (t.z = e.blue), (t.w = e.alpha), t) : new D(e.red, e.green, e.blue, e.alpha)
    }),
    (D.clone = function (e, t) {
      if (n.defined(e)) return n.defined(t) ? ((t.x = e.x), (t.y = e.y), (t.z = e.z), (t.w = e.w), t) : new D(e.x, e.y, e.z, e.w)
    }),
    (D.packedLength = 4),
    (D.pack = function (e, t, r) {
      return (r = n.defaultValue(r, 0)), (t[r++] = e.x), (t[r++] = e.y), (t[r++] = e.z), (t[r] = e.w), t
    }),
    (D.unpack = function (e, t, r) {
      return (t = n.defaultValue(t, 0)), n.defined(r) || (r = new D()), (r.x = e[t++]), (r.y = e[t++]), (r.z = e[t++]), (r.w = e[t]), r
    }),
    (D.packArray = function (e, r) {
      var a = e.length,
        i = 4 * a
      if (n.defined(r)) {
        if (!Array.isArray(r) && r.length !== i)
          throw new t.DeveloperError('If result is a typed array, it must have exactly array.length * 4 elements')
        r.length !== i && (r.length = i)
      } else r = new Array(i)
      for (var u = 0; u < a; ++u) D.pack(e[u], r, 4 * u)
      return r
    }),
    (D.unpackArray = function (e, t) {
      var r = e.length
      n.defined(t) ? (t.length = r / 4) : (t = new Array(r / 4))
      for (var a = 0; a < r; a += 4) {
        var i = a / 4
        t[i] = D.unpack(e, a, t[i])
      }
      return t
    }),
    (D.fromArray = D.unpack),
    (D.maximumComponent = function (e) {
      return Math.max(e.x, e.y, e.z, e.w)
    }),
    (D.minimumComponent = function (e) {
      return Math.min(e.x, e.y, e.z, e.w)
    }),
    (D.minimumByComponent = function (e, t, n) {
      return (n.x = Math.min(e.x, t.x)), (n.y = Math.min(e.y, t.y)), (n.z = Math.min(e.z, t.z)), (n.w = Math.min(e.w, t.w)), n
    }),
    (D.maximumByComponent = function (e, t, n) {
      return (n.x = Math.max(e.x, t.x)), (n.y = Math.max(e.y, t.y)), (n.z = Math.max(e.z, t.z)), (n.w = Math.max(e.w, t.w)), n
    }),
    (D.magnitudeSquared = function (e) {
      return e.x * e.x + e.y * e.y + e.z * e.z + e.w * e.w
    }),
    (D.magnitude = function (e) {
      return Math.sqrt(D.magnitudeSquared(e))
    })
  var Z = new D()
  ;(D.distance = function (e, t) {
    return D.subtract(e, t, Z), D.magnitude(Z)
  }),
    (D.distanceSquared = function (e, t) {
      return D.subtract(e, t, Z), D.magnitudeSquared(Z)
    }),
    (D.normalize = function (e, t) {
      var n = D.magnitude(e)
      return (t.x = e.x / n), (t.y = e.y / n), (t.z = e.z / n), (t.w = e.w / n), t
    }),
    (D.dot = function (e, t) {
      return e.x * t.x + e.y * t.y + e.z * t.z + e.w * t.w
    }),
    (D.multiplyComponents = function (e, t, n) {
      return (n.x = e.x * t.x), (n.y = e.y * t.y), (n.z = e.z * t.z), (n.w = e.w * t.w), n
    }),
    (D.divideComponents = function (e, t, n) {
      return (n.x = e.x / t.x), (n.y = e.y / t.y), (n.z = e.z / t.z), (n.w = e.w / t.w), n
    }),
    (D.add = function (e, t, n) {
      return (n.x = e.x + t.x), (n.y = e.y + t.y), (n.z = e.z + t.z), (n.w = e.w + t.w), n
    }),
    (D.subtract = function (e, t, n) {
      return (n.x = e.x - t.x), (n.y = e.y - t.y), (n.z = e.z - t.z), (n.w = e.w - t.w), n
    }),
    (D.multiplyByScalar = function (e, t, n) {
      return (n.x = e.x * t), (n.y = e.y * t), (n.z = e.z * t), (n.w = e.w * t), n
    }),
    (D.divideByScalar = function (e, t, n) {
      return (n.x = e.x / t), (n.y = e.y / t), (n.z = e.z / t), (n.w = e.w / t), n
    }),
    (D.negate = function (e, t) {
      return (t.x = -e.x), (t.y = -e.y), (t.z = -e.z), (t.w = -e.w), t
    }),
    (D.abs = function (e, t) {
      return (t.x = Math.abs(e.x)), (t.y = Math.abs(e.y)), (t.z = Math.abs(e.z)), (t.w = Math.abs(e.w)), t
    })
  var Y = new D()
  D.lerp = function (e, t, n, r) {
    return D.multiplyByScalar(t, n, Y), (r = D.multiplyByScalar(e, 1 - n, r)), D.add(Y, r, r)
  }
  var F = new D()
  ;(D.mostOrthogonalAxis = function (e, t) {
    var n = D.normalize(e, F)
    return (
      D.abs(n, n),
      (t =
        n.x <= n.y
          ? n.x <= n.z
            ? n.x <= n.w
              ? D.clone(D.UNIT_X, t)
              : D.clone(D.UNIT_W, t)
            : n.z <= n.w
            ? D.clone(D.UNIT_Z, t)
            : D.clone(D.UNIT_W, t)
          : n.y <= n.z
          ? n.y <= n.w
            ? D.clone(D.UNIT_Y, t)
            : D.clone(D.UNIT_W, t)
          : n.z <= n.w
          ? D.clone(D.UNIT_Z, t)
          : D.clone(D.UNIT_W, t))
    )
  }),
    (D.equals = function (e, t) {
      return e === t || (n.defined(e) && n.defined(t) && e.x === t.x && e.y === t.y && e.z === t.z && e.w === t.w)
    }),
    (D.equalsArray = function (e, t, n) {
      return e.x === t[n] && e.y === t[n + 1] && e.z === t[n + 2] && e.w === t[n + 3]
    }),
    (D.equalsEpsilon = function (e, t, a, i) {
      return (
        e === t ||
        (n.defined(e) &&
          n.defined(t) &&
          r.CesiumMath.equalsEpsilon(e.x, t.x, a, i) &&
          r.CesiumMath.equalsEpsilon(e.y, t.y, a, i) &&
          r.CesiumMath.equalsEpsilon(e.z, t.z, a, i) &&
          r.CesiumMath.equalsEpsilon(e.w, t.w, a, i))
      )
    }),
    (D.ZERO = Object.freeze(new D(0, 0, 0, 0))),
    (D.ONE = Object.freeze(new D(1, 1, 1, 1))),
    (D.UNIT_X = Object.freeze(new D(1, 0, 0, 0))),
    (D.UNIT_Y = Object.freeze(new D(0, 1, 0, 0))),
    (D.UNIT_Z = Object.freeze(new D(0, 0, 1, 0))),
    (D.UNIT_W = Object.freeze(new D(0, 0, 0, 1))),
    (D.prototype.clone = function (e) {
      return D.clone(this, e)
    }),
    (D.prototype.equals = function (e) {
      return D.equals(this, e)
    }),
    (D.prototype.equalsEpsilon = function (e, t, n) {
      return D.equalsEpsilon(this, e, t, n)
    }),
    (D.prototype.toString = function () {
      return '(' + this.x + ', ' + this.y + ', ' + this.z + ', ' + this.w + ')'
    })
  var G = new Float32Array(1),
    H = new Uint8Array(G.buffer),
    Q = new Uint32Array([287454020]),
    J = 68 === new Uint8Array(Q.buffer)[0]
  function K(e, t, r, a, i, u, o, s, f, l, d, c, h, m, y, p) {
    ;(this[0] = n.defaultValue(e, 0)),
      (this[1] = n.defaultValue(i, 0)),
      (this[2] = n.defaultValue(f, 0)),
      (this[3] = n.defaultValue(h, 0)),
      (this[4] = n.defaultValue(t, 0)),
      (this[5] = n.defaultValue(u, 0)),
      (this[6] = n.defaultValue(l, 0)),
      (this[7] = n.defaultValue(m, 0)),
      (this[8] = n.defaultValue(r, 0)),
      (this[9] = n.defaultValue(o, 0)),
      (this[10] = n.defaultValue(d, 0)),
      (this[11] = n.defaultValue(y, 0)),
      (this[12] = n.defaultValue(a, 0)),
      (this[13] = n.defaultValue(s, 0)),
      (this[14] = n.defaultValue(c, 0)),
      (this[15] = n.defaultValue(p, 0))
  }
  ;(D.packFloat = function (e, t) {
    return (
      n.defined(t) || (t = new D()),
      (G[0] = e),
      J ? ((t.x = H[0]), (t.y = H[1]), (t.z = H[2]), (t.w = H[3])) : ((t.x = H[3]), (t.y = H[2]), (t.z = H[1]), (t.w = H[0])),
      t
    )
  }),
    (D.unpackFloat = function (e) {
      return J ? ((H[0] = e.x), (H[1] = e.y), (H[2] = e.z), (H[3] = e.w)) : ((H[0] = e.w), (H[1] = e.z), (H[2] = e.y), (H[3] = e.x)), G[0]
    }),
    (K.packedLength = 16),
    (K.pack = function (e, t, r) {
      return (
        (r = n.defaultValue(r, 0)),
        (t[r++] = e[0]),
        (t[r++] = e[1]),
        (t[r++] = e[2]),
        (t[r++] = e[3]),
        (t[r++] = e[4]),
        (t[r++] = e[5]),
        (t[r++] = e[6]),
        (t[r++] = e[7]),
        (t[r++] = e[8]),
        (t[r++] = e[9]),
        (t[r++] = e[10]),
        (t[r++] = e[11]),
        (t[r++] = e[12]),
        (t[r++] = e[13]),
        (t[r++] = e[14]),
        (t[r] = e[15]),
        t
      )
    }),
    (K.unpack = function (e, t, r) {
      return (
        (t = n.defaultValue(t, 0)),
        n.defined(r) || (r = new K()),
        (r[0] = e[t++]),
        (r[1] = e[t++]),
        (r[2] = e[t++]),
        (r[3] = e[t++]),
        (r[4] = e[t++]),
        (r[5] = e[t++]),
        (r[6] = e[t++]),
        (r[7] = e[t++]),
        (r[8] = e[t++]),
        (r[9] = e[t++]),
        (r[10] = e[t++]),
        (r[11] = e[t++]),
        (r[12] = e[t++]),
        (r[13] = e[t++]),
        (r[14] = e[t++]),
        (r[15] = e[t]),
        r
      )
    }),
    (K.clone = function (e, t) {
      if (n.defined(e))
        return n.defined(t)
          ? ((t[0] = e[0]),
            (t[1] = e[1]),
            (t[2] = e[2]),
            (t[3] = e[3]),
            (t[4] = e[4]),
            (t[5] = e[5]),
            (t[6] = e[6]),
            (t[7] = e[7]),
            (t[8] = e[8]),
            (t[9] = e[9]),
            (t[10] = e[10]),
            (t[11] = e[11]),
            (t[12] = e[12]),
            (t[13] = e[13]),
            (t[14] = e[14]),
            (t[15] = e[15]),
            t)
          : new K(e[0], e[4], e[8], e[12], e[1], e[5], e[9], e[13], e[2], e[6], e[10], e[14], e[3], e[7], e[11], e[15])
    }),
    (K.fromArray = K.unpack),
    (K.fromColumnMajorArray = function (e, t) {
      return K.clone(e, t)
    }),
    (K.fromRowMajorArray = function (e, t) {
      return n.defined(t)
        ? ((t[0] = e[0]),
          (t[1] = e[4]),
          (t[2] = e[8]),
          (t[3] = e[12]),
          (t[4] = e[1]),
          (t[5] = e[5]),
          (t[6] = e[9]),
          (t[7] = e[13]),
          (t[8] = e[2]),
          (t[9] = e[6]),
          (t[10] = e[10]),
          (t[11] = e[14]),
          (t[12] = e[3]),
          (t[13] = e[7]),
          (t[14] = e[11]),
          (t[15] = e[15]),
          t)
        : new K(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15])
    }),
    (K.fromRotationTranslation = function (e, t, r) {
      return (
        (t = n.defaultValue(t, a.ZERO)),
        n.defined(r)
          ? ((r[0] = e[0]),
            (r[1] = e[1]),
            (r[2] = e[2]),
            (r[3] = 0),
            (r[4] = e[3]),
            (r[5] = e[4]),
            (r[6] = e[5]),
            (r[7] = 0),
            (r[8] = e[6]),
            (r[9] = e[7]),
            (r[10] = e[8]),
            (r[11] = 0),
            (r[12] = t.x),
            (r[13] = t.y),
            (r[14] = t.z),
            (r[15] = 1),
            r)
          : new K(e[0], e[3], e[6], t.x, e[1], e[4], e[7], t.y, e[2], e[5], e[8], t.z, 0, 0, 0, 1)
      )
    }),
    (K.fromTranslationQuaternionRotationScale = function (e, t, r, a) {
      n.defined(a) || (a = new K())
      var i = r.x,
        u = r.y,
        o = r.z,
        s = t.x * t.x,
        f = t.x * t.y,
        l = t.x * t.z,
        d = t.x * t.w,
        c = t.y * t.y,
        h = t.y * t.z,
        m = t.y * t.w,
        y = t.z * t.z,
        p = t.z * t.w,
        x = t.w * t.w,
        M = s - c - y + x,
        w = 2 * (f - p),
        g = 2 * (l + m),
        v = 2 * (f + p),
        z = -s + c - y + x,
        C = 2 * (h - d),
        O = 2 * (l - m),
        b = 2 * (h + d),
        S = -s - c + y + x
      return (
        (a[0] = M * i),
        (a[1] = v * i),
        (a[2] = O * i),
        (a[3] = 0),
        (a[4] = w * u),
        (a[5] = z * u),
        (a[6] = b * u),
        (a[7] = 0),
        (a[8] = g * o),
        (a[9] = C * o),
        (a[10] = S * o),
        (a[11] = 0),
        (a[12] = e.x),
        (a[13] = e.y),
        (a[14] = e.z),
        (a[15] = 1),
        a
      )
    }),
    (K.fromTranslationRotationScale = function (e, t) {
      return K.fromTranslationQuaternionRotationScale(e.translation, e.rotation, e.scale, t)
    }),
    (K.fromTranslation = function (e, t) {
      return K.fromRotationTranslation(A.IDENTITY, e, t)
    }),
    (K.fromScale = function (e, t) {
      return n.defined(t)
        ? ((t[0] = e.x),
          (t[1] = 0),
          (t[2] = 0),
          (t[3] = 0),
          (t[4] = 0),
          (t[5] = e.y),
          (t[6] = 0),
          (t[7] = 0),
          (t[8] = 0),
          (t[9] = 0),
          (t[10] = e.z),
          (t[11] = 0),
          (t[12] = 0),
          (t[13] = 0),
          (t[14] = 0),
          (t[15] = 1),
          t)
        : new K(e.x, 0, 0, 0, 0, e.y, 0, 0, 0, 0, e.z, 0, 0, 0, 0, 1)
    }),
    (K.fromUniformScale = function (e, t) {
      return n.defined(t)
        ? ((t[0] = e),
          (t[1] = 0),
          (t[2] = 0),
          (t[3] = 0),
          (t[4] = 0),
          (t[5] = e),
          (t[6] = 0),
          (t[7] = 0),
          (t[8] = 0),
          (t[9] = 0),
          (t[10] = e),
          (t[11] = 0),
          (t[12] = 0),
          (t[13] = 0),
          (t[14] = 0),
          (t[15] = 1),
          t)
        : new K(e, 0, 0, 0, 0, e, 0, 0, 0, 0, e, 0, 0, 0, 0, 1)
    })
  var $ = new a(),
    ee = new a(),
    te = new a()
  ;(K.fromCamera = function (e, t) {
    var r = e.position,
      i = e.direction,
      u = e.up
    a.normalize(i, $), a.normalize(a.cross($, u, ee), ee), a.normalize(a.cross(ee, $, te), te)
    var o = ee.x,
      s = ee.y,
      f = ee.z,
      l = $.x,
      d = $.y,
      c = $.z,
      h = te.x,
      m = te.y,
      y = te.z,
      p = r.x,
      x = r.y,
      M = r.z,
      w = o * -p + s * -x + f * -M,
      g = h * -p + m * -x + y * -M,
      v = l * p + d * x + c * M
    return n.defined(t)
      ? ((t[0] = o),
        (t[1] = h),
        (t[2] = -l),
        (t[3] = 0),
        (t[4] = s),
        (t[5] = m),
        (t[6] = -d),
        (t[7] = 0),
        (t[8] = f),
        (t[9] = y),
        (t[10] = -c),
        (t[11] = 0),
        (t[12] = w),
        (t[13] = g),
        (t[14] = v),
        (t[15] = 1),
        t)
      : new K(o, s, f, w, h, m, y, g, -l, -d, -c, v, 0, 0, 0, 1)
  }),
    (K.computePerspectiveFieldOfView = function (e, t, n, r, a) {
      var i = 1 / Math.tan(0.5 * e),
        u = i / t,
        o = (r + n) / (n - r),
        s = (2 * r * n) / (n - r)
      return (
        (a[0] = u),
        (a[1] = 0),
        (a[2] = 0),
        (a[3] = 0),
        (a[4] = 0),
        (a[5] = i),
        (a[6] = 0),
        (a[7] = 0),
        (a[8] = 0),
        (a[9] = 0),
        (a[10] = o),
        (a[11] = -1),
        (a[12] = 0),
        (a[13] = 0),
        (a[14] = s),
        (a[15] = 0),
        a
      )
    }),
    (K.computeOrthographicOffCenter = function (e, t, n, r, a, i, u) {
      var o = 1 / (t - e),
        s = 1 / (r - n),
        f = 1 / (i - a),
        l = -(t + e) * o,
        d = -(r + n) * s,
        c = -(i + a) * f
      return (
        (o *= 2),
        (s *= 2),
        (f *= -2),
        (u[0] = o),
        (u[1] = 0),
        (u[2] = 0),
        (u[3] = 0),
        (u[4] = 0),
        (u[5] = s),
        (u[6] = 0),
        (u[7] = 0),
        (u[8] = 0),
        (u[9] = 0),
        (u[10] = f),
        (u[11] = 0),
        (u[12] = l),
        (u[13] = d),
        (u[14] = c),
        (u[15] = 1),
        u
      )
    }),
    (K.computePerspectiveOffCenter = function (e, t, n, r, a, i, u) {
      var o = (2 * a) / (t - e),
        s = (2 * a) / (r - n),
        f = (t + e) / (t - e),
        l = (r + n) / (r - n),
        d = -(i + a) / (i - a),
        c = (-2 * i * a) / (i - a)
      return (
        (u[0] = o),
        (u[1] = 0),
        (u[2] = 0),
        (u[3] = 0),
        (u[4] = 0),
        (u[5] = s),
        (u[6] = 0),
        (u[7] = 0),
        (u[8] = f),
        (u[9] = l),
        (u[10] = d),
        (u[11] = -1),
        (u[12] = 0),
        (u[13] = 0),
        (u[14] = c),
        (u[15] = 0),
        u
      )
    }),
    (K.computeInfinitePerspectiveOffCenter = function (e, t, n, r, a, i) {
      var u = (2 * a) / (t - e),
        o = (2 * a) / (r - n),
        s = (t + e) / (t - e),
        f = (r + n) / (r - n),
        l = -2 * a
      return (
        (i[0] = u),
        (i[1] = 0),
        (i[2] = 0),
        (i[3] = 0),
        (i[4] = 0),
        (i[5] = o),
        (i[6] = 0),
        (i[7] = 0),
        (i[8] = s),
        (i[9] = f),
        (i[10] = -1),
        (i[11] = -1),
        (i[12] = 0),
        (i[13] = 0),
        (i[14] = l),
        (i[15] = 0),
        i
      )
    }),
    (K.computeViewportTransformation = function (e, t, r, a) {
      n.defined(a) || (a = new K()), (e = n.defaultValue(e, n.defaultValue.EMPTY_OBJECT))
      var i = n.defaultValue(e.x, 0),
        u = n.defaultValue(e.y, 0),
        o = n.defaultValue(e.width, 0),
        s = n.defaultValue(e.height, 0)
      t = n.defaultValue(t, 0)
      var f = 0.5 * o,
        l = 0.5 * s,
        d = 0.5 * ((r = n.defaultValue(r, 1)) - t),
        c = f,
        h = l,
        m = d,
        y = i + f,
        p = u + l,
        x = t + d
      return (
        (a[0] = c),
        (a[1] = 0),
        (a[2] = 0),
        (a[3] = 0),
        (a[4] = 0),
        (a[5] = h),
        (a[6] = 0),
        (a[7] = 0),
        (a[8] = 0),
        (a[9] = 0),
        (a[10] = m),
        (a[11] = 0),
        (a[12] = y),
        (a[13] = p),
        (a[14] = x),
        (a[15] = 1),
        a
      )
    }),
    (K.computeView = function (e, t, n, r, i) {
      return (
        (i[0] = r.x),
        (i[1] = n.x),
        (i[2] = -t.x),
        (i[3] = 0),
        (i[4] = r.y),
        (i[5] = n.y),
        (i[6] = -t.y),
        (i[7] = 0),
        (i[8] = r.z),
        (i[9] = n.z),
        (i[10] = -t.z),
        (i[11] = 0),
        (i[12] = -a.dot(r, e)),
        (i[13] = -a.dot(n, e)),
        (i[14] = a.dot(t, e)),
        (i[15] = 1),
        i
      )
    }),
    (K.toArray = function (e, t) {
      return n.defined(t)
        ? ((t[0] = e[0]),
          (t[1] = e[1]),
          (t[2] = e[2]),
          (t[3] = e[3]),
          (t[4] = e[4]),
          (t[5] = e[5]),
          (t[6] = e[6]),
          (t[7] = e[7]),
          (t[8] = e[8]),
          (t[9] = e[9]),
          (t[10] = e[10]),
          (t[11] = e[11]),
          (t[12] = e[12]),
          (t[13] = e[13]),
          (t[14] = e[14]),
          (t[15] = e[15]),
          t)
        : [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]]
    }),
    (K.getElementIndex = function (e, t) {
      return 4 * e + t
    }),
    (K.getColumn = function (e, t, n) {
      var r = 4 * t,
        a = e[r],
        i = e[r + 1],
        u = e[r + 2],
        o = e[r + 3]
      return (n.x = a), (n.y = i), (n.z = u), (n.w = o), n
    }),
    (K.setColumn = function (e, t, n, r) {
      var a = 4 * t
      return ((r = K.clone(e, r))[a] = n.x), (r[a + 1] = n.y), (r[a + 2] = n.z), (r[a + 3] = n.w), r
    }),
    (K.setTranslation = function (e, t, n) {
      return (
        (n[0] = e[0]),
        (n[1] = e[1]),
        (n[2] = e[2]),
        (n[3] = e[3]),
        (n[4] = e[4]),
        (n[5] = e[5]),
        (n[6] = e[6]),
        (n[7] = e[7]),
        (n[8] = e[8]),
        (n[9] = e[9]),
        (n[10] = e[10]),
        (n[11] = e[11]),
        (n[12] = t.x),
        (n[13] = t.y),
        (n[14] = t.z),
        (n[15] = e[15]),
        n
      )
    })
  var ne = new a()
  ;(K.setScale = function (e, t, n) {
    var r = K.getScale(e, ne),
      i = a.divideComponents(t, r, ne)
    return K.multiplyByScale(e, i, n)
  }),
    (K.getRow = function (e, t, n) {
      var r = e[t],
        a = e[t + 4],
        i = e[t + 8],
        u = e[t + 12]
      return (n.x = r), (n.y = a), (n.z = i), (n.w = u), n
    }),
    (K.setRow = function (e, t, n, r) {
      return ((r = K.clone(e, r))[t] = n.x), (r[t + 4] = n.y), (r[t + 8] = n.z), (r[t + 12] = n.w), r
    })
  var re = new a()
  K.getScale = function (e, t) {
    return (
      (t.x = a.magnitude(a.fromElements(e[0], e[1], e[2], re))),
      (t.y = a.magnitude(a.fromElements(e[4], e[5], e[6], re))),
      (t.z = a.magnitude(a.fromElements(e[8], e[9], e[10], re))),
      t
    )
  }
  var ae = new a()
  ;(K.getMaximumScale = function (e) {
    return K.getScale(e, ae), a.maximumComponent(ae)
  }),
    (K.multiply = function (e, t, n) {
      var r = e[0],
        a = e[1],
        i = e[2],
        u = e[3],
        o = e[4],
        s = e[5],
        f = e[6],
        l = e[7],
        d = e[8],
        c = e[9],
        h = e[10],
        m = e[11],
        y = e[12],
        p = e[13],
        x = e[14],
        M = e[15],
        w = t[0],
        g = t[1],
        v = t[2],
        z = t[3],
        C = t[4],
        O = t[5],
        b = t[6],
        S = t[7],
        q = t[8],
        _ = t[9],
        R = t[10],
        V = t[11],
        E = t[12],
        T = t[13],
        A = t[14],
        I = t[15],
        N = r * w + o * g + d * v + y * z,
        U = a * w + s * g + c * v + p * z,
        L = i * w + f * g + h * v + x * z,
        P = u * w + l * g + m * v + M * z,
        W = r * C + o * O + d * b + y * S,
        k = a * C + s * O + c * b + p * S,
        B = i * C + f * O + h * b + x * S,
        j = u * C + l * O + m * b + M * S,
        X = r * q + o * _ + d * R + y * V,
        D = a * q + s * _ + c * R + p * V,
        Z = i * q + f * _ + h * R + x * V,
        Y = u * q + l * _ + m * R + M * V,
        F = r * E + o * T + d * A + y * I,
        G = a * E + s * T + c * A + p * I,
        H = i * E + f * T + h * A + x * I,
        Q = u * E + l * T + m * A + M * I
      return (
        (n[0] = N),
        (n[1] = U),
        (n[2] = L),
        (n[3] = P),
        (n[4] = W),
        (n[5] = k),
        (n[6] = B),
        (n[7] = j),
        (n[8] = X),
        (n[9] = D),
        (n[10] = Z),
        (n[11] = Y),
        (n[12] = F),
        (n[13] = G),
        (n[14] = H),
        (n[15] = Q),
        n
      )
    }),
    (K.add = function (e, t, n) {
      return (
        (n[0] = e[0] + t[0]),
        (n[1] = e[1] + t[1]),
        (n[2] = e[2] + t[2]),
        (n[3] = e[3] + t[3]),
        (n[4] = e[4] + t[4]),
        (n[5] = e[5] + t[5]),
        (n[6] = e[6] + t[6]),
        (n[7] = e[7] + t[7]),
        (n[8] = e[8] + t[8]),
        (n[9] = e[9] + t[9]),
        (n[10] = e[10] + t[10]),
        (n[11] = e[11] + t[11]),
        (n[12] = e[12] + t[12]),
        (n[13] = e[13] + t[13]),
        (n[14] = e[14] + t[14]),
        (n[15] = e[15] + t[15]),
        n
      )
    }),
    (K.subtract = function (e, t, n) {
      return (
        (n[0] = e[0] - t[0]),
        (n[1] = e[1] - t[1]),
        (n[2] = e[2] - t[2]),
        (n[3] = e[3] - t[3]),
        (n[4] = e[4] - t[4]),
        (n[5] = e[5] - t[5]),
        (n[6] = e[6] - t[6]),
        (n[7] = e[7] - t[7]),
        (n[8] = e[8] - t[8]),
        (n[9] = e[9] - t[9]),
        (n[10] = e[10] - t[10]),
        (n[11] = e[11] - t[11]),
        (n[12] = e[12] - t[12]),
        (n[13] = e[13] - t[13]),
        (n[14] = e[14] - t[14]),
        (n[15] = e[15] - t[15]),
        n
      )
    }),
    (K.multiplyTransformation = function (e, t, n) {
      var r = e[0],
        a = e[1],
        i = e[2],
        u = e[4],
        o = e[5],
        s = e[6],
        f = e[8],
        l = e[9],
        d = e[10],
        c = e[12],
        h = e[13],
        m = e[14],
        y = t[0],
        p = t[1],
        x = t[2],
        M = t[4],
        w = t[5],
        g = t[6],
        v = t[8],
        z = t[9],
        C = t[10],
        O = t[12],
        b = t[13],
        S = t[14],
        q = r * y + u * p + f * x,
        _ = a * y + o * p + l * x,
        R = i * y + s * p + d * x,
        V = r * M + u * w + f * g,
        E = a * M + o * w + l * g,
        T = i * M + s * w + d * g,
        A = r * v + u * z + f * C,
        I = a * v + o * z + l * C,
        N = i * v + s * z + d * C,
        U = r * O + u * b + f * S + c,
        L = a * O + o * b + l * S + h,
        P = i * O + s * b + d * S + m
      return (
        (n[0] = q),
        (n[1] = _),
        (n[2] = R),
        (n[3] = 0),
        (n[4] = V),
        (n[5] = E),
        (n[6] = T),
        (n[7] = 0),
        (n[8] = A),
        (n[9] = I),
        (n[10] = N),
        (n[11] = 0),
        (n[12] = U),
        (n[13] = L),
        (n[14] = P),
        (n[15] = 1),
        n
      )
    }),
    (K.multiplyByMatrix3 = function (e, t, n) {
      var r = e[0],
        a = e[1],
        i = e[2],
        u = e[4],
        o = e[5],
        s = e[6],
        f = e[8],
        l = e[9],
        d = e[10],
        c = t[0],
        h = t[1],
        m = t[2],
        y = t[3],
        p = t[4],
        x = t[5],
        M = t[6],
        w = t[7],
        g = t[8],
        v = r * c + u * h + f * m,
        z = a * c + o * h + l * m,
        C = i * c + s * h + d * m,
        O = r * y + u * p + f * x,
        b = a * y + o * p + l * x,
        S = i * y + s * p + d * x,
        q = r * M + u * w + f * g,
        _ = a * M + o * w + l * g,
        R = i * M + s * w + d * g
      return (
        (n[0] = v),
        (n[1] = z),
        (n[2] = C),
        (n[3] = 0),
        (n[4] = O),
        (n[5] = b),
        (n[6] = S),
        (n[7] = 0),
        (n[8] = q),
        (n[9] = _),
        (n[10] = R),
        (n[11] = 0),
        (n[12] = e[12]),
        (n[13] = e[13]),
        (n[14] = e[14]),
        (n[15] = e[15]),
        n
      )
    }),
    (K.multiplyByTranslation = function (e, t, n) {
      var r = t.x,
        a = t.y,
        i = t.z,
        u = r * e[0] + a * e[4] + i * e[8] + e[12],
        o = r * e[1] + a * e[5] + i * e[9] + e[13],
        s = r * e[2] + a * e[6] + i * e[10] + e[14]
      return (
        (n[0] = e[0]),
        (n[1] = e[1]),
        (n[2] = e[2]),
        (n[3] = e[3]),
        (n[4] = e[4]),
        (n[5] = e[5]),
        (n[6] = e[6]),
        (n[7] = e[7]),
        (n[8] = e[8]),
        (n[9] = e[9]),
        (n[10] = e[10]),
        (n[11] = e[11]),
        (n[12] = u),
        (n[13] = o),
        (n[14] = s),
        (n[15] = e[15]),
        n
      )
    })
  var ie = new a()
  ;(K.multiplyByUniformScale = function (e, t, n) {
    return (ie.x = t), (ie.y = t), (ie.z = t), K.multiplyByScale(e, ie, n)
  }),
    (K.multiplyByScale = function (e, t, n) {
      var r = t.x,
        a = t.y,
        i = t.z
      return 1 === r && 1 === a && 1 === i
        ? K.clone(e, n)
        : ((n[0] = r * e[0]),
          (n[1] = r * e[1]),
          (n[2] = r * e[2]),
          (n[3] = 0),
          (n[4] = a * e[4]),
          (n[5] = a * e[5]),
          (n[6] = a * e[6]),
          (n[7] = 0),
          (n[8] = i * e[8]),
          (n[9] = i * e[9]),
          (n[10] = i * e[10]),
          (n[11] = 0),
          (n[12] = e[12]),
          (n[13] = e[13]),
          (n[14] = e[14]),
          (n[15] = 1),
          n)
    }),
    (K.multiplyByVector = function (e, t, n) {
      var r = t.x,
        a = t.y,
        i = t.z,
        u = t.w,
        o = e[0] * r + e[4] * a + e[8] * i + e[12] * u,
        s = e[1] * r + e[5] * a + e[9] * i + e[13] * u,
        f = e[2] * r + e[6] * a + e[10] * i + e[14] * u,
        l = e[3] * r + e[7] * a + e[11] * i + e[15] * u
      return (n.x = o), (n.y = s), (n.z = f), (n.w = l), n
    }),
    (K.multiplyByPointAsVector = function (e, t, n) {
      var r = t.x,
        a = t.y,
        i = t.z,
        u = e[0] * r + e[4] * a + e[8] * i,
        o = e[1] * r + e[5] * a + e[9] * i,
        s = e[2] * r + e[6] * a + e[10] * i
      return (n.x = u), (n.y = o), (n.z = s), n
    }),
    (K.multiplyByPoint = function (e, t, n) {
      var r = t.x,
        a = t.y,
        i = t.z,
        u = e[0] * r + e[4] * a + e[8] * i + e[12],
        o = e[1] * r + e[5] * a + e[9] * i + e[13],
        s = e[2] * r + e[6] * a + e[10] * i + e[14]
      return (n.x = u), (n.y = o), (n.z = s), n
    }),
    (K.multiplyByScalar = function (e, t, n) {
      return (
        (n[0] = e[0] * t),
        (n[1] = e[1] * t),
        (n[2] = e[2] * t),
        (n[3] = e[3] * t),
        (n[4] = e[4] * t),
        (n[5] = e[5] * t),
        (n[6] = e[6] * t),
        (n[7] = e[7] * t),
        (n[8] = e[8] * t),
        (n[9] = e[9] * t),
        (n[10] = e[10] * t),
        (n[11] = e[11] * t),
        (n[12] = e[12] * t),
        (n[13] = e[13] * t),
        (n[14] = e[14] * t),
        (n[15] = e[15] * t),
        n
      )
    }),
    (K.negate = function (e, t) {
      return (
        (t[0] = -e[0]),
        (t[1] = -e[1]),
        (t[2] = -e[2]),
        (t[3] = -e[3]),
        (t[4] = -e[4]),
        (t[5] = -e[5]),
        (t[6] = -e[6]),
        (t[7] = -e[7]),
        (t[8] = -e[8]),
        (t[9] = -e[9]),
        (t[10] = -e[10]),
        (t[11] = -e[11]),
        (t[12] = -e[12]),
        (t[13] = -e[13]),
        (t[14] = -e[14]),
        (t[15] = -e[15]),
        t
      )
    }),
    (K.transpose = function (e, t) {
      var n = e[1],
        r = e[2],
        a = e[3],
        i = e[6],
        u = e[7],
        o = e[11]
      return (
        (t[0] = e[0]),
        (t[1] = e[4]),
        (t[2] = e[8]),
        (t[3] = e[12]),
        (t[4] = n),
        (t[5] = e[5]),
        (t[6] = e[9]),
        (t[7] = e[13]),
        (t[8] = r),
        (t[9] = i),
        (t[10] = e[10]),
        (t[11] = e[14]),
        (t[12] = a),
        (t[13] = u),
        (t[14] = o),
        (t[15] = e[15]),
        t
      )
    }),
    (K.abs = function (e, t) {
      return (
        (t[0] = Math.abs(e[0])),
        (t[1] = Math.abs(e[1])),
        (t[2] = Math.abs(e[2])),
        (t[3] = Math.abs(e[3])),
        (t[4] = Math.abs(e[4])),
        (t[5] = Math.abs(e[5])),
        (t[6] = Math.abs(e[6])),
        (t[7] = Math.abs(e[7])),
        (t[8] = Math.abs(e[8])),
        (t[9] = Math.abs(e[9])),
        (t[10] = Math.abs(e[10])),
        (t[11] = Math.abs(e[11])),
        (t[12] = Math.abs(e[12])),
        (t[13] = Math.abs(e[13])),
        (t[14] = Math.abs(e[14])),
        (t[15] = Math.abs(e[15])),
        t
      )
    }),
    (K.equals = function (e, t) {
      return (
        e === t ||
        (n.defined(e) &&
          n.defined(t) &&
          e[12] === t[12] &&
          e[13] === t[13] &&
          e[14] === t[14] &&
          e[0] === t[0] &&
          e[1] === t[1] &&
          e[2] === t[2] &&
          e[4] === t[4] &&
          e[5] === t[5] &&
          e[6] === t[6] &&
          e[8] === t[8] &&
          e[9] === t[9] &&
          e[10] === t[10] &&
          e[3] === t[3] &&
          e[7] === t[7] &&
          e[11] === t[11] &&
          e[15] === t[15])
      )
    }),
    (K.equalsEpsilon = function (e, t, r) {
      return (
        (r = n.defaultValue(r, 0)),
        e === t ||
          (n.defined(e) &&
            n.defined(t) &&
            Math.abs(e[0] - t[0]) <= r &&
            Math.abs(e[1] - t[1]) <= r &&
            Math.abs(e[2] - t[2]) <= r &&
            Math.abs(e[3] - t[3]) <= r &&
            Math.abs(e[4] - t[4]) <= r &&
            Math.abs(e[5] - t[5]) <= r &&
            Math.abs(e[6] - t[6]) <= r &&
            Math.abs(e[7] - t[7]) <= r &&
            Math.abs(e[8] - t[8]) <= r &&
            Math.abs(e[9] - t[9]) <= r &&
            Math.abs(e[10] - t[10]) <= r &&
            Math.abs(e[11] - t[11]) <= r &&
            Math.abs(e[12] - t[12]) <= r &&
            Math.abs(e[13] - t[13]) <= r &&
            Math.abs(e[14] - t[14]) <= r &&
            Math.abs(e[15] - t[15]) <= r)
      )
    }),
    (K.getTranslation = function (e, t) {
      return (t.x = e[12]), (t.y = e[13]), (t.z = e[14]), t
    }),
    (K.getMatrix3 = function (e, t) {
      return (t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), (t[3] = e[4]), (t[4] = e[5]), (t[5] = e[6]), (t[6] = e[8]), (t[7] = e[9]), (t[8] = e[10]), t
    })
  var ue = new A(),
    oe = new A(),
    se = new D(),
    fe = new D(0, 0, 0, 1)
  ;(K.inverse = function (e, n) {
    var a = e[0],
      i = e[4],
      u = e[8],
      o = e[12],
      s = e[1],
      f = e[5],
      l = e[9],
      d = e[13],
      c = e[2],
      h = e[6],
      m = e[10],
      y = e[14],
      p = e[3],
      x = e[7],
      M = e[11],
      w = e[15],
      g = m * w,
      v = y * M,
      z = h * w,
      C = y * x,
      O = h * M,
      b = m * x,
      S = c * w,
      q = y * p,
      _ = c * M,
      R = m * p,
      V = c * x,
      E = h * p,
      T = g * f + C * l + O * d - (v * f + z * l + b * d),
      I = v * s + S * l + R * d - (g * s + q * l + _ * d),
      N = z * s + q * f + V * d - (C * s + S * f + E * d),
      U = b * s + _ * f + E * l - (O * s + R * f + V * l),
      L = v * i + z * u + b * o - (g * i + C * u + O * o),
      P = g * a + q * u + _ * o - (v * a + S * u + R * o),
      W = C * a + S * i + E * o - (z * a + q * i + V * o),
      k = O * a + R * i + V * u - (b * a + _ * i + E * u),
      B = (g = u * d) * x + (C = o * f) * M + (O = i * l) * w - ((v = o * l) * x + (z = i * d) * M + (b = u * f) * w),
      j = v * p + (S = a * d) * M + (R = u * s) * w - (g * p + (q = o * s) * M + (_ = a * l) * w),
      X = z * p + q * x + (V = a * f) * w - (C * p + S * x + (E = i * s) * w),
      Z = b * p + _ * x + E * M - (O * p + R * x + V * M),
      Y = z * m + b * y + v * h - (O * y + g * h + C * m),
      F = _ * y + g * c + q * m - (S * m + R * y + v * c),
      G = S * h + E * y + C * c - (V * y + z * c + q * h),
      H = V * m + O * c + R * h - (_ * h + E * m + b * c),
      Q = a * T + i * I + u * N + o * U
    if (Math.abs(Q) < r.CesiumMath.EPSILON21) {
      if (A.equalsEpsilon(K.getMatrix3(e, ue), oe, r.CesiumMath.EPSILON7) && D.equals(K.getRow(e, 3, se), fe))
        return (
          (n[0] = 0),
          (n[1] = 0),
          (n[2] = 0),
          (n[3] = 0),
          (n[4] = 0),
          (n[5] = 0),
          (n[6] = 0),
          (n[7] = 0),
          (n[8] = 0),
          (n[9] = 0),
          (n[10] = 0),
          (n[11] = 0),
          (n[12] = -e[12]),
          (n[13] = -e[13]),
          (n[14] = -e[14]),
          (n[15] = 1),
          n
        )
      throw new t.RuntimeError('matrix is not invertible because its determinate is zero.')
    }
    return (
      (Q = 1 / Q),
      (n[0] = T * Q),
      (n[1] = I * Q),
      (n[2] = N * Q),
      (n[3] = U * Q),
      (n[4] = L * Q),
      (n[5] = P * Q),
      (n[6] = W * Q),
      (n[7] = k * Q),
      (n[8] = B * Q),
      (n[9] = j * Q),
      (n[10] = X * Q),
      (n[11] = Z * Q),
      (n[12] = Y * Q),
      (n[13] = F * Q),
      (n[14] = G * Q),
      (n[15] = H * Q),
      n
    )
  }),
    (K.inverseTransformation = function (e, t) {
      var n = e[0],
        r = e[1],
        a = e[2],
        i = e[4],
        u = e[5],
        o = e[6],
        s = e[8],
        f = e[9],
        l = e[10],
        d = e[12],
        c = e[13],
        h = e[14],
        m = -n * d - r * c - a * h,
        y = -i * d - u * c - o * h,
        p = -s * d - f * c - l * h
      return (
        (t[0] = n),
        (t[1] = i),
        (t[2] = s),
        (t[3] = 0),
        (t[4] = r),
        (t[5] = u),
        (t[6] = f),
        (t[7] = 0),
        (t[8] = a),
        (t[9] = o),
        (t[10] = l),
        (t[11] = 0),
        (t[12] = m),
        (t[13] = y),
        (t[14] = p),
        (t[15] = 1),
        t
      )
    })
  var le = new K()
  function de(e, t, r, a) {
    ;(this.west = n.defaultValue(e, 0)), (this.south = n.defaultValue(t, 0)), (this.east = n.defaultValue(r, 0)), (this.north = n.defaultValue(a, 0))
  }
  ;(K.inverseTranspose = function (e, t) {
    return K.inverse(K.transpose(e, le), t)
  }),
    (K.IDENTITY = Object.freeze(new K(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1))),
    (K.ZERO = Object.freeze(new K(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0))),
    (K.COLUMN0ROW0 = 0),
    (K.COLUMN0ROW1 = 1),
    (K.COLUMN0ROW2 = 2),
    (K.COLUMN0ROW3 = 3),
    (K.COLUMN1ROW0 = 4),
    (K.COLUMN1ROW1 = 5),
    (K.COLUMN1ROW2 = 6),
    (K.COLUMN1ROW3 = 7),
    (K.COLUMN2ROW0 = 8),
    (K.COLUMN2ROW1 = 9),
    (K.COLUMN2ROW2 = 10),
    (K.COLUMN2ROW3 = 11),
    (K.COLUMN3ROW0 = 12),
    (K.COLUMN3ROW1 = 13),
    (K.COLUMN3ROW2 = 14),
    (K.COLUMN3ROW3 = 15),
    Object.defineProperties(K.prototype, {
      length: {
        get: function () {
          return K.packedLength
        }
      }
    }),
    (K.prototype.clone = function (e) {
      return K.clone(this, e)
    }),
    (K.prototype.equals = function (e) {
      return K.equals(this, e)
    }),
    (K.equalsArray = function (e, t, n) {
      return (
        e[0] === t[n] &&
        e[1] === t[n + 1] &&
        e[2] === t[n + 2] &&
        e[3] === t[n + 3] &&
        e[4] === t[n + 4] &&
        e[5] === t[n + 5] &&
        e[6] === t[n + 6] &&
        e[7] === t[n + 7] &&
        e[8] === t[n + 8] &&
        e[9] === t[n + 9] &&
        e[10] === t[n + 10] &&
        e[11] === t[n + 11] &&
        e[12] === t[n + 12] &&
        e[13] === t[n + 13] &&
        e[14] === t[n + 14] &&
        e[15] === t[n + 15]
      )
    }),
    (K.prototype.equalsEpsilon = function (e, t) {
      return K.equalsEpsilon(this, e, t)
    }),
    (K.prototype.toString = function () {
      return (
        '(' +
        this[0] +
        ', ' +
        this[4] +
        ', ' +
        this[8] +
        ', ' +
        this[12] +
        ')\n(' +
        this[1] +
        ', ' +
        this[5] +
        ', ' +
        this[9] +
        ', ' +
        this[13] +
        ')\n(' +
        this[2] +
        ', ' +
        this[6] +
        ', ' +
        this[10] +
        ', ' +
        this[14] +
        ')\n(' +
        this[3] +
        ', ' +
        this[7] +
        ', ' +
        this[11] +
        ', ' +
        this[15] +
        ')'
      )
    }),
    Object.defineProperties(de.prototype, {
      width: {
        get: function () {
          return de.computeWidth(this)
        }
      },
      height: {
        get: function () {
          return de.computeHeight(this)
        }
      }
    }),
    (de.packedLength = 4),
    (de.pack = function (e, t, r) {
      return (r = n.defaultValue(r, 0)), (t[r++] = e.west), (t[r++] = e.south), (t[r++] = e.east), (t[r] = e.north), t
    }),
    (de.unpack = function (e, t, r) {
      return (t = n.defaultValue(t, 0)), n.defined(r) || (r = new de()), (r.west = e[t++]), (r.south = e[t++]), (r.east = e[t++]), (r.north = e[t]), r
    }),
    (de.computeWidth = function (e) {
      var t = e.east,
        n = e.west
      return t < n && (t += r.CesiumMath.TWO_PI), t - n
    }),
    (de.computeHeight = function (e) {
      return e.north - e.south
    }),
    (de.fromDegrees = function (e, t, a, i, u) {
      return (
        (e = r.CesiumMath.toRadians(n.defaultValue(e, 0))),
        (t = r.CesiumMath.toRadians(n.defaultValue(t, 0))),
        (a = r.CesiumMath.toRadians(n.defaultValue(a, 0))),
        (i = r.CesiumMath.toRadians(n.defaultValue(i, 0))),
        n.defined(u) ? ((u.west = e), (u.south = t), (u.east = a), (u.north = i), u) : new de(e, t, a, i)
      )
    }),
    (de.fromRadians = function (e, t, r, a, i) {
      return n.defined(i)
        ? ((i.west = n.defaultValue(e, 0)), (i.south = n.defaultValue(t, 0)), (i.east = n.defaultValue(r, 0)), (i.north = n.defaultValue(a, 0)), i)
        : new de(e, t, r, a)
    }),
    (de.fromCartographicArray = function (e, t) {
      for (
        var a = Number.MAX_VALUE,
          i = -Number.MAX_VALUE,
          u = Number.MAX_VALUE,
          o = -Number.MAX_VALUE,
          s = Number.MAX_VALUE,
          f = -Number.MAX_VALUE,
          l = 0,
          d = e.length;
        l < d;
        l++
      ) {
        var c = e[l]
        ;(a = Math.min(a, c.longitude)), (i = Math.max(i, c.longitude)), (s = Math.min(s, c.latitude)), (f = Math.max(f, c.latitude))
        var h = c.longitude >= 0 ? c.longitude : c.longitude + r.CesiumMath.TWO_PI
        ;(u = Math.min(u, h)), (o = Math.max(o, h))
      }
      return (
        i - a > o - u && ((a = u), (i = o) > r.CesiumMath.PI && (i -= r.CesiumMath.TWO_PI), a > r.CesiumMath.PI && (a -= r.CesiumMath.TWO_PI)),
        n.defined(t) ? ((t.west = a), (t.south = s), (t.east = i), (t.north = f), t) : new de(a, s, i, f)
      )
    }),
    (de.fromCartesianArray = function (e, t, a) {
      t = n.defaultValue(t, O.WGS84)
      for (
        var i = Number.MAX_VALUE,
          u = -Number.MAX_VALUE,
          o = Number.MAX_VALUE,
          s = -Number.MAX_VALUE,
          f = Number.MAX_VALUE,
          l = -Number.MAX_VALUE,
          d = 0,
          c = e.length;
        d < c;
        d++
      ) {
        var h = t.cartesianToCartographic(e[d])
        ;(i = Math.min(i, h.longitude)), (u = Math.max(u, h.longitude)), (f = Math.min(f, h.latitude)), (l = Math.max(l, h.latitude))
        var m = h.longitude >= 0 ? h.longitude : h.longitude + r.CesiumMath.TWO_PI
        ;(o = Math.min(o, m)), (s = Math.max(s, m))
      }
      return (
        u - i > s - o && ((i = o), (u = s) > r.CesiumMath.PI && (u -= r.CesiumMath.TWO_PI), i > r.CesiumMath.PI && (i -= r.CesiumMath.TWO_PI)),
        n.defined(a) ? ((a.west = i), (a.south = f), (a.east = u), (a.north = l), a) : new de(i, f, u, l)
      )
    }),
    (de.clone = function (e, t) {
      if (n.defined(e))
        return n.defined(t)
          ? ((t.west = e.west), (t.south = e.south), (t.east = e.east), (t.north = e.north), t)
          : new de(e.west, e.south, e.east, e.north)
    }),
    (de.equalsEpsilon = function (e, t, r) {
      return (
        (r = n.defaultValue(r, 0)),
        e === t ||
          (n.defined(e) &&
            n.defined(t) &&
            Math.abs(e.west - t.west) <= r &&
            Math.abs(e.south - t.south) <= r &&
            Math.abs(e.east - t.east) <= r &&
            Math.abs(e.north - t.north) <= r)
      )
    }),
    (de.prototype.clone = function (e) {
      return de.clone(this, e)
    }),
    (de.prototype.equals = function (e) {
      return de.equals(this, e)
    }),
    (de.equals = function (e, t) {
      return e === t || (n.defined(e) && n.defined(t) && e.west === t.west && e.south === t.south && e.east === t.east && e.north === t.north)
    }),
    (de.prototype.equalsEpsilon = function (e, t) {
      return de.equalsEpsilon(this, e, t)
    }),
    (de.validate = function (e) {}),
    (de.southwest = function (e, t) {
      return n.defined(t) ? ((t.longitude = e.west), (t.latitude = e.south), (t.height = 0), t) : new p(e.west, e.south)
    }),
    (de.northwest = function (e, t) {
      return n.defined(t) ? ((t.longitude = e.west), (t.latitude = e.north), (t.height = 0), t) : new p(e.west, e.north)
    }),
    (de.northeast = function (e, t) {
      return n.defined(t) ? ((t.longitude = e.east), (t.latitude = e.north), (t.height = 0), t) : new p(e.east, e.north)
    }),
    (de.southeast = function (e, t) {
      return n.defined(t) ? ((t.longitude = e.east), (t.latitude = e.south), (t.height = 0), t) : new p(e.east, e.south)
    }),
    (de.center = function (e, t) {
      var a = e.east,
        i = e.west
      a < i && (a += r.CesiumMath.TWO_PI)
      var u = r.CesiumMath.negativePiToPi(0.5 * (i + a)),
        o = 0.5 * (e.south + e.north)
      return n.defined(t) ? ((t.longitude = u), (t.latitude = o), (t.height = 0), t) : new p(u, o)
    }),
    (de.intersection = function (e, t, a) {
      var i = e.east,
        u = e.west,
        o = t.east,
        s = t.west
      i < u && o > 0 ? (i += r.CesiumMath.TWO_PI) : o < s && i > 0 && (o += r.CesiumMath.TWO_PI),
        i < u && s < 0 ? (s += r.CesiumMath.TWO_PI) : o < s && u < 0 && (u += r.CesiumMath.TWO_PI)
      var f = r.CesiumMath.negativePiToPi(Math.max(u, s)),
        l = r.CesiumMath.negativePiToPi(Math.min(i, o))
      if (!((e.west < e.east || t.west < t.east) && l <= f)) {
        var d = Math.max(e.south, t.south),
          c = Math.min(e.north, t.north)
        if (!(d >= c)) return n.defined(a) ? ((a.west = f), (a.south = d), (a.east = l), (a.north = c), a) : new de(f, d, l, c)
      }
    }),
    (de.simpleIntersection = function (e, t, r) {
      var a = Math.max(e.west, t.west),
        i = Math.max(e.south, t.south),
        u = Math.min(e.east, t.east),
        o = Math.min(e.north, t.north)
      if (!(i >= o || a >= u)) return n.defined(r) ? ((r.west = a), (r.south = i), (r.east = u), (r.north = o), r) : new de(a, i, u, o)
    }),
    (de.union = function (e, t, a) {
      n.defined(a) || (a = new de())
      var i = e.east,
        u = e.west,
        o = t.east,
        s = t.west
      i < u && o > 0 ? (i += r.CesiumMath.TWO_PI) : o < s && i > 0 && (o += r.CesiumMath.TWO_PI),
        i < u && s < 0 ? (s += r.CesiumMath.TWO_PI) : o < s && u < 0 && (u += r.CesiumMath.TWO_PI)
      var f = r.CesiumMath.negativePiToPi(Math.min(u, s)),
        l = r.CesiumMath.negativePiToPi(Math.max(i, o))
      return (a.west = f), (a.south = Math.min(e.south, t.south)), (a.east = l), (a.north = Math.max(e.north, t.north)), a
    }),
    (de.expand = function (e, t, r) {
      return (
        n.defined(r) || (r = new de()),
        (r.west = Math.min(e.west, t.longitude)),
        (r.south = Math.min(e.south, t.latitude)),
        (r.east = Math.max(e.east, t.longitude)),
        (r.north = Math.max(e.north, t.latitude)),
        r
      )
    }),
    (de.contains = function (e, t) {
      var n = t.longitude,
        a = t.latitude,
        i = e.west,
        u = e.east
      return (
        u < i && ((u += r.CesiumMath.TWO_PI), n < 0 && (n += r.CesiumMath.TWO_PI)),
        (n > i || r.CesiumMath.equalsEpsilon(n, i, r.CesiumMath.EPSILON14)) &&
          (n < u || r.CesiumMath.equalsEpsilon(n, u, r.CesiumMath.EPSILON14)) &&
          a >= e.south &&
          a <= e.north
      )
    })
  var ce = new p()
  function he(e, t) {
    ;(this.x = n.defaultValue(e, 0)), (this.y = n.defaultValue(t, 0))
  }
  ;(de.subsample = function (e, t, a, i) {
    ;(t = n.defaultValue(t, O.WGS84)), (a = n.defaultValue(a, 0)), n.defined(i) || (i = [])
    var u = 0,
      o = e.north,
      s = e.south,
      f = e.east,
      l = e.west,
      d = ce
    ;(d.height = a),
      (d.longitude = l),
      (d.latitude = o),
      (i[u] = t.cartographicToCartesian(d, i[u])),
      u++,
      (d.longitude = f),
      (i[u] = t.cartographicToCartesian(d, i[u])),
      u++,
      (d.latitude = s),
      (i[u] = t.cartographicToCartesian(d, i[u])),
      u++,
      (d.longitude = l),
      (i[u] = t.cartographicToCartesian(d, i[u])),
      u++,
      (d.latitude = o < 0 ? o : s > 0 ? s : 0)
    for (var c = 1; c < 8; ++c)
      (d.longitude = -Math.PI + c * r.CesiumMath.PI_OVER_TWO), de.contains(e, d) && ((i[u] = t.cartographicToCartesian(d, i[u])), u++)
    return (
      0 === d.latitude &&
        ((d.longitude = l), (i[u] = t.cartographicToCartesian(d, i[u])), u++, (d.longitude = f), (i[u] = t.cartographicToCartesian(d, i[u])), u++),
      (i.length = u),
      i
    )
  }),
    (de.MAX_VALUE = Object.freeze(new de(-Math.PI, -r.CesiumMath.PI_OVER_TWO, Math.PI, r.CesiumMath.PI_OVER_TWO))),
    (he.fromElements = function (e, t, r) {
      return n.defined(r) ? ((r.x = e), (r.y = t), r) : new he(e, t)
    }),
    (he.clone = function (e, t) {
      if (n.defined(e)) return n.defined(t) ? ((t.x = e.x), (t.y = e.y), t) : new he(e.x, e.y)
    }),
    (he.fromCartesian3 = he.clone),
    (he.fromCartesian4 = he.clone),
    (he.packedLength = 2),
    (he.pack = function (e, t, r) {
      return (r = n.defaultValue(r, 0)), (t[r++] = e.x), (t[r] = e.y), t
    }),
    (he.unpack = function (e, t, r) {
      return (t = n.defaultValue(t, 0)), n.defined(r) || (r = new he()), (r.x = e[t++]), (r.y = e[t]), r
    }),
    (he.packArray = function (e, r) {
      var a = e.length,
        i = 2 * a
      if (n.defined(r)) {
        if (!Array.isArray(r) && r.length !== i)
          throw new t.DeveloperError('If result is a typed array, it must have exactly array.length * 2 elements')
        r.length !== i && (r.length = i)
      } else r = new Array(i)
      for (var u = 0; u < a; ++u) he.pack(e[u], r, 2 * u)
      return r
    }),
    (he.unpackArray = function (e, t) {
      var r = e.length
      n.defined(t) ? (t.length = r / 2) : (t = new Array(r / 2))
      for (var a = 0; a < r; a += 2) {
        var i = a / 2
        t[i] = he.unpack(e, a, t[i])
      }
      return t
    }),
    (he.fromArray = he.unpack),
    (he.maximumComponent = function (e) {
      return Math.max(e.x, e.y)
    }),
    (he.minimumComponent = function (e) {
      return Math.min(e.x, e.y)
    }),
    (he.minimumByComponent = function (e, t, n) {
      return (n.x = Math.min(e.x, t.x)), (n.y = Math.min(e.y, t.y)), n
    }),
    (he.maximumByComponent = function (e, t, n) {
      return (n.x = Math.max(e.x, t.x)), (n.y = Math.max(e.y, t.y)), n
    }),
    (he.magnitudeSquared = function (e) {
      return e.x * e.x + e.y * e.y
    }),
    (he.magnitude = function (e) {
      return Math.sqrt(he.magnitudeSquared(e))
    })
  var me = new he()
  ;(he.distance = function (e, t) {
    return he.subtract(e, t, me), he.magnitude(me)
  }),
    (he.distanceSquared = function (e, t) {
      return he.subtract(e, t, me), he.magnitudeSquared(me)
    }),
    (he.normalize = function (e, t) {
      var n = he.magnitude(e)
      return (t.x = e.x / n), (t.y = e.y / n), t
    }),
    (he.dot = function (e, t) {
      return e.x * t.x + e.y * t.y
    }),
    (he.cross = function (e, t) {
      return e.x * t.y - e.y * t.x
    }),
    (he.multiplyComponents = function (e, t, n) {
      return (n.x = e.x * t.x), (n.y = e.y * t.y), n
    }),
    (he.divideComponents = function (e, t, n) {
      return (n.x = e.x / t.x), (n.y = e.y / t.y), n
    }),
    (he.add = function (e, t, n) {
      return (n.x = e.x + t.x), (n.y = e.y + t.y), n
    }),
    (he.subtract = function (e, t, n) {
      return (n.x = e.x - t.x), (n.y = e.y - t.y), n
    }),
    (he.multiplyByScalar = function (e, t, n) {
      return (n.x = e.x * t), (n.y = e.y * t), n
    }),
    (he.divideByScalar = function (e, t, n) {
      return (n.x = e.x / t), (n.y = e.y / t), n
    }),
    (he.negate = function (e, t) {
      return (t.x = -e.x), (t.y = -e.y), t
    }),
    (he.abs = function (e, t) {
      return (t.x = Math.abs(e.x)), (t.y = Math.abs(e.y)), t
    })
  var ye = new he()
  he.lerp = function (e, t, n, r) {
    return he.multiplyByScalar(t, n, ye), (r = he.multiplyByScalar(e, 1 - n, r)), he.add(ye, r, r)
  }
  var pe = new he(),
    xe = new he()
  he.angleBetween = function (e, t) {
    return he.normalize(e, pe), he.normalize(t, xe), r.CesiumMath.acosClamped(he.dot(pe, xe))
  }
  var Me = new he()
  function we(e, t, r, a) {
    ;(this[0] = n.defaultValue(e, 0)), (this[1] = n.defaultValue(r, 0)), (this[2] = n.defaultValue(t, 0)), (this[3] = n.defaultValue(a, 0))
  }
  ;(he.mostOrthogonalAxis = function (e, t) {
    var n = he.normalize(e, Me)
    return he.abs(n, n), (t = n.x <= n.y ? he.clone(he.UNIT_X, t) : he.clone(he.UNIT_Y, t))
  }),
    (he.equals = function (e, t) {
      return e === t || (n.defined(e) && n.defined(t) && e.x === t.x && e.y === t.y)
    }),
    (he.equalsArray = function (e, t, n) {
      return e.x === t[n] && e.y === t[n + 1]
    }),
    (he.equalsEpsilon = function (e, t, a, i) {
      return e === t || (n.defined(e) && n.defined(t) && r.CesiumMath.equalsEpsilon(e.x, t.x, a, i) && r.CesiumMath.equalsEpsilon(e.y, t.y, a, i))
    }),
    (he.ZERO = Object.freeze(new he(0, 0))),
    (he.ONE = Object.freeze(new he(1, 1))),
    (he.UNIT_X = Object.freeze(new he(1, 0))),
    (he.UNIT_Y = Object.freeze(new he(0, 1))),
    (he.prototype.clone = function (e) {
      return he.clone(this, e)
    }),
    (he.prototype.equals = function (e) {
      return he.equals(this, e)
    }),
    (he.prototype.equalsEpsilon = function (e, t, n) {
      return he.equalsEpsilon(this, e, t, n)
    }),
    (he.prototype.toString = function () {
      return '(' + this.x + ', ' + this.y + ')'
    }),
    (we.packedLength = 4),
    (we.pack = function (e, t, r) {
      return (r = n.defaultValue(r, 0)), (t[r++] = e[0]), (t[r++] = e[1]), (t[r++] = e[2]), (t[r++] = e[3]), t
    }),
    (we.unpack = function (e, t, r) {
      return (t = n.defaultValue(t, 0)), n.defined(r) || (r = new we()), (r[0] = e[t++]), (r[1] = e[t++]), (r[2] = e[t++]), (r[3] = e[t++]), r
    }),
    (we.clone = function (e, t) {
      if (n.defined(e)) return n.defined(t) ? ((t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), (t[3] = e[3]), t) : new we(e[0], e[2], e[1], e[3])
    }),
    (we.fromArray = function (e, t, r) {
      return (t = n.defaultValue(t, 0)), n.defined(r) || (r = new we()), (r[0] = e[t]), (r[1] = e[t + 1]), (r[2] = e[t + 2]), (r[3] = e[t + 3]), r
    }),
    (we.fromColumnMajorArray = function (e, t) {
      return we.clone(e, t)
    }),
    (we.fromRowMajorArray = function (e, t) {
      return n.defined(t) ? ((t[0] = e[0]), (t[1] = e[2]), (t[2] = e[1]), (t[3] = e[3]), t) : new we(e[0], e[1], e[2], e[3])
    }),
    (we.fromScale = function (e, t) {
      return n.defined(t) ? ((t[0] = e.x), (t[1] = 0), (t[2] = 0), (t[3] = e.y), t) : new we(e.x, 0, 0, e.y)
    }),
    (we.fromUniformScale = function (e, t) {
      return n.defined(t) ? ((t[0] = e), (t[1] = 0), (t[2] = 0), (t[3] = e), t) : new we(e, 0, 0, e)
    }),
    (we.fromRotation = function (e, t) {
      var r = Math.cos(e),
        a = Math.sin(e)
      return n.defined(t) ? ((t[0] = r), (t[1] = a), (t[2] = -a), (t[3] = r), t) : new we(r, -a, a, r)
    }),
    (we.toArray = function (e, t) {
      return n.defined(t) ? ((t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), (t[3] = e[3]), t) : [e[0], e[1], e[2], e[3]]
    }),
    (we.getElementIndex = function (e, t) {
      return 2 * e + t
    }),
    (we.getColumn = function (e, t, n) {
      var r = 2 * t,
        a = e[r],
        i = e[r + 1]
      return (n.x = a), (n.y = i), n
    }),
    (we.setColumn = function (e, t, n, r) {
      var a = 2 * t
      return ((r = we.clone(e, r))[a] = n.x), (r[a + 1] = n.y), r
    }),
    (we.getRow = function (e, t, n) {
      var r = e[t],
        a = e[t + 2]
      return (n.x = r), (n.y = a), n
    }),
    (we.setRow = function (e, t, n, r) {
      return ((r = we.clone(e, r))[t] = n.x), (r[t + 2] = n.y), r
    })
  var ge = new he()
  we.getScale = function (e, t) {
    return (t.x = he.magnitude(he.fromElements(e[0], e[1], ge))), (t.y = he.magnitude(he.fromElements(e[2], e[3], ge))), t
  }
  var ve = new he()
  ;(we.getMaximumScale = function (e) {
    return we.getScale(e, ve), he.maximumComponent(ve)
  }),
    (we.multiply = function (e, t, n) {
      var r = e[0] * t[0] + e[2] * t[1],
        a = e[0] * t[2] + e[2] * t[3],
        i = e[1] * t[0] + e[3] * t[1],
        u = e[1] * t[2] + e[3] * t[3]
      return (n[0] = r), (n[1] = i), (n[2] = a), (n[3] = u), n
    }),
    (we.add = function (e, t, n) {
      return (n[0] = e[0] + t[0]), (n[1] = e[1] + t[1]), (n[2] = e[2] + t[2]), (n[3] = e[3] + t[3]), n
    }),
    (we.subtract = function (e, t, n) {
      return (n[0] = e[0] - t[0]), (n[1] = e[1] - t[1]), (n[2] = e[2] - t[2]), (n[3] = e[3] - t[3]), n
    }),
    (we.multiplyByVector = function (e, t, n) {
      var r = e[0] * t.x + e[2] * t.y,
        a = e[1] * t.x + e[3] * t.y
      return (n.x = r), (n.y = a), n
    }),
    (we.multiplyByScalar = function (e, t, n) {
      return (n[0] = e[0] * t), (n[1] = e[1] * t), (n[2] = e[2] * t), (n[3] = e[3] * t), n
    }),
    (we.multiplyByScale = function (e, t, n) {
      return (n[0] = e[0] * t.x), (n[1] = e[1] * t.x), (n[2] = e[2] * t.y), (n[3] = e[3] * t.y), n
    }),
    (we.negate = function (e, t) {
      return (t[0] = -e[0]), (t[1] = -e[1]), (t[2] = -e[2]), (t[3] = -e[3]), t
    }),
    (we.transpose = function (e, t) {
      var n = e[0],
        r = e[2],
        a = e[1],
        i = e[3]
      return (t[0] = n), (t[1] = r), (t[2] = a), (t[3] = i), t
    }),
    (we.abs = function (e, t) {
      return (t[0] = Math.abs(e[0])), (t[1] = Math.abs(e[1])), (t[2] = Math.abs(e[2])), (t[3] = Math.abs(e[3])), t
    }),
    (we.equals = function (e, t) {
      return e === t || (n.defined(e) && n.defined(t) && e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3])
    }),
    (we.equalsArray = function (e, t, n) {
      return e[0] === t[n] && e[1] === t[n + 1] && e[2] === t[n + 2] && e[3] === t[n + 3]
    }),
    (we.equalsEpsilon = function (e, t, r) {
      return (
        (r = n.defaultValue(r, 0)),
        e === t ||
          (n.defined(e) &&
            n.defined(t) &&
            Math.abs(e[0] - t[0]) <= r &&
            Math.abs(e[1] - t[1]) <= r &&
            Math.abs(e[2] - t[2]) <= r &&
            Math.abs(e[3] - t[3]) <= r)
      )
    }),
    (we.IDENTITY = Object.freeze(new we(1, 0, 0, 1))),
    (we.ZERO = Object.freeze(new we(0, 0, 0, 0))),
    (we.COLUMN0ROW0 = 0),
    (we.COLUMN0ROW1 = 1),
    (we.COLUMN1ROW0 = 2),
    (we.COLUMN1ROW1 = 3),
    Object.defineProperties(we.prototype, {
      length: {
        get: function () {
          return we.packedLength
        }
      }
    }),
    (we.prototype.clone = function (e) {
      return we.clone(this, e)
    }),
    (we.prototype.equals = function (e) {
      return we.equals(this, e)
    }),
    (we.prototype.equalsEpsilon = function (e, t) {
      return we.equalsEpsilon(this, e, t)
    }),
    (we.prototype.toString = function () {
      return '(' + this[0] + ', ' + this[2] + ')\n(' + this[1] + ', ' + this[3] + ')'
    }),
    (e.Cartesian2 = he),
    (e.Cartesian3 = a),
    (e.Cartesian4 = D),
    (e.Cartographic = p),
    (e.Ellipsoid = O),
    (e.Matrix2 = we),
    (e.Matrix3 = A),
    (e.Matrix4 = K),
    (e.Rectangle = de)
})
