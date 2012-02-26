QUnit.module('isomorph/lib/is')

void function() {

var is = isomorph.is

var objs = {
  str1: 'str1'
, str2: new String('str2')
, num1: 1
, num2: new Number('2')
, obj1: {a: 1}
, obj2: new Object()
, arr1: []
, arr2: new Array()
, func1: function() {}
, re1: /^1$/
, re2: new RegExp('^2$')
, date1: new Date()
, bool1: true
, bool2: new Boolean(true)
, err1: new Error('test')
}

var tests = [
  [is.Array, 'Array', 'arr']
, [is.Boolean, 'Boolean', 'bool']
, [is.Date, 'Date', 'date']
, [is.Error, 'Error', 'err']
, [is.Function, 'Function', 'func']
, [is.Number, 'Number', 'num']
, [is.Object, 'Object', 'obj']
, [is.RegExp, 'RegExp', 're']
, [is.String, 'String', 'str']
]

for (var i = 0, l = tests.length; i < l; i++) {
  var spec = tests[i]
    , testFn = spec[0]
    , desc = spec[1]
    , varName = spec[2]
  QUnit.test('is.' + desc, 15, function() {
    for (var prop in objs) {
      if (prop.indexOf(varName) == 0) {
        ok(testFn(objs[prop]), prop + ' is ' + desc)
      }
      else {
        ok(!testFn(objs[prop]), prop + ' is not ' + desc)
      }
    }
  })
}

QUnit.test('is.Empty', function() {
  ok(is.Empty({}))
  ok(!is.Empty({a: 1}))
})

}()
