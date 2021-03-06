// Generated by CoffeeScript 1.3.1

/*
    QuoJS 2.0
    http://quojs.tapquo.com

    Copyright (C) 2011,2012 Javi Jiménez Villar (@soyjavi)

    Permission is hereby granted, free of charge, to any person obtaining a
    copy of this software and associated documentation files (the "Software"),
    to deal in the Software without restriction, including without limitation
    the rights to use, copy, modify, merge, publish, distribute, sublicense,
    and/or sell copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
    DEALINGS IN THE SOFTWARE.
*/


(function() {
  var Quo;

  Quo = (function() {
    var $$, EMPTY_ARRAY, Q;
    EMPTY_ARRAY = [];
    Q = function(dom, selector) {
      dom = dom || EMPTY_ARRAY;
      dom.__proto__ = Q.prototype;
      dom.selector = selector || '';
      return dom;
    };
    $$ = function(selector) {
      var domain_selector;
      if (!selector) {
        return Q();
      } else {
        domain_selector = $$.getDomainSelector(selector);
        return Q(domain_selector, selector);
      }
    };
    $$.extend = function(target) {
      Array.prototype.slice.call(arguments, 1).forEach(function(source) {
        var key, _results;
        _results = [];
        for (key in source) {
          _results.push(target[key] = source[key]);
        }
        return _results;
      });
      return target;
    };
    Q.prototype = $$.fn = {};
    return $$;
  })();

  window.Quo = Quo;

  "$$" in window || (window.$$ = Quo);

}).call(this);
