define(['exports', './Matrix2-9aa31791', './RuntimeError-346a3079', './when-4bbc8319', './ComponentDatatype-93750d1a'], function (n, a, e, t, r) {
  'use strict'
  function i(n, e) {
    ;(this.normal = a.Cartesian3.clone(n)), (this.distance = e)
  }
  i.fromPointNormal = function (n, e, r) {
    var s = -a.Cartesian3.dot(e, n)
    return t.defined(r) ? (a.Cartesian3.clone(e, r.normal), (r.distance = s), r) : new i(e, s)
  }
  var s = new a.Cartesian3()
  ;(i.fromCartesian4 = function (n, e) {
    var r = a.Cartesian3.fromCartesian4(n, s),
      o = n.w
    return t.defined(e) ? (a.Cartesian3.clone(r, e.normal), (e.distance = o), e) : new i(r, o)
  }),
    (i.getPointDistance = function (n, e) {
      return a.Cartesian3.dot(n.normal, e) + n.distance
    })
  var o = new a.Cartesian3()
  i.projectPointOntoPlane = function (n, e, r) {
    t.defined(r) || (r = new a.Cartesian3())
    var s = i.getPointDistance(n, e),
      c = a.Cartesian3.multiplyByScalar(n.normal, s, o)
    return a.Cartesian3.subtract(e, c, r)
  }
  var c = new a.Matrix4(),
    l = new a.Cartesian4(),
    C = new a.Cartesian3()
  ;(i.transform = function (n, e, t) {
    var r = n.normal,
      s = n.distance,
      o = a.Matrix4.inverseTranspose(e, c),
      d = a.Cartesian4.fromElements(r.x, r.y, r.z, s, l)
    d = a.Matrix4.multiplyByVector(o, d, d)
    var m = a.Cartesian3.fromCartesian4(d, C)
    return (d = a.Cartesian4.divideByScalar(d, a.Cartesian3.magnitude(m), d)), i.fromCartesian4(d, t)
  }),
    (i.clone = function (n, e) {
      return t.defined(e) ? (a.Cartesian3.clone(n.normal, e.normal), (e.distance = n.distance), e) : new i(n.normal, n.distance)
    }),
    (i.equals = function (n, e) {
      return n.distance === e.distance && a.Cartesian3.equals(n.normal, e.normal)
    }),
    (i.ORIGIN_XY_PLANE = Object.freeze(new i(a.Cartesian3.UNIT_Z, 0))),
    (i.ORIGIN_YZ_PLANE = Object.freeze(new i(a.Cartesian3.UNIT_X, 0))),
    (i.ORIGIN_ZX_PLANE = Object.freeze(new i(a.Cartesian3.UNIT_Y, 0))),
    (n.Plane = i)
})
