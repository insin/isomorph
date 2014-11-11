'use strict';

QUnit.module('isomorph/copy')

void function() {

var copy = isomorph.copy

QUnit.test('copy.copy', function() {
  var o = {a: [{p: '123'}, {p: '456'}]}
  // Create a shallow copy
  var c = copy.copy(o)
  strictEqual(o.a, c.a, 'Shallow-copied property was copied by reference')
})

QUnit.test('copy.copy - primitive wrappers', function() {
  var o = {
    b: new Boolean(true)
  , n: new Number(123)
  , s: new String('test')
  }
  o.b.custom = 'custom'
  o.n.custom = 'custom'
  o.s.custom = 'custom'
  var c = copy.copy(o)
  equal(Object.prototype.toString.call(c.b), '[object Boolean]', 'Shallow-copied Boolean object is still a Boolean')
  equal(c.b.custom, 'custom', 'Shallow-copied Boolean object has custom property')
  equal(Object.prototype.toString.call(c.n), '[object Number]', 'Shallow-copied Number object is still a Number')
  equal(c.n.custom, 'custom', 'Shallow-copied Number object has custom property')
  equal(Object.prototype.toString.call(c.s), '[object String]', 'Shallow-copied String object is still a String')
  equal(c.s.custom, 'custom', 'Shallow-copied String object has custom property')
})

QUnit.test('copy.deepCopy', function() {
  var o = {a: [{p: '123'}, {p: '456'}]}
  // Create and modify a deep copy
  var c = copy.deepCopy(o)
  c.a[0].p = '789'
  c.a.push({p: 'abc'})
  deepEqual(o, {a: [{p: '123'}, {p: '456'}]}, 'Original not affected by changes to deep copy')
  deepEqual(c, {a: [{p: '789'}, {p: '456'}, {p: 'abc'}]}, 'Deep copy has original properties plus changes')
})

QUnit.test('copy.deepCopy - primitive wrappers', function() {
  var o = {
    b: new Boolean(true)
  , n: new Number(123)
  , s: new String('test')
  }
  o.b.custom = 'custom'
  o.n.custom = 'custom'
  o.s.custom = 'custom'
  var c = copy.deepCopy(o)
  equal(Object.prototype.toString.call(c.b), '[object Boolean]', 'Deep-copied Boolean object is still a Boolean')
  equal(c.b.custom, 'custom', 'Deep-copied Boolean object has custom property')
  equal(Object.prototype.toString.call(c.n), '[object Number]', 'Deep-copied Number object is still a Number')
  equal(c.n.custom, 'custom', 'Deep-copied Number object has custom property')
  equal(Object.prototype.toString.call(c.s), '[object String]', 'Deep-copied String object is still a String')
  equal(c.s.custom, 'custom', 'Deep-copied String object has custom property')
})

}()