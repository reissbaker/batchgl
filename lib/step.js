!function(exports) {
  'use strict';

  var TreeNode = exports.TreeNode;

  var Step = TreeNode.extend({
    constructor: function(parent) {
      this.context = null;
      this.parent = parent;
      this.children = [];

      parent.add(this);

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

  exports.Step = Step;

}(BatchGL);
