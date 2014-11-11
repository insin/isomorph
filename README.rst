========================
Isomorph |travis_status|
========================

.. |travis_status| image:: https://secure.travis-ci.org/insin/isomorph.png
   :target: http://travis-ci.org/insin/isomorph

Utilities extracted from my dual-sided projects, which can be shared between
browsers and `Node.js`_. This project is really a grab-bag, so modules are
intended to be required individually as needed, e.g. for type-checking functions
you would ``require('isomorph/is')``.

Browsers:

* `isomorph.js`_ / `isomorph.min.js`_

Node.js::

   npm install isomorph

.. _`Node.js`: http://nodejs.org
.. _`isomorph.js`: https://raw.github.com/insin/isomorph/master/isomorph.js
.. _`isomorph.min.js`: https://raw.github.com/insin/isomorph/master/isomorph.min.js

is
==

Type-checking and more - anything which is a generic, reusable test which would
naturally have a function name starting with "is".

Type-checking functions
-----------------------

| ``is.Array``,
| ``is.Boolean``,
| ``is.Date``,
| ``is.Error``,
| ``is.Function``,
| ``is.Number``,
| ``is.Object``,
| ``is.RegExp``,
| ``is.String``

Determines if the given input is of the specified type.

Content-checking functions
--------------------------

``is.Empty``

Determines if the given Object has any enumerable properties.

array
=====

Utilities for working with Arrays.

``array.flatten(arr)``
----------------------

Flattens the given Array in place (and returns it, for chaining).

func
====

Utilities for working with Functions.

``func.bind(fn, context[, arg1, ...])``
---------------------------------------

Binds the given function to the given execution context (``this`` when
the function is called) and partially applies any additional arguments given.

The following properties are available on the binding function:

``__func__``
   The function which is bound.
``__context__``
   The context to which the function is bound.

object
======

Utilities for working with Objects.

``object.hasOwn(obj, propertyName)``
------------------------------------

Wrapped version of``Object.prototype.hasOwnProperty()`` -- use to avoid the
"hasOwnProperty trap", as described in `An Object is not a Hash`_.

.. _`An Object is not a Hash`: http://www.devthought.com/2012/01/18/an-object-is-not-a-hash/

``object.type(obj)``
--------------------

Returns the type of an object as a lowercase string::

   object.type({}) // "object"
   object.type([]) // "array"

``object.extend(dest[, src1, ...])``
------------------------------------

The classic ``extend`` method -- copies own properties from ``src`` arguments to
``dest``, returning ``dest``.

Does nothing for any ``src`` arguments which are falsy, so it's safe to pass in
an options argument which is potentially ``undefined``, e.g.::

   function quiz(kwargs) {
     kwargs = object.extend({answer: 42, question: 'Meaning?'}, kwargs)
     // ...
   }

``object.inherits(childConstructor, parentConstructor)``
--------------------------------------------------------

The classic ``inherits`` method -- puts ``parentConstructor``'s prototype in
``childConstructor``'s prototype chain, returning ``childConstructor``.

``object.items(obj)``
---------------------

Creates an Array of ``[property, value]`` pairs from an Object.

``object.fromItems(items)``
---------------------------

Creates an Object from an Array of ``[property, value]`` pairs.

::

   function sortedFieldObj(fieldObj) {
      var fields = object.items(fieldObj)
      fields.sort(function(a, b) {
        return a[1].creationCounter - b[1].creationCounter
      })
      return object.fromItems(fields)
   }

``object.lookup(arr)``
----------------------

Creates a lookup Object from an Array, coercing each item in the Array to String
and adding it to a lookup Object as a property whose value is ``true``::

   var ALLOWED_TAGS = ['div', 'span', 'h1']
     , TAG_LOOKUP = object.lookup(ALLOWED_TAGS)

   function elementify(tagName) {
      if (TAG_LOOKUP[tagName]) {
         console.log(tagName + ' is valid')
      }
      else {
         console.log(tagName + ' is not allowed')
      }
   }

``object.get(obj, prop, default)``
----------------------------------

If the object has an own property with the given name, returns its value,
otherwise returns the given default.

``object.pop(obj, prop, default)``
----------------------------------

If the object has an own property with the given name, deletes the property from
the object and returns its value, otherwise returns the given default.

``object.setDefault(obj, prop, default)``
-----------------------------------------

If the object has an own property with the given name, returns its value,
otherwise sets the given default as the property and returns it.

format
======

Formatting utilities.

``format.format(str[, r1, ...])``
---------------------------------

Replaces ``"%s"`` placeholders in the given string with positional arguments.

``format.formatArr(str, arr)``
------------------------------

Replaces ``"%s"`` placeholders in the given string with arguments passed as
an Array.

To output a literal ``'%'``, escape percentage signs by doubling them up::

   format.format('%% Complete: %s%%', 95) // '% Complete: 95%'

``format.formatObj(str, obj)``
------------------------------

Replaces ``"{varName}"`` placeholders in the given string with same-named
properties from a given object.

