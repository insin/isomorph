'use strict';

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
