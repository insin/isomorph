var is = require('./is')
  , slice = Array.prototype.slice
  , formatRegExp = /%s/g
  , formatObjRegExp = /{(\w+)}/g

/**
 * Replaces %s placeholders in a string with positional arguments.
 */
function format(s) {
  return formatArr(s, slice.call(arguments, 1))
}

/**
 * Replaces %s placeholders in a string with array contents.
 */
function formatArr(s, a) {
  var i = 0
  return s.replace(formatRegExp, function() { return a[i++] })
}

/**
 * Replaces {prop} placeholders in a string with object properties.
 */
function formatObj(s, o) {
  return s.replace(formatObjRegExp, function(m, p) { return o[p] })
}

module.exports = {
  format: format
, formatArr: formatArr
, formatObj: formatObj
}
