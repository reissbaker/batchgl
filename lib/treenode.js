!function(exports) {
  'use strict';

  exports._extendable(TreeNode);
  function TreeNode() {
    this.init.apply(this, arguments);
  }

  TreeNode.prototype.init = function() {};
  TreeNode.prototype.run = function() {};
  TreeNode.prototype.render = function() {};

  exports.TreeNode = TreeNode;

}(BatchGL);
