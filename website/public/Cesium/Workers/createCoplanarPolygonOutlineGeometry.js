define([
  './arrayRemoveDuplicates-18786327',
  './Transforms-d13cc04e',
  './Matrix2-9aa31791',
  './RuntimeError-346a3079',
  './ComponentDatatype-93750d1a',
  './CoplanarPolygonGeometryLibrary-551fa870',
  './when-4bbc8319',
  './GeometryAttribute-43536dc0',
  './GeometryAttributes-7827a6c2',
  './GeometryInstance-47b34185',
  './GeometryPipeline-2356afec',
  './IndexDatatype-b7d979a6',
  './PolygonGeometryLibrary-dec9574a',
  './combine-83860057',
  './WebGLConstants-1c8239cc',
  './OrientedBoundingBox-4b932f63',
  './EllipsoidTangentPlane-eecce7e8',
  './AxisAlignedBoundingBox-07c6b7f2',
  './IntersectionTests-96a04219',
  './Plane-318d6937',
  './AttributeCompression-af389d04',
  './EncodedCartesian3-f286cedc',
  './ArcType-98ec98bf',
  './EllipsoidRhumbLine-30c47ff4',
  './PolygonPipeline-da7fc5ca'
], function (e, t, r, n, o, i, a, y, c, l, p, s, u, d, m, g, f, b, h, P, G, v, L, T, E) {
  'use strict'
  function A(e) {
    for (var t = e.length, r = new Float64Array(3 * t), n = s.IndexDatatype.createTypedArray(t, 2 * t), i = 0, a = 0, l = 0; l < t; l++) {
      var p = e[l]
      ;(r[i++] = p.x), (r[i++] = p.y), (r[i++] = p.z), (n[a++] = l), (n[a++] = (l + 1) % t)
    }
    var u = new c.GeometryAttributes({
      position: new y.GeometryAttribute({ componentDatatype: o.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: r })
    })
    return new y.Geometry({ attributes: u, indices: n, primitiveType: y.PrimitiveType.LINES })
  }
  function C(e) {
    var t = (e = a.defaultValue(e, a.defaultValue.EMPTY_OBJECT)).polygonHierarchy
    ;(this._polygonHierarchy = t),
      (this._workerName = 'createCoplanarPolygonOutlineGeometry'),
      (this.packedLength = u.PolygonGeometryLibrary.computeHierarchyPackedLength(t) + 1)
  }
  ;(C.fromPositions = function (e) {
    return new C({ polygonHierarchy: { positions: (e = a.defaultValue(e, a.defaultValue.EMPTY_OBJECT)).positions } })
  }),
    (C.pack = function (e, t, r) {
      return (r = a.defaultValue(r, 0)), (t[(r = u.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy, t, r))] = e.packedLength), t
    })
  var H = { polygonHierarchy: {} }
  return (
    (C.unpack = function (e, t, r) {
      t = a.defaultValue(t, 0)
      var n = u.PolygonGeometryLibrary.unpackPolygonHierarchy(e, t)
      ;(t = n.startingIndex), delete n.startingIndex
      var o = e[t]
      return a.defined(r) || (r = new C(H)), (r._polygonHierarchy = n), (r.packedLength = o), r
    }),
    (C.createGeometry = function (n) {
      var o = n._polygonHierarchy,
        a = o.positions
      if (!((a = e.arrayRemoveDuplicates(a, r.Cartesian3.equalsEpsilon, !0)).length < 3) && i.CoplanarPolygonGeometryLibrary.validOutline(a)) {
        var c = u.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(o, !1)
        if (0 !== c.length) {
          for (var s = [], d = 0; d < c.length; d++) {
            var m = new l.GeometryInstance({ geometry: A(c[d]) })
            s.push(m)
          }
          var g = p.GeometryPipeline.combineInstances(s)[0],
            f = t.BoundingSphere.fromPoints(o.positions)
          return new y.Geometry({ attributes: g.attributes, indices: g.indices, primitiveType: g.primitiveType, boundingSphere: f })
        }
      }
    }),
    function (e, t) {
      return a.defined(t) && (e = C.unpack(e, t)), (e._ellipsoid = r.Ellipsoid.clone(e._ellipsoid)), C.createGeometry(e)
    }
  )
})
