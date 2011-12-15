;(function(__global__, server) {

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

var api = {
  bind: bind
}

if (server) {
  module.exports = api
}
else {
  __global__.func = api
}

})(this, !!(typeof module != 'undefined' && module.exports))
