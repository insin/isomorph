;(function() {
  var modules = {}
  function require(name) {
    return modules[name]
  }
  require.define = function(name, fn) {
    var module = {}
      , exports = {}
    module.exports = exports
    fn(module, exports, require)
    modules[name] = module.exports
  }
require.define('./is', function(module, exports, require) {
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

require.define('./format', function(module, exports, require) {
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
})

require.define('./func', function(module, exports, require) {
var slice = Array.prototype.slice

/**
 * Binds a function with a calling context and (optionally) some partially
 * applied arguments.
 */
function bind(fn, ctx) {
  var partial = null
  if (arguments.length > 2) {
    partial = slice.call(arguments, 2)
  }
  var f = function() {
    if (partial) {
      return fn.apply(ctx, partial.concat(slice.call(arguments)))
    }
    return fn.apply(ctx, arguments)
  }
  f.func = fn
  f.boundTo = ctx
  return f
}

module.exports = {
  bind: bind
}
})

require.define('./object', function(module, exports, require) {
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
})

require.define('./re', function(module, exports, require) {
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

require.define('isomorph', function(module, exports, require) {
exports.version = '0.0.3'

exports.is = require('./is')
exports.func = require('./func')
exports.object = require('./object')
exports.format = require('./format')
exports.re = require('./re')
})

  window['isomorph'] = require('isomorph')
})()