define([
  './BoxGeometry-bdb0d59d',
  './when-4bbc8319',
  './GeometryOffsetAttribute-1772960d',
  './RuntimeError-346a3079',
  './Transforms-d13cc04e',
  './Matrix2-9aa31791',
  './ComponentDatatype-93750d1a',
  './WebGLConstants-1c8239cc',
  './combine-83860057',
  './GeometryAttribute-43536dc0',
  './GeometryAttributes-7827a6c2',
  './VertexFormat-71718faa'
], function (e, t, r, o, n, a, c, m, i, d, u, b) {
  'use strict'
  return function (r, o) {
    return t.defined(o) && (r = e.BoxGeometry.unpack(r, o)), e.BoxGeometry.createGeometry(r)
  }
})
