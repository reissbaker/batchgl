!function(exports) {
  'use strict';

  var TreeNode = exports.TreeNode;

  TreeNode.extend(Leaf);
  function Leaf(parent) {
    this.parent = parent;
    this.context = null;
    this._buffer = [];

    parent.add(this);

    TreeNode.apply(this, arguments);
  }


  /*
   * Methods
   * ---------------------------------------------------------------------------
   */

  Leaf.prototype._bufferVertex = function(vertexSet) {
    this._buffer.unshift(vertexSet);
  };

  Leaf.prototype.render = function() {
    var buffered = this._buffer.length !== 0;
    this.run();
    while(this._buffer.length > 0) {
      this.buffer(this._buffer.pop());
    }
    if(buffered) this.flush();
  };

  Leaf.prototype.buffer = function(vertexSet) {};
  Leaf.prototype.flush = function() {};

  exports.Leaf = Leaf;

}(BatchGL);
