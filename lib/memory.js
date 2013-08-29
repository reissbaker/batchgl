!function(exports) {
  'use strict';

  var Extendable = exports.Extendable;

  exports.Memory = Extendable.extend({
    constructor: function(arrayish) {
      this.memory = arrayish;
      Extendable.apply(this, arguments);
    },
    get: function(i) {
      return this.memory[i];
    },
    set: function(i, val) {
      this.memory[i] = val;
      return val;
    }
  });

}(BatchGL);
