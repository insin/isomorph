/**
 * isomorph 0.1.6 - https://github.com/insin/isomorph
 * MIT Licensed
 */
;(function() {
  var modules = {}
  function require(name) {
    return modules[name]
  }
  require.define = function(rs, fn) {
    var module = {}
      , exports = {}
    module.exports = exports
    fn(module, exports, require)
    if (Object.prototype.toString.call(rs) == '[object Array]') {
      for (var i = 0, l = rs.length; i < l; i++) {
        modules[rs[i]] = module.exports
      }
    }
    else {
      modules[rs] = module.exports
    }
  }

require.define("./is", function(module, exports, require) {
var toString = Object.prototype.toString

// Type checks

function isArray(o) {
  return toString.call(o) == '[object Array]'
}

function isBoolean(o) {
  return toString.call(o) == '[object Boolean]'
}

function isDate(o) {
  return toString.call(o) == '[object Date]'
}

function isError(o) {
  return toString.call(o) == '[object Error]'
}

function isFunction(o) {
  return toString.call(o) == '[object Function]'
}

function isNumber(o) {
  return toString.call(o) == '[object Number]'
}

function isObject(o) {
  return toString.call(o) == '[object Object]'
}

function isRegExp(o) {
  return toString.call(o) == '[object RegExp]'
}

function isString(o) {
  return toString.call(o) == '[object String]'
}

// Content checks

function isEmpty(o) {
  for (var prop in o) {
    return false
  }
  return true
}

module.exports = {
  Array: isArray
, Boolean: isBoolean
, Date: isDate
, Empty: isEmpty
, Error: isError
, Function: isFunction
, NaN: isNaN
, Number: isNumber
, Object: isObject
, RegExp: isRegExp
, String: isString
}
})

require.define("./array", function(module, exports, require) {
var is = require('./is')

var splice = Array.prototype.splice

/**
 * Flattens an Array in-place, replacing any Arrays it contains with their
 * contents, and flattening their contents in turn.
 */
function flatten(arr) {
  for (var i = 0, l = arr.length, current; i < l; i++) {
    current = arr[i]
    if (is.Array(current)) {
      // Make sure we loop to the Array's new length
      l += current.length - 1
      // Replace the current item with its contents
      splice.apply(arr, [i, 1].concat(current))
      // Stay on the current index so we continue looping at the first
      // element of the array we just spliced in or removed.
      i--
    }
  }
  // We flattened in-place, but return for chaining
  return arr
}

module.exports = {
  flatten: flatten
}
})

require.define("./format", function(module, exports, require) {
var is = require('./is')
  , slice = Array.prototype.slice
  , formatRegExp = /%[%s]/g
  , formatObjRegExp = /({{?)(\w+)}/g

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
  return s.replace(formatRegExp, function(m) { return m == '%%' ? '%' : a[i++] })
}

/**
 * Replaces {propertyName} placeholders in a string with object properties.
 */
function formatObj(s, o) {
  return s.replace(formatObjRegExp, function(m, b, p) { return b.length == 2 ? m.slice(1) : o[p] })
}

module.exports = {
  format: format
, formatArr: formatArr
, formatObj: formatObj
}
})

require.define("./func", function(module, exports, require) {
var slice = Array.prototype.slice

/**
 * Binds a function with a call context and (optionally) some partially applied
 * arguments.
 */
function bind(fn, ctx) {
  var partial = (arguments.length > 2 ? slice.call(arguments, 2) : null)
  var f = function() {
    var args = (partial ? partial.concat(slice.call(arguments)) : arguments)
    return fn.apply(ctx, args)
  }
  f.__func__ = fn
  f.__context__ = ctx
  return f
}

module.exports = {
  bind: bind
}
})

require.define("./object", function(module, exports, require) {
/**
 * Callbound version of Object.prototype.hasOwnProperty(), ready to be called
 * with an object and property name.
 */
var hasOwn = Function.prototype.call.bind(Object.prototype.hasOwnProperty)

/**
 * Copies own properties from any given objects to a destination object.
 */
function extend(dest) {
  for (var i = 1, l = arguments.length, src; i < l; i++) {
    src = arguments[i]
    if (src) {
      for (var prop in src) {
        if (hasOwn(src, prop)) {
          dest[prop] = src[prop]
        }
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

/**
 * Creates an Array of [property, value] pairs from an Object.
 */
function items(obj) {
  var items = []
  for (var prop in obj) {
    if (hasOwn(obj, prop)) {
      items.push([prop, obj[prop]])
    }
  }
  return items
}

/**
 * Creates an Object from an Array of [property, value] pairs.
 */
function fromItems(items) {
  var obj = {}
  for (var i = 0, l = items.length, item; i < l; i++) {
    item = items[i]
    obj[item[0]] = item[1]
  }
  return obj
}

/**
 * Creates a lookup Object from an Array, coercing each item to a String.
 */
function lookup(arr) {
  var obj = {}
  for (var i = 0, l = arr.length; i < l; i++) {
    obj[''+arr[i]] = true
  }
  return obj
}

module.exports = {
  hasOwn: hasOwn
, extend: extend
, inherits: inherits
, items: items
, fromItems: fromItems
, lookup: lookup
}
})

require.define("./re", function(module, exports, require) {
var is = require('./is')

/**
 * Finds all matches againt a RegExp, returning captured groups if present.
 */
function findAll(re, str, flags) {
  if (!is.RegExp(re)) {
    re = new RegExp(re, flags)
  }
  var match = null
    , matches = []
  while ((match = re.exec(str)) !== null) {
    switch (match.length) {
      case 1:
        matches.push(match[0])
        break
      case 2:
        matches.push(match[1])
        break
      default:
        matches.push(match.slice(1))
    }
    if (!re.global) {
      break
    }
  }
  return matches
}

module.exports = {
  findAll: findAll
}
})

require.define("./querystring", function(module, exports, require) {
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
})

require.define("isomorph", function(module, exports, require) {
exports.version = '0.1.5'

exports.is = require('./is')
exports.array = require('./array')
exports.func = require('./func')
exports.object = require('./object')
exports.format = require('./format')
exports.re = require('./re')
exports.querystring = require('./querystring')
})

window['isomorph'] = require('isomorph')

})();