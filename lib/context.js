!function(exports) {
  'use strict';

  var WEBGL_CTX = 'webgl',
      VENDOR_WEBGL_CTX = 'experimental-webgl';



  /*
   * Constructor
   * ---------------------------------------------------------------------------
   */

  exports._extendable(Context);
  function Context(canvas, vertexShader, fragmentShader) {
    this.canvas = canvas;
    this.gl = initWebGl(this.canvas);
  }


  /*
   * Methods
   * ---------------------------------------------------------------------------
   */

  /*
   * ### updateSize
   *
   * Updates the instance's size, and the size of its WebGL context. You must
   * call this method if you manually add the canvas element to the DOM with the
   * `el()` method, rather than using `appendTo`.
   */

  Context.prototype.updateSize = function() {
    var canvas = this.canvas;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    this.gl.viewport(0, 0, canvas.width, canvas.height);
  };


  /*
   * Helpers
   * ---------------------------------------------------------------------------
   */

  /*
   * ### initWebGl
   *
   * Given a canvas element, returns a WebGL context obtained from the element.
   */

  function initWebGl(canvas) {
    return canvas.getContext(WEBGL_CTX) || canvas.getContext(VENDOR_WEBGL_CTX);
  }



  /*
   * Export
   * ---------------------------------------------------------------------------
   */

  exports.Context = Context;

}(batchGl);
