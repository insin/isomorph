var path = require('path')

var buildumb = require('buildumb')

buildumb.build({
  root: path.normalize(path.join(__dirname, '..'))
, modules: {
    'lib/is.js'       : './is'
  , 'lib/format.js'   : './format'
  , 'lib/func.js'     : './func'
  , 'lib/object.js'   : './object'
  , 'lib/re.js'       : './re'
  , 'lib/isomorph.js' : 'isomorph'
  }
, exports: {
    'isomorph': 'isomorph'
  }
, output: 'isomorph.js'
, compress: 'isomorph.min.js'
, header: buildumb.formatTemplate(path.join(__dirname, 'header.js'),
                                  require('../package.json').version)
})
