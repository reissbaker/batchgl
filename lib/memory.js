!function(exports) {
  'use strict';

  var Extendable = exports.Extendable;

  exports.Memory = Extendable.extend({
    constructor: function(arrayish) {
      this.store = arrayish;
      Extendable.apply(this, arguments);
    },
    get: function(i) {
      return this.store[i];
    },
    set: function(i, val) {
      this.store[i] = val;
      return val;
    }
  });

}(BatchGL);
