var path = require('path')

var qqunit = require('qqunit')
  , object = require('../lib/object')

object.extend(global, require('./customAsserts'))
global.isomorph = require('../lib/isomorph')

var tests = [ 'is.js'
            , 'array.js'
            , 'format.js'
            , 'func.js'
            , 'object.js'
            , 're.js'
            , 'querystring.js'
            , 'copy.js'
            , 'time.js'
            ].map(function(t) { return path.join(__dirname, t) })

qqunit.Runner.run(tests, function(stats) {
  process.exit(stats.failed)
})
