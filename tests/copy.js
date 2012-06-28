QUnit.module('isomorph/copy')

void function() {

var copy = isomorph.copy

QUnit.test('copy.copy', function() {
  var o = {a: [{p: '123'}, {p: '456'}]}
  // Create and modify a deep copy
  var c = copy.copy(o)
  strictEqual(o.a, c.a, 'Object property was copied by reference')
})

QUnit.test('copy.deepCopy', function() {
  var o = {a: [{p: '123'}, {p: '456'}]}
  // Create and modify a deep copy
  var c = copy.deepCopy(o)
  c.a[0].p = '789'
  c.a.push({p: 'abc'})
  deepEqual(o, {a: [{p: '123'}, {p: '456'}]}, 'Original not affected by changes to copy')
  deepEqual(c, {a: [{p: '789'}, {p: '456'}, {p: 'abc'}]}, 'Copy has original properties plus changes')
})

}()