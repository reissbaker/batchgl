!function(exports) {
  'use strict';

  var Extendable = exports.Extendable;

  var VertexSet = Extendable.extend({
    constructor: function(leaf, memory) {
      this.leaf = leaf;
      this.memory = memory;

      Extendable.apply(this, arguments);
    },
    buffer: function() {
      this.leaf._bufferVertex(this);
    }
  });

  exports.VertexSet = VertexSet;

}(BatchGL);
