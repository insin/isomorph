## v0.3.0 / 2014-11-11

* `copy.copy()` and `copy.deepCopy()` now handle primitive wrapper objects
  and copy over any custom properties added to them
* Added `object.type()`

## v0.2.1 / 2014-02-21

* Added `object.pop()`
* Added `object.setDefault()`

## v0.2.0 / 2012-06-29

* Moved modules up from `lib/` to `/` for tidier importing.

## v0.1.10 / 2012-06-27

* Added `format.fileSize()`

## v0.1.9 / 2012-03-08

* Extracted third-party functions from [newforms](https://github.com/insin/newforms)
  for reuse across projects:

  * `url.parseUri()`
  * `url.makeUri()`

## v0.1.8 / 2012-02-01

* Fixed `object.hasOwn()` in IE 7/8, where `Function.prototype.call.bind` is
  Not A Thing.

## v0.1.7 / 2012-01-28

* Added time module, with `time.strftime`, `time.strpdate`, `time.strftime`
  and some basic locale support.
* Added copy module, with `copy.copy()` and `copy.deepCopy()`
* Added `object.get()`

## v0.1.6 / 2012-01-25

* Added `object.hasOwn()`

## v0.1.5 / 2012-01-20

* Extracted from [sacrum](https://github.com/insin/sacrum):

  * `querystring.parse()`
  * `querystring.stringify()`

## v0.1.4 / 2012-01-19

* Extracted from [DOMBuilder](https://github.com/insin/DOMBuilder):

  * `array.flatten()`

## v0.1.3 / 2012-01-19

* Version number was incorrect in v0.1.2 build

## v0.1.2 / 2012-01-19

* Changed `function.bind()` now exposes the bound function as `__func__`
  and the bound context as `__context__`
* Extracted from [newforms](https://github.com/insin/newforms)

   * `object.items()` - `{a: 1, b: 2}` → `[['a', 1], ['b', 2]]`
   * `object.fromItems()` - `[['a', 1], ['b', 2]]` → `{a: 1, b : 2}`
   * `object.lookup()` - `['a', 'b', 'c']` → `{a: true, b: true: c: true}`

* Changed: `object.extend()` is now variadic, accepting multiple source
  objects
* Changed: escape `'%'` in `format.format()` and `format.formatArr()`
  using `'%%'`
* Changed: escape `'{varName}'` in `format.formatObj()` using
  `'{{varName}'`

## v0.1.1 / 2012-01-18

* Changed build script to use [buildumb](https://github.com/insin/buildumb)

## v0.1.0 / 2012-01-17

* Changed code structure - now written as a regular Node.js module
* Added a browser build script
* Changed API for browser use - now exposed as a global `isomorph` variable

## v0.0.2 / 2012-01-17

* Added `object.inherits()`

## v0.0.1 / 2011-12-15

* Initial release.
