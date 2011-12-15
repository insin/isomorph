========
Isomorph
========

Utilities which can be shared between browsers and `Node.js`_.

Browsers:

   * `is.js`_ (no dependencies)
   * `func.js`_ (no dependencies)
   * `format.js`_ (dependent on `is.js`_)
   * `object.js`_ (no dependencies)
   * `re.js`_ (dependent on `is.js`_)

Node.js::

   npm install isomorph

Recommended usage pattern for code intended to execute in both environments::

   ;(function(__global__, server) {

   // When loaded in the browser, each file will create a namespace object
   // with the same name is its filename, so required Node dependencies should
   // do the same for compatibility.
   var is = server ? require('./is') : __global__.is

   // ...

   })(this, !!(typeof module != 'undefined' && module.exports))

.. _`Node.js`: http://nodejs.org
.. _`is.js`: https://raw.github.com/insin/isomorph/master/is.js
.. _`func.js`: https://raw.github.com/insin/isomorph/master/func.js
.. _`format.js`: https://raw.github.com/insin/isomorph/master/format.js
.. _`object.js`: https://raw.github.com/insin/isomorph/master/object.js
.. _`re.js`:  https://raw.github.com/insin/isomorph/master/re.js

is
==

Utilities for type-checking and more - anything which is a generic, reusable
test which would naturally have a function name starting with "is".

Type-checking functions
-----------------------

| ``is.Array``
| ``is.Boolean``
| ``is.Date``
| ``is.Error``
| ``is.Function``
| ``is.Number``
| ``is.Object``
| ``is.RegExp``
| ``is.String``

   Determines if the given input is of the specified type.

Content-checking functions
--------------------------

``is.Empty``

   Determines if the given Object has any enumerable properties.

func
====

Utilities for wrking with functions.

``func.bind(fn, context[, arg1, ...])``
---------------------------------------

   Binds the given function to the given execution context (``this`` when
   the fnction is called) and optionally partially applies any additional
   arguments.

object
======

``object.extend(dest[, src])``
------------------------------

   The classic ``extend`` method -- copies own properties from ``src`` to
   ``dest``, returning ``dest``.

   Does nothing if ``src`` is falsy, so it's safe to pass in an options
   argument which is potentially ``undefined``::

      function quiz(kwargs) {
        kwargs = Concur.cp({answer: 42, question: 'Meaning?'}, kwargs)
        // ...
      }

format
======

``format.format(str[, r1, ...])``
---------------------------------

Replaces ``"%s"`` placeholders in the given string with positional arguments.

``format.formatArr(str, arr)``
------------------------------

Replaces ``"%s"`` placeholders in the given string with arguments passed as
an Array.

``format.formatObj(str, obj)``
------------------------------

Replaces ``"{varName}"`` placeholders in the given string with same-named
properties from a given object.

re
==

``re.findAll(regex, str[, flags])``
------------------------------------

Uses a regular expression (given as a String or a RegExp object) to
find and return matches in the given String, in the vein of Python's
`re.findall`_.

If a single group is present in the RegExp, a list of matches will be
returned. If more than one group is present, a list of lists of matches
will be returned.

If ``regex`` is specified as a String, the ``flags`` argument can be used
to specify the flags to be used when compiling the RegExp.

.. _`re.findall`: http://docs.python.org/library/re.html#re.findall

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
