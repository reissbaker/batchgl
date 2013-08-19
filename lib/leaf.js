!function(exports) {
  'use strict';

  exports._extendable(Leaf);
  function Leaf(parent) {
    this.parent = parent;
    this.context = null;
    this._buffer = [];

    parent.add(this);

    this.init.apply(this, arguments);
  }


  /*
   * Methods
   * ---------------------------------------------------------------------------
   */

  Leaf.prototype.init = function() {};

  Leaf.prototype._bufferVertex = function(vertexSet) {
    this._buffer.unshift(vertexSet);
  };

  Leaf.prototype.render = function() {
    var buffered = this._buffer.length !== 0;
    while(this._buffer.length > 0) {
      this.buffer(this._buffer.pop());
    }
    if(buffered) this.flush();
  };

  Leaf.prototype.buffer = function(vertexSet) {};
  Leaf.prototype.flush = function() {};

  exports.Leaf = Leaf;

}(BatchGl);
