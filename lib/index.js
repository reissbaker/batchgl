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

      Derived = ownConstructor(derived) || extendingConstructor(Base);

      Temp.prototype = Base.prototype;
      Derived.prototype = new Temp;

      mixin(Derived.prototype, derived);
      Derived.prototype.constructor = Derived;
      mixin(Derived, Base);

      return Derived;
    }
  };

  function ownConstructor(derived) {
    if(derived.hasOwnProperty('constructor')) return derived.constructor;
    return null;
  }

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
