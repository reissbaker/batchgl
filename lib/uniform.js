!function(exports) {
  'use strict';

  exports._extendable(UniformSet);
  function UniformSet(texture) {
    this.context = texture.context;
    this.program = texture.program;
    this.attributes = texture.attributes;
    this.texture = texture;
    this._buffer = [];

    texture.add(this);
  }


  /*
   * Methods
   * ---------------------------------------------------------------------------
   */

  UniformSet.prototype._bufferVertex = function(vertexSet) {
    this._buffer.unshift(vertexSet);
  };

  UniformSet.prototype._render = function() {
    var buffered = this._buffer.length !== 0;
    while(this._buffer.length > 0) {
      this.buffer(this._buffer.pop());
    }
    if(buffered) this.flush();
  };

  UniformSet.prototype.buffer = function(vertexSet) {};
  UniformSet.prototype.flush = function() {};

  exports.UniformSet = UniformSet;

}(batchGl);
