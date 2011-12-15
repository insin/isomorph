;(function(__global__, server) {

/**
 * Copies properties from one object to another.
 */
function extend(dest, src) {
  if (src) {
    for (var prop in src) {
      if (src.hasOwnProperty(prop)) {
        dest[prop] = src[prop]
      }
    }
  }
  return dest
}

var api = {
  extend: extend
}

if (server) {
  module.exports = api
}
else {
  __global__.object = api
}

})(this, !!(typeof module != 'undefined' && module.exports))
