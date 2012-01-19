QUnit.module('isomorph/object')

;(function() {

var object = isomorph.object

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

})()