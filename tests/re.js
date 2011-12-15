QUnit.module('isomorph/re')

;(function() {

var str = 'abc123def456'
var nomatch = '!"£$%^&*()'

QUnit.test('re.findAll', 12, function() {
  deepEqual(re.findAll('[a-z]\\d', str), ['c1'])
  deepEqual(re.findAll('[a-z]\\d', str, 'g'), ['c1', 'f4'])
  deepEqual(re.findAll('[a-z](\\d)', str), ['1'])
  deepEqual(re.findAll('[a-z](\\d)', str, 'g'), ['1', '4'])
  deepEqual(re.findAll('[a-z](\\d)(\\d)', str), [['1', '2']])
  deepEqual(re.findAll('[a-z](\\d)(\\d)', str, 'g'), [['1', '2'], ['4', '5']])
  deepEqual(re.findAll('[a-z]\\d', nomatch), [])
  deepEqual(re.findAll('[a-z]\\d', nomatch, 'g'), [])
  deepEqual(re.findAll('[a-z](\\d)', nomatch), [])
  deepEqual(re.findAll('[a-z](\\d)', nomatch, 'g'), [])
  deepEqual(re.findAll('[a-z](\\d)(\\d)', nomatch), [])
  deepEqual(re.findAll('[a-z](\\d)(\\d)', nomatch, 'g'), [])
})

})()