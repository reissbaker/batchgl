!function(exports) {
  'use strict';

  exports._extendable(VertexSet);
  function VertexSet(leaf, vertices) {
    this.leaf = leaf;
    this.vertices = null;

    if(vertices) this.setVertices(vertices);
  }


  /*
   * Methods
   * ---------------------------------------------------------------------------
   */

  VertexSet.prototype.setVertices = function(vertices) {
    this.vertices = new Float32Array(vertices);
  };

  VertexSet.prototype.buffer = function() {
    this.leaf._bufferVertex(this);
  };

  exports.VertexSet = VertexSet;

}(batchGl);