To output a literal '``{varName}'``, double up the opening brace::

   format.formatObj('{{foo}={foo}, {{bar}={bar}', {foo: 1, bar: 2}) // '{foo}=1, {bar}=2'

``format.fileSize(bytes[, threshold])``
---------------------------------------

Formats a number of bytes as a file size with an appropriately-scaled unit. The
threshold argument determines the point at which the next unit up is used,
defaulting to 768.

File sizes are rounded to the second decimal point, with any trailing zeros
being stripped off and the decimal point also being omitted if all decimals
are zero.

::

  format.fileSize(768) // '768 bytes'
  format.fileSize(769) // '0.75 kB
  format.fileSize(123456789) // '117.74 MB'

re
==

Regular Expression utilities.

``re.findAll(regex, str[, flags])``
-----------------------------------

Uses a regular expression (given as a String or a RegExp object) to
find and return matches in the given String, in the vein of Python's
`re.findall`_.

If a single group is present in the RegExp, a list of matches will be
returned. If more than one group is present, a list of lists of matches
will be returned.

If ``regex`` is specified as a String, the ``flags`` argument can be used
to specify the flags to be used when compiling the RegExp.

.. _`re.findall`: http://docs.python.org/library/re.html#re.findall

querystring
===========

Utilities for working with query strings.

``querystring.parse(str)``
--------------------------

Creates an Object from a query string, providing values for names which are
present more than once as an Array.

``querystring.stringify(obj)``
------------------------------

Creates a query string from an Object, expecting names with multiple values
to be specified as an Array.

copy
====

Utilites for creating copies of objects. This implementation is from Oran
Looney's `Deep Copy in JavaScript`_ and exposes the same interface.

.. _`Deep Copy in JavaScript`: http://oranlooney.com/deep-copy-javascript/

``copy.copy(obj)``
------------------

Creates a shallow copy of an object.

``copy.deepCopy(obj)``
----------------------

Creates a deep copy of an object.

time
====

Utilities for formatting and parsing times and dates.

Formatting Directives
---------------------

The following formatting directives are supported by ``time.strftime`` and
``time.strptime``:

=========  =====================================================
Directive  Meaning
=========  =====================================================
``%b``     Locale's abbreviated month name
``%B``     Locale's full month name
``%d``     Day of the month as a decimal number [01,31]
``%H``     Hour (24-hour clock) as a decimal number [00,23]
``%I``     Hour (12-hour clock) as a decimal number [00,12]
``%m``     Month as a decimal number [01,12]
``%M``     Minute as a decimal number [00,59]
``%p``     Locale's equivalent of either AM or PM (only with %I)
``%S``     Second as a decimal number [00,59]
``%y``     Year without century as a decimal number [00,99]
``%Y``     Year with century as a decimal number
``%%``     A literal ``%`` character
=========  =====================================================

``time.strftime(date, format[, locale])``
-----------------------------------------

A partial implementation of ``strftime``, which formats a Date according to a
format string. An Error will be thrown if an invalid format string is given.

``time.strpdate(string, format[, locale])``
-------------------------------------------

Parses time details from a string, based on a format string, returning a Date.

This is a convenience wrapper around ``time.strptime``:

``time.strptime(string, format[, locale])``
-------------------------------------------

A partial implementation of ``strptime``, which parses time details from a
string, based on a format string.

Returns an Array of numbers, each corresponding to a datetime field:

=====  ==========  ==================
Index  Represents  Values
=====  ==========  ==================
``0``  Year        (for example, 2003
``1``  Month       range [1,12]
``2``  Day         range [1,31]
``3``  Hour        range [0,23]
``4``  Minute      range [0,59]
``5``  Second      range [0,59]
=====  ==========  ==================

This implementation largely takes its cue from the documentation for Python's
``time`` module, as documented at http://docs.python.org/lib/module-time.html
with the exception of seconds formatting, which is restricted to the range
[00,59] rather than [00,61].

Locales
-------

The ``time`` module has basic support for using locales when parsing and
formatting dates.

``time.defaultLocale``
   The code for the default locale - defaults to ``'en'``.

``time.locales``
   An object defining locale details, with locale codes as its properties.
   Only contains the locale definition for ``'en'`` by default.

``time.getLocale(code)``
   Retrieves the locale with the given code, falling back to just the
   language code and finally to the default locale if a locale can't be found.

   Locale codes can consist of a language code (e.g. ``'en'``) or a language
   and region code (e.g. ``'en-GB'``).

url
===

Utilities for working with URLs.

``url.parseUri(url)``
---------------------

Splits any well-formed URI into its parts -- from http://blog.stevenlevithan.com/archives/parseuri.

::

   parseUri 1.2.2
   (c) Steven Levithan <stevenlevithan.com>
   MIT License

``url.makeUri(obj)``
--------------------

Creates a URI from an object specification -- from https://gist.github.com/1121696.

::

   makeURI 1.2.2 - create a URI from an object specification
   (c) Niall Smart <niallsmart.com>
   MIT License

MIT License
===========

Copyright (c) 2011, Jonathan Buchanan

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
