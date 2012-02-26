QUnit.module('isomorph/lib/querystring')

void function() {

var querystring = isomorph.querystring

QUnit.test('querystring.parse', function() {
  deepEqual(querystring.parse('?'), {})
  deepEqual(querystring.parse('?foo=bar'), {foo: 'bar'})
  deepEqual(querystring.parse('?foo=bar&baz=ter'), {foo: 'bar', baz: 'ter'})
  deepEqual(querystring.parse('?foo=bar&baz=ter&foo=par'), {foo: ['bar', 'par'], baz: 'ter'})
  deepEqual(querystring.parse('?foo=bar%20bar%20bar'), {foo: 'bar bar bar'})
})

QUnit.test('querystring.stringify', function() {
  equal(querystring.stringify({}), '')
  equal(querystring.stringify({foo: 'bar'}), 'foo=bar')
  equal(querystring.stringify({foo: 'bar', baz: 'ter'}), 'foo=bar&baz=ter')
  equal(querystring.stringify({foo: ['bar', 'par'], baz: 'ter'}), 'foo=bar&foo=par&baz=ter')
  equal(querystring.stringify({foo: 'bar bar bar'}), 'foo=bar%20bar%20bar')
})

}()
