define(['exports', './when-4bbc8319', './RuntimeError-346a3079', './ComponentDatatype-93750d1a', './WebGLConstants-1c8239cc'], function (
  e,
  r,
  t,
  n,
  E
) {
  'use strict'
  var N = {
      UNSIGNED_BYTE: E.WebGLConstants.UNSIGNED_BYTE,
      UNSIGNED_SHORT: E.WebGLConstants.UNSIGNED_SHORT,
      UNSIGNED_INT: E.WebGLConstants.UNSIGNED_INT,
      getSizeInBytes: function (e) {
        switch (e) {
          case N.UNSIGNED_BYTE:
            return Uint8Array.BYTES_PER_ELEMENT
          case N.UNSIGNED_SHORT:
            return Uint16Array.BYTES_PER_ELEMENT
          case N.UNSIGNED_INT:
            return Uint32Array.BYTES_PER_ELEMENT
        }
      },
      fromSizeInBytes: function (e) {
        switch (e) {
          case 2:
            return N.UNSIGNED_SHORT
          case 4:
            return N.UNSIGNED_INT
          case 1:
            return N.UNSIGNED_BYTE
        }
      },
      validate: function (e) {
        return r.defined(e) && (e === N.UNSIGNED_BYTE || e === N.UNSIGNED_SHORT || e === N.UNSIGNED_INT)
      },
      createTypedArray: function (e, r) {
        return e >= n.CesiumMath.SIXTY_FOUR_KILOBYTES ? new Uint32Array(r) : new Uint16Array(r)
      },
      createTypedArrayFromArrayBuffer: function (e, r, t, E) {
        return e >= n.CesiumMath.SIXTY_FOUR_KILOBYTES ? new Uint32Array(r, t, E) : new Uint16Array(r, t, E)
      }
    },
    a = Object.freeze(N)
  e.IndexDatatype = a
})
