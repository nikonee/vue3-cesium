'undefined' == typeof self && (self = {}),
  (self.onmessage = function (e) {
    var s = e.data.array,
      a = self.webkitPostMessage || self.postMessage
    try {
      a({ array: s }, [s.buffer])
    } catch (e) {
      a({})
    }
  })
