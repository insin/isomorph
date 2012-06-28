QUnit.module('isomorph/format')

void function() {

var format = isomorph.format

QUnit.test('format.format', function() {
  equal(format.format('nothing to do', 1, 2, 3), 'nothing to do', 'Does nothing if there are no placeholders')
  equal(format.format('escape %%s escape', 1, 2, 3), 'escape %s escape', '%% escapes %')
  equal(format.format('%s', 1), '1')
  equal(format.format('%s%%%s', 1, 2), '1%2')
  equal(format.format('%s %s %s', 1, 2, 3), '1 2 3')
  equal(format.format('%% Complete: %s%%', 95), '% Complete: 95%', 'README example')
})

QUnit.test('format.formatArr', function() {
  equal(format.formatArr('nothing to do', [1, 2, 3]), 'nothing to do', 'Does nothing if there are no placeholders')
  equal(format.formatArr('escape %%s escape', [1, 2, 3]), 'escape %s escape', '%% escapes %')
  equal(format.formatArr('%s', [1]), '1')
  equal(format.formatArr('%s%s', [1, 2]), '12')
  equal(format.formatArr('%s %s %s', [1, 2, 3]), '1 2 3')
})

QUnit.test('format.formatObj', function() {
  equal(format.formatObj('nothing to do', {one: 1, two: 2, three: 3}), 'nothing to do', 'Does nothing if there are no placeholders')
  equal(format.formatObj('{{one}', {one: 1, two: 2, three: 3}), '{one}', '{{propertyName} escapes {propertyName}')
  equal(format.formatObj('{one}', {one: 1}), '1')
  equal(format.formatObj('{one}{{one}{two}', {one: 1, two: 2}), '1{one}2')
  equal(format.formatObj('{one} {two} {three}', {one: 1, two: 2, three: 3}), '1 2 3')
  equal(format.formatObj('{{foo}={foo}, {{bar}={bar}', {foo: 1, bar: 2}), '{foo}=1, {bar}=2', 'README example')
})

QUnit.test('format.fileSize', function() {
  equal(format.fileSize(768), '768 bytes')
  equal(format.fileSize(769), '0.75 kB')
  equal(format.fileSize(768 * 1024), '768 kB')
  equal(format.fileSize(1 + 768 * 1024), '0.75 MB')
  equal(format.fileSize(123456789), '117.74 MB')
  equal(format.fileSize(768 * Math.pow(1024, 2)), '768 MB')
  equal(format.fileSize(1 + 768 * Math.pow(1024, 2)), '0.75 GB')
  equal(format.fileSize(768 * Math.pow(1024, 3)), '768 GB')
  equal(format.fileSize(1 + 768 * Math.pow(1024, 3)), '0.75 TB')
})

}()
