!function(exports) {
  'use strict';

  exports._extendable(Root);
  function Root(context) {
    this.context = context;
    this.children = [];

    this.init.apply(this, arguments);
  }


  /*
   * Methods
   * ---------------------------------------------------------------------------
   */

  Root.prototype.init = function() {};

  Root.prototype.render = function() {
    for(var i = 0, l = this.children.length; i < l; i++) {
      this.children[i].render();
    }
  };

  Root.prototype.add = function(child) {
    this.children.push(child);
    child.context = this.context;
  };


  exports.Root = Root;

}(BatchGl);
