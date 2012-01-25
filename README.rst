========================
Isomorph |travis_status|
========================

.. |travis_status| image:: https://secure.travis-ci.org/insin/isomorph.png
   :target: http://travis-ci.org/insin/isomorph

Utilities extracted from my dual-sided projects, which can be shared between
browsers and `Node.js`_.

Browsers:

* `isomorph.js`_

Node.js::

   npm install isomorph

.. _`Node.js`: http://nodejs.org
.. _`isomorph.js`: https://raw.github.com/insin/isomorph/master/isomorph.js

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

``flatten(arr)``
----------------

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

Callbound version of ``Object.prototype.hasOwnProperty()`` -- use to avoid the
"hasOwnProperty trap", as described in `An Object is not a Hash`_.

.. _`An Object is not a Hash`: http://www.devthought.com/2012/01/18/an-object-is-not-a-hash/

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

``parse(str)``
--------------

Creates an Object from a query string, providing values for names which are
present more than once as an Array.

``stringify(obj)``
------------------

Creates a query string from an Object, expecting names with multiple values
to be specified as an Array.

copy
====

Utilites for creating copies of objects. This implementation is from Oran
Looney's `Deep Copy in JavaScript`_ and exposes the same interface.

.. _`Deep Copy in JavaScript`: http://oranlooney.com/deep-copy-javascript/

``copy(obj)``
-------------

Creates a shallow copy of an object.

``deepCopy()``
--------------

Creates a deep copy of an object.

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
