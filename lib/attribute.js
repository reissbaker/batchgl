!function(exports) {
  'use strict';

  exports._extendable(AttributeSet);
  function AttributeSet(program) {
    this.context = program.context;
    this.program = program;
    this.textures = [];

    program.add(this);
  }


  /*
   * Methods
   * ---------------------------------------------------------------------------
   */

  AttributeSet.prototype.render = function() {
    for(var i = 0, l = this.textures.length; i < l; i++) {
      this.textures[i].render();
    }
  }

  AttributeSet.prototype.add = function(texture) {
    this.textures.push(texture);
  };

  exports.AttributeSet = AttributeSet;

}(batchGl);
