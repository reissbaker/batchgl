!function(exports) {
  'use strict';

  var Memory = exports.Memory;

  exports.MemoryBlock = Memory.extend({
    constructor: function(arrayish, start) {
      this.start = start || 0;
      Memory.apply(this, arguments);
    },
    get: function(i) {
      return this.memory[this.start + i];
    },
    set: function(i, val) {
      this.memory[this.start + i] = val;
      return val;
    }
  });

}(BatchGL);
