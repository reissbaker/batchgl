!function(exports) {
  'use strict';

  var VirtualMemory = exports.VirtualMemory;

  var BOUNDS_CHECK_ERROR = 'Attempt to access illegal MemoryBlock location: ';

  exports.BoundedVirtualMemory = VirtualMemory.extend({
    constructor: function(memory, start, length) {
      this.end = (start || 0) + (length || arrayish.length) - 1;
      VirtualMemory.apply(this, arguments);
    },
    get: function(i) {
      var loc = this.start + i;
      if(loc < this.start || loc > this.end) {
        throw new Error(BOUNDS_CHECK_ERROR + loc + '.');
      }
      return this.memory.get(this.start + i);
    },
    set: function(i, val) {
      var loc = this.start + i;
      if(loc < this.start || loc > this.end) {
        throw new Error(BOUNDS_CHECK_ERROR + loc + '.');
      }
      this.memory.set(this.start + i, val);
      return val;
    }
  });

}(BatchGL);
