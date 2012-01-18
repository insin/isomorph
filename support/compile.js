var fs = require('fs')
  , path = require('path')
  , util = require('util')

var root = path.normalize(path.join(__dirname, '..'))

// Config
var config = {
  modules: {
    './is': 'lib/is.js'
  , './format': 'lib/format.js'
  , './func': 'lib/func.js'
  , './object': 'lib/object.js'
  , './re': 'lib/re.js'
  , 'isomorph': 'lib/isomorph.js'
  }
, output: 'isomorph.js'
}

// Input
var modules = []
for (var name in config.modules) {
  var modulePath = path.join(root, config.modules[name])
  console.log('compile: %s from %s', name, modulePath)
  modules.push(
    util.format("require.define('%s', function(module, exports, require) {\n", name) +
    fs.readFileSync(modulePath) +
    '})\n'
  )
}

// Output
fs.readFile(path.join(__dirname, 'template.js'), function(err, template) {
  var outputPath = path.join(root, config.output)
    , code = util.format(template.toString(), modules.join('\n'))
  fs.writeFile(outputPath, code, function(err) {
    if (err) throw error
    console.log('create: %s', outputPath)
  })
})