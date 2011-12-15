QUnit.module('isomorph/object')

QUnit.test('object.extend', function() {
  var t = {a: 1, b:2, c: 3}
  deepEqual(object.extend({}, t), t, 'Object copied to empty object')
  deepEqual(object.extend(t), t, 'Safe to omit src argument')
  deepEqual(object.extend({z: 0}, t), {z: 0, a: 1, b:2, c: 3}, 'Extended into existing object')
  deepEqual(object.extend({a: 8, c: 8}, t), {a: 1, c:3, b: 2}, 'Overwrites existing properties')
})
