;(function(__global__, server) {

var is = server ? require('./is') : __global__.is
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

var api = {
  format: format
, formatArr: formatArr
, formatObj: formatObj
}

if (server) {
  module.exports = api
}
else {
  __global__.format = api
}

})(this, !!(typeof module != 'undefined' && module.exports))
