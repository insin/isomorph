'use strict';

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
