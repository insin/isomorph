/**
 * Asserts that a function call throws an error with a given error message.
 */
function errorEqual(func, message) {
  raises(func,
         function(e) { return e.message == message },
         'Error message is: "' + message.replace(/"/g, '\\"') + '"')
}

if (typeof module != 'undefined' && module.exports) {
  module.exports = {
    errorEqual: errorEqual
  }
}
