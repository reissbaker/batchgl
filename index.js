/*
 * Smoke Test
 * =============================================================================
 */

!function(document, batchGl) {
  'use strict';

  var context = { gl: {} };

  var LoggingUniform = batchGl.UniformSet.extend(function(texture, name) {
    batchGl.UniformSet.call(this, texture);
    this.name = name;
  });
  LoggingUniform.prototype.buffer = function() {
    console.log('Buffering ' + this.name);
  };
  LoggingUniform.prototype.flush = function() {
    console.log('Flushing ' + this.name);
  };

  // WebGL rendering pipeline setup.
  var program = new batchGl.Program(context),
      attribA = new batchGl.AttributeSet(program),
      attribB = new batchGl.AttributeSet(program),
      textureA = new batchGl.Texture(attribA),
      textureB = new batchGl.Texture(attribA),
      textureC = new batchGl.Texture(attribB),
      uniformA = new LoggingUniform(textureA, 'A'),
      uniformB = new LoggingUniform(textureB, 'B'),
      uniformC = new LoggingUniform(textureC, 'C'),
      uniformD = new LoggingUniform(textureC, 'C');

  // Vertices.
  var vA = new batchGl.VertexSet(uniformA),
      vA2 = new batchGl.VertexSet(uniformA),
      vB = new batchGl.VertexSet(uniformB);

  vA.buffer();
  vB.buffer();
  vA2.buffer();

  program.render();

}(document, batchGl);
