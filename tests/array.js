QUnit.module('isomorph/array')

;(function() {

var array = isomorph.array

QUnit.test('array.flatten', function() {
  var a = [ 1
          , 2
          , [ ]
          , [ 3
            , 4
            , 5
            , [6]
            , 7
            ]
          , 8
          ]
  var f = array.flatten(a)
  deepEqual(f, [1, 2, 3, 4, 5, 6, 7, 8], 'Array contents flattened')
  ok(f === a, 'Array was flattened in-place')
  deepEqual([], [], 'Safe to call on an empty Array')
})

})()
