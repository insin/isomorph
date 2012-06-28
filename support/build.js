var path = require('path')

var buildumb = require('buildumb')

buildumb.build({
  root: path.normalize(path.join(__dirname, '..'))
, modules: {
    'is.js'          : './is'
  , 'array.js'       : './array'
  , 'format.js'      : './format'
  , 'func.js'        : './func'
  , 'object.js'      : './object'
  , 're.js'          : './re'
  , 'querystring.js' : './querystring'
  , 'copy.js'        : './copy'
  , 'time.js'        : './time'
  , 'url.js'         : './url'
  , 'index.js'       : 'isomorph'
  }
, exports: {
    'isomorph': 'isomorph'
  }
, output: 'isomorph.js'
, compress: 'isomorph.min.js'
, header: buildumb.formatTemplate(path.join(__dirname, 'header.js'),
                                  require('../package.json').version)
})
