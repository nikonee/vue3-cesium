define([
  './when-4bbc8319',
  './Matrix2-9aa31791',
  './RuntimeError-346a3079',
  './EllipsoidOutlineGeometry-44f0c12f',
  './ComponentDatatype-93750d1a',
  './WebGLConstants-1c8239cc',
  './GeometryOffsetAttribute-1772960d',
  './Transforms-d13cc04e',
  './combine-83860057',
  './GeometryAttribute-43536dc0',
  './GeometryAttributes-7827a6c2',
  './IndexDatatype-b7d979a6'
], function (i, e, t, r, n, o, s, a, d, l, c, u) {
  'use strict'
  function m(t) {
    var n = i.defaultValue(t.radius, 1),
      o = { radii: new e.Cartesian3(n, n, n), stackPartitions: t.stackPartitions, slicePartitions: t.slicePartitions, subdivisions: t.subdivisions }
    ;(this._ellipsoidGeometry = new r.EllipsoidOutlineGeometry(o)), (this._workerName = 'createSphereOutlineGeometry')
  }
  ;(m.packedLength = r.EllipsoidOutlineGeometry.packedLength),
    (m.pack = function (i, e, t) {
      return r.EllipsoidOutlineGeometry.pack(i._ellipsoidGeometry, e, t)
    })
  var p = new r.EllipsoidOutlineGeometry(),
    y = { radius: void 0, radii: new e.Cartesian3(), stackPartitions: void 0, slicePartitions: void 0, subdivisions: void 0 }
  return (
    (m.unpack = function (t, n, o) {
      var s = r.EllipsoidOutlineGeometry.unpack(t, n, p)
      return (
        (y.stackPartitions = s._stackPartitions),
        (y.slicePartitions = s._slicePartitions),
        (y.subdivisions = s._subdivisions),
        i.defined(o)
          ? (e.Cartesian3.clone(s._radii, y.radii), (o._ellipsoidGeometry = new r.EllipsoidOutlineGeometry(y)), o)
          : ((y.radius = s._radii.x), new m(y))
      )
    }),
    (m.createGeometry = function (i) {
      return r.EllipsoidOutlineGeometry.createGeometry(i._ellipsoidGeometry)
    }),
    function (e, t) {
      return i.defined(t) && (e = m.unpack(e, t)), m.createGeometry(e)
    }
  )
})
