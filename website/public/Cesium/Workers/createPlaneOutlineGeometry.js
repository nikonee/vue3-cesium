define([
  './when-4bbc8319',
  './Transforms-d13cc04e',
  './Matrix2-9aa31791',
  './RuntimeError-346a3079',
  './ComponentDatatype-93750d1a',
  './GeometryAttribute-43536dc0',
  './GeometryAttributes-7827a6c2',
  './combine-83860057',
  './WebGLConstants-1c8239cc'
], function (e, t, n, r, a, i, o, c, u) {
  'use strict'
  function y() {
    this._workerName = 'createPlaneOutlineGeometry'
  }
  ;(y.packedLength = 0),
    (y.pack = function (e, t) {
      return t
    }),
    (y.unpack = function (t, n, r) {
      return e.defined(r) ? r : new y()
    })
  var m = new n.Cartesian3(-0.5, -0.5, 0),
    s = new n.Cartesian3(0.5, 0.5, 0)
  return (
    (y.createGeometry = function () {
      var e = new o.GeometryAttributes(),
        r = new Uint16Array(8),
        c = new Float64Array(12)
      return (
        (c[0] = m.x),
        (c[1] = m.y),
        (c[2] = m.z),
        (c[3] = s.x),
        (c[4] = m.y),
        (c[5] = m.z),
        (c[6] = s.x),
        (c[7] = s.y),
        (c[8] = m.z),
        (c[9] = m.x),
        (c[10] = s.y),
        (c[11] = m.z),
        (e.position = new i.GeometryAttribute({ componentDatatype: a.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: c })),
        (r[0] = 0),
        (r[1] = 1),
        (r[2] = 1),
        (r[3] = 2),
        (r[4] = 2),
        (r[5] = 3),
        (r[6] = 3),
        (r[7] = 0),
        new i.Geometry({
          attributes: e,
          indices: r,
          primitiveType: i.PrimitiveType.LINES,
          boundingSphere: new t.BoundingSphere(n.Cartesian3.ZERO, Math.sqrt(2))
        })
      )
    }),
    function (t, n) {
      return e.defined(n) && (t = y.unpack(t, n)), y.createGeometry(t)
    }
  )
})
