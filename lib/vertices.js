!function(exports) {
  'use strict';

  exports._extendable(VertexSet);
  function VertexSet(uniform) {
    this._uniformSet = uniform;
    this.vertices = null;
  }


  /*
   * Methods
   * ---------------------------------------------------------------------------
   */

  VertexSet.prototype.setVertices = function(vertices) {
    this.vertices = new Float32Array(vertices);
  };

  VertexSet.prototype.buffer = function() {
    this._uniformSet._bufferVertex(this);
  };

  exports.VertexSet = VertexSet;

}(batchGl);
