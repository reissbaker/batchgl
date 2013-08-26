!function(exports) {
  'use strict';

  var TreeNode = exports.TreeNode;

  var Root = TreeNode.extend({
    constructor: function(context) {
      this.context = context;
      this.children = [];

      TreeNode.apply(this, arguments);
    },
    render: function() {
      this.run();
      for(var i = 0, l = this.children.length; i < l; i++) {
        this.children[i].render();
      }
    },
    add: function(child) {
      this.children.push(child);
      child.context = this.context;
    }
  });

  exports.Root = Root;

}(BatchGL);
