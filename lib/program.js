!function(exports) {
  'use strict';

  exports._extendable(Program);
  function Program(context) {
    this.context = context;
    this.attributes = [];
  }


  /*
   * Methods
   * ---------------------------------------------------------------------------
   */

  Program.prototype.render = function() {
    for(var i = 0, l = this.attributes.length; i < l; i++) {
      this.attributes[i].render();
    }
  };

  Program.prototype.add = function(attributeSet) {
    this.attributes.push(attributeSet);
  };


  exports.Program = Program;

}(batchGl);
