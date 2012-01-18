/**
 * Copies own properties from one object to another.
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

/**
 * Makes a constructor inherit another constructor's prototype without
 * having to actually use the constructor.
 */
function inherits(childConstructor, parentConstructor) {
  var F = function() {}
  F.prototype = parentConstructor.prototype
  childConstructor.prototype = new F()
  childConstructor.prototype.constructor = childConstructor
  return childConstructor
}

module.exports = {
  extend: extend
, inherits: inherits
}