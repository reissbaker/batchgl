!function(exports) {
  'use strict';

  var MemoryBlock = exports.MemoryBlock;

  var BOUNDS_CHECK_ERROR = 'Attempt to access illegal MemoryBlock location: ';

  exports.SafeMemoryBlock = MemoryBlock.extend({
    constructor: function(arrayish, start, length) {
      this.end = (start || 0) + (length || arrayish.length) - 1;
      MemoryBlock.apply(this, arguments);
    },
    get: function(i) {
      var loc = this.start + i;
      if(loc < this.start || loc > this.end) {
        throw new Error(BOUNDS_CHECK_ERROR + loc + '.');
      }
      return this.memory[this.start + i];
    },
    set: function(i, val) {
      var loc = this.start + i;
      if(loc < this.start || loc > this.end) {
        throw new Error(BOUNDS_CHECK_ERROR + loc + '.');
      }
      this.memory[this.start + i] = val;
      return val;
    }
  });

}(BatchGL);
