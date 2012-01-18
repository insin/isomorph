var path = require('path')

var buildumb = require('buildumb')

buildumb.build({
  root: path.normalize(path.join(__dirname, '..'))
, modules: {
    './is': 'lib/is.js'
  , './format': 'lib/format.js'
  , './func': 'lib/func.js'
  , './object': 'lib/object.js'
  , './re': 'lib/re.js'
  , 'isomorph': 'lib/isomorph.js'
  }
, exports: {
    'isomorph': 'isomorph'
  }
, output: 'isomorph.js'
, compress: 'isomorph.min.js'
, header: buildumb.formatTemplate(path.join(__dirname, 'header.js'),
                                  require('../package.json').version)
})
