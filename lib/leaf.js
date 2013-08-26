!function(exports) {
  'use strict';

  var TreeNode = exports.TreeNode;

  var Leaf = TreeNode.extend({
    constructor: function(parent) {
      this.parent = parent;
      this.context = null;
      this._buffer = [];

      parent.add(this);

      TreeNode.apply(this, arguments);
    },

    _bufferVertex: function(vSet) {
      this._buffer.unshift(vSet);
    },

    render: function() {
      var buffered = this._buffer.length !== 0;
      this.run();
      while(this._buffer.length > 0) {
        this.buffer(this._buffer.pop());
      }
      if(buffered) this.flush();
    },

    buffer: function(vSet) {},
    flush: function() {}
  });


  exports.Leaf = Leaf;

}(BatchGL);
