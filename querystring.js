'use strict';

var is = require('./is')

/**
 * Creates an Object from a query string, providing values for names which are
 * present more than once as an Array.
 */
function parse(query) {
  var obj = {}
  if (query.length < 2) {
    return obj
  }
  var params = query.substring(1).split('&')
  for (var i = 0, l = params.length; i < l; i++) {
    var parts = params[i].split('=')
      , name = parts[0]
      , value = decodeURIComponent(parts[1])
    if (obj.hasOwnProperty(name)) {
      if (is.Array(obj[name])) {
        obj[name].push(value)
      }
      else {
        obj[name] = [obj[name], value]
      }
    }
    else {
      obj[name] = value
    }
  }
  return obj
}

/**
 * Creates a query string from an Object, expecting names with multiple values
 * to be specified as an Array.
 */
function stringify(obj) {
  var params = []
  for (var name in obj) {
    if (is.Array(obj[name])) {
      for (var a = obj[name], i = 0, l = a.length; i < l; i++) {
        params.push(name + '=' + encodeURIComponent(a[i]))
      }
    }
    else {
      params.push(name + '=' + encodeURIComponent(obj[name]))
    }
  }
  return params.join('&')
}

module.exports = {
  parse: parse
, stringify: stringify
}
