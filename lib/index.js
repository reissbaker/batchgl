!function(window) {
  'use strict';

  var batchGl = window.batchGl;

  var batchGl = window.batchGl = {
    noConflict: function() {
      window.batchGl = batchGl;
      return batchGl;
    },
    extend: function(Base, Derived) {
      var Temp = function() {};
      Temp.prototype = Base.prototype;

      Derived.prototype = new Temp;
      Derived.prototype.constructor = Derived;

      for(var prop in Base) {
        if(Base.hasOwnProperty(prop)) Derived[prop] = Base[prop];
      }

      return Derived;
    },
    _extendable: function(Base) {
      Base.extend = function(Derived) { return batchGl.extend(Base, Derived); };
      return Base;
    }
  };

}(window);
