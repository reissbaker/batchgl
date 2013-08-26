!function(exports) {
  'use strict';

  function Extendable() { this.init.apply(this, arguments); }
  Extendable.prototype.init = function() {};
  Extendable.extend = function(Derived) {
    return exports.extend(this, Derived);
  };

  exports.Extendable = Extendable;

}(BatchGL);
