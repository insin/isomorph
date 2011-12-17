var qunit = require('qunit')
  , path = require('path')

qunit.run({ code: path.join(__dirname, '../index.js')
          , tests: [ path.join(__dirname, 'is.js')
                   , path.join(__dirname, 'format.js')
                   , path.join(__dirname, 'func.js')
                   , path.join(__dirname, 'object.js')
                   , path.join(__dirname, 're.js')
                   ]
          })
