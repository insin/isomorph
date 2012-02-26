QUnit.module('isomorph/lib/func')

void function() {

var func = isomorph.func

QUnit.test('func.bind', function() {
  var f = function() {
    return [this.test].concat(Array.prototype.slice.call(arguments)).join(',')
  }
  var ctx = { test: 'test' }
  var bound = func.bind(f, ctx)
  strictEqual(bound.__func__, f, 'Bound function accessible via __func__')
  strictEqual(bound.__context__, ctx, 'Bound context accessible via __context__')
  strictEqual(bound(1, 3, 5), 'test,1,3,5', 'Context used and arguments passed when called')

  bound = func.bind(f, ctx, 1)
  strictEqual(bound(3, 5), 'test,1,3,5', 'Context used, arguments partially applied and arguments passed when called')
})

}()
