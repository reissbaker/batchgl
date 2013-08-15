!function(exports) {
  'use strict';

  exports._extendable(Program);
  function Program(context) {
    this.context = context;
    this.children = [];

    this.init.apply(this, arguments);
  }


  /*
   * Methods
   * ---------------------------------------------------------------------------
   */

  Program.prototype.init = function() {};

  Program.prototype.render = function() {
    for(var i = 0, l = this.children.length; i < l; i++) {
      this.children[i].render();
    }
  };

  Program.prototype.add = function(child) {
    this.children.push(child);
    child.context = this.context;
    child.program = this;
  };


  exports.Program = Program;

}(batchGl);
