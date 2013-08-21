!function(window) {
  'use strict';

  var BatchGL = window.BatchGL;

  var BatchGL = window.BatchGL = {
    noConflict: function() {
      window.BatchGL = BatchGL;
      return BatchGL;
    },
    extend: function(Base, derived) {
      var Derived,
          Temp = function() {};

      if(typeof derived !== 'function') Derived = extendingConstructor(Base);
      else Derived = derived;

      Temp.prototype = Base.prototype;
      Derived.prototype = new Temp;
      Derived.prototype.constructor = Derived;

      if(typeof derived === 'object') mixin(Derived.prototype, derived);
      mixin(Derived, Base);

      return Derived;
    },
    _extendable: function(Base) {
      Base.extend = function(Derived) {
        return BatchGL.extend(this, Derived);
      };
      return Base;
    }
  };

  function extendingConstructor(Base) {
    return function() { Base.apply(this, arguments); };
  }

  function mixin(dest, src) {
    for(var prop in src) {
      if(src.hasOwnProperty(prop)) {
        dest[prop] = src[prop];
      }
    }
  }

}(window);
