!function(exports) {
  'use strict';

  exports._extendable(Texture);
  function Texture(attributeSet) {
    this.context = attributeSet.context;
    this.program = attributeSet.program;
    this.attributeSet = attributeSet;
    this.uniforms = [];

    attributeSet.add(this);
  }


  /*
   * Methods
   * ---------------------------------------------------------------------------
   */

  Texture.prototype.render = function() {
    for(var i = 0, l = this.uniforms.length; i < l; i++) {
      this.uniforms[i]._render();
    }
  };

  Texture.prototype.add = function(uniform) {
    this.uniforms.push(uniform);
  };

  exports.Texture = Texture;

}(batchGl);
