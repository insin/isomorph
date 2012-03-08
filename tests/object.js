QUnit.module('isomorph/lib/object')

void function() {

var object = isomorph.object

QUnit.test('object.hasOwn', function() {
  var o = {someProp: true, hasOwnProperty: true}
  ok(object.hasOwn(o, 'someProp'), 'Detects standard named property')
  ok(object.hasOwn(o, 'hasOwnProperty'), 'Avoids the hasOwnProperty trap')
})

QUnit.test('object.extend (single)', function() {
  var t = {a: 1, b:2, c: 3}
  deepEqual(object.extend({}, t), t, 'Object copied to empty Object')
  deepEqual(object.extend(t), t, 'Safe to omit src argument')
  deepEqual(object.extend({z: 0}, t), {z: 0, a: 1, b:2, c: 3}, 'Extended into existing Object')
  deepEqual(object.extend({a: 8, c: 8}, t), {a: 1, c:3, b: 2}, 'Overwrites existing properties')
})

QUnit.test('object.extend (multi)', function() {
  var t1 = {a: 1}, t2 = {b:2, c: 3}
  deepEqual(object.extend({}, t1, t2), {a: 1, b:2, c: 3}, 'Objects copied to empty Object')
  deepEqual(object.extend(t1), t1, 'Safe to omit src arguments')
  deepEqual(object.extend({z: 0}, t1, t2), {z: 0, a: 1, b:2, c: 3}, 'Extended into existing Object')
  deepEqual(object.extend({a: 8, c: 8}, t1, t2), {a: 1, c:3, b: 2}, 'Overwrites existing properties')
})

QUnit.test('object.fromItems', function() {
  var t = [['a', 1], ['b', 2], ['c', 3]]
  deepEqual(object.fromItems(t), {a: 1, b:2, c: 3}, 'Object contains all properties and values')
  deepEqual(object.fromItems([]), {}, 'Safe to pass an empty Array')
})

QUnit.test('object.items', function() {
  var t = {a: 1, b:2, c: 3}
  deepEqual(object.items(t), [['a', 1], ['b', 2], ['c', 3]], 'Items Array contains all properties and values')
  deepEqual(object.items({}), [], 'Safe to pass an empty Object')
})

QUnit.test('object.lookup', function() {
  var t = ['cheese', 'ham', 'toast']
  deepEqual(object.lookup(t), {cheese: true, ham: true, toast: true}, 'Lookup Object has keys from Array')
  deepEqual(object.lookup([]), {}, 'Safe to pass an empty Array')
})

QUnit.test('object.get', function() {
  var o = {prop: null}
  strictEqual(object.get(o, 'prop', 123), null, 'Retrieves properties value when property exist')
  strictEqual(object.get(o, 'notProp', 123), 123, 'Returns default when property does not exist')
})

}()
