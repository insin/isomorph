var qunit = require('qunit')

qunit.run({ code: '../index.js'
          , tests: [ './is.js'
                   , './format.js'
                   , './func.js'
                   , './object.js'
                   , './re.js'
                   ]
          })
