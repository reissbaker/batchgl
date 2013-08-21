!function(exports) {
  'use strict';

  var TreeNode = exports.TreeNode;

  TreeNode.extend(Root);
  function Root(context) {
    this.context = context;
    this.children = [];

    TreeNode.apply(this, arguments);
  }


  /*
   * Methods
   * ---------------------------------------------------------------------------
   */

  Root.prototype.render = function() {
    this.run();
    for(var i = 0, l = this.children.length; i < l; i++) {
      this.children[i].render();
    }
  };

  Root.prototype.add = function(child) {
    this.children.push(child);
    child.context = this.context;
  };


  exports.Root = Root;

}(BatchGL);
