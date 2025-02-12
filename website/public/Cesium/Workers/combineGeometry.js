define([
  './PrimitivePipeline-fc555140',
  './createTaskProcessorWorker',
  './Transforms-d13cc04e',
  './Matrix2-9aa31791',
  './RuntimeError-346a3079',
  './when-4bbc8319',
  './ComponentDatatype-93750d1a',
  './WebGLConstants-1c8239cc',
  './combine-83860057',
  './GeometryAttribute-43536dc0',
  './GeometryAttributes-7827a6c2',
  './GeometryPipeline-2356afec',
  './AttributeCompression-af389d04',
  './EncodedCartesian3-f286cedc',
  './IndexDatatype-b7d979a6',
  './IntersectionTests-96a04219',
  './Plane-318d6937',
  './WebMercatorProjection-58801a11'
], function (e, t, i, r, n, a, o, c, m, s, P, b, d, p, u, f, y, l) {
  'use strict'
  return t(function (t, i) {
    var r = e.PrimitivePipeline.unpackCombineGeometryParameters(t),
      n = e.PrimitivePipeline.combineGeometry(r)
    return e.PrimitivePipeline.packCombineGeometryResults(n, i)
  })
})
