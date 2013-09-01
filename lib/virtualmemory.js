!function(exports) {
  'use strict';

  var Extendable = exports.Extendable;

  exports.VirtualMemory = Extendable.extend({
    constructor: function(memory, start) {
      this.start = start || 0;
      this.memory = memory;
    },
    get: function(i) {
      return this.memory.get(this.start + i);
    },
    set: function(i, val) {
      this.memory.set(this.start + i, val)
      return val;
    }
  });

}(BatchGL);
