!function(exports) {
  'use strict';

  var Extendable = exports.Extendable;

  var VertexSet = Extendable.extend({
    constructor: function(leaf, vertices) {
      this.leaf = leaf;
      this.vertices = null;

      if(vertices) this.setVertices(vertices);

      Extendable.apply(this, arguments);
    },
    setVertices: function(vertices) {
      this.vertices = new Float32Array(vertices);
    },
    buffer: function() {
      this.leaf._bufferVertex(this);
    }
  });

  exports.VertexSet = VertexSet;

}(BatchGL);
