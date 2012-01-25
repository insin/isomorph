var qunit = require('qunit')
  , path = require('path')

qunit.run({ code: {path: path.join(__dirname, '../lib/isomorph.js'), namespace: 'isomorph'}
          , tests: [ path.join(__dirname, 'is.js')
                   , path.join(__dirname, 'array.js')
                   , path.join(__dirname, 'format.js')
                   , path.join(__dirname, 'func.js')
                   , path.join(__dirname, 'object.js')
                   , path.join(__dirname, 're.js')
                   , path.join(__dirname, 'querystring.js')
                   , path.join(__dirname, 'copy.js')
                   ]
          })
