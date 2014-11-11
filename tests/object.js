QUnit.module('isomorph/object')

void function() {

var object = isomorph.object

QUnit.test('object.hasOwn', function() {
  var o = {someProp: true, hasOwnProperty: true}
  ok(object.hasOwn(o, 'someProp'), 'Detects standard named property')
  ok(object.hasOwn(o, 'hasOwnProperty'), 'Avoids the hasOwnProperty trap')
})

QUnit.test('object.type', function() {
  var objs = {
    string1: 'str1'
  , string2: new String('str2')
  , number1: 1
  , number2: new Number('2')
  , object1: {a: 1}
  , object2: new Object()
  , array1: []
  , array2: new Array()
  , function1: function() {}
  , regexp1: /^1$/
  , regexp2: new RegExp('^2$')
  , date1: new Date()
  , boolean1: true
  , boolean2: new Boolean(true)
  , error1: new Error('test')
  }
  Object.keys(objs).forEach(function(type) {
    var expected = type.replace(/\d$/, '')
    equal(object.type(objs[type]), expected, expected)
  })
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
  strictEqual(object.get(o, 'prop', 123), null, 'Retrieves property value when property exists')
  strictEqual(object.get(o, 'notProp', 123), 123, 'Returns default when property does not exist')
})

QUnit.test('object.pop', function() {
  var o = {p1: 'foo', p2: 'bar', prop: null}
  strictEqual(object.pop(o, 'p1', 123), 'foo', 'Returns the property when it exists')
  deepEqual(o, {p2: 'bar', prop: null}, 'The returned property was deleted from the object')
  strictEqual(object.get(o, 'notProp', 123), 123, 'Returns the default value when property does not exist')
  deepEqual(o, {p2: 'bar', prop: null}, 'Object properties were not changed when the default was returned')
  throws(object.pop.bind(object, null), 'Throws when the object is null')
  throws(object.pop.bind(object, undefined), 'Throws when the object is undefined')
  throws(object.pop.bind(object, o, 'notProp'), 'Throws when popping a non-existent property without a default value')
})

QUnit.test('object.setDefault', function() {
  var o = {}
  var ret = object.setDefault(o, 'list', [])
  deepEqual(ret, [], 'The default value is returned when the prop is not present')
  deepEqual(o, {list: []}, 'The default value is set on the object when the prop is not present')
  strictEqual(ret, o.list, 'The returned value is the same value which was set on the object')
  ret.push('test')
  deepEqual(o, {list: ['test']}, 'Updates to the default value are reflected in the object')
  strictEqual(ret, object.setDefault(o, 'list', []), 'Subsequent calls to setDefault return the added prop')
  throws(object.setDefault.bind(object, null), 'Throws when the object is null')
  throws(object.setDefault.bind(object, undefined), 'Throws when the object is undefined')
})

}()
