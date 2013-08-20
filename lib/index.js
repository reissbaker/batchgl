!function(window) {
  'use strict';

  var BatchGL = window.BatchGL;

  var BatchGL = window.BatchGL = {
    noConflict: function() {
      window.BatchGL = BatchGL;
      return BatchGL;
    },
    extend: function(Base, Derived) {
      var Temp = function() {};
      Temp.prototype = Base.prototype;

      Derived.prototype = new Temp;
      Derived.prototype.constructor = Derived;

      mixin(Derived, Base);

      return Derived;
    },
    _extendable: function(Base) {
      Base.extend = function(derived) {
        var Derived;
        if(typeof derived !== 'function') Derived = extendingConstructor(Base);
        else Derived = derived;

        BatchGL.extend(Base, Derived);
        if(typeof derived === 'object') mixin(Derived.prototype, derived);

        return Derived;
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
