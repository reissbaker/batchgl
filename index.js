/*
 * Smoke Test
 * =============================================================================
 */

!function(document, batchGl) {
  'use strict';

  var context = { gl: {} };

  var LoggingLeaf = batchGl.Leaf.extend({
    init: function(parent, name) {
      this.name = name;
    },
    buffer: function() {
      console.log('Buffering ' + this.name);
    },
    flush: function() {
      console.log('Flushing ' + this.name);
    }
  });

  var AttributeSet = batchGl.Step.extend(),
      Texture = batchGl.Step.extend();

  // WebGL rendering pipeline setup.
  var program = new batchGl.Program(context),
      attribA = new AttributeSet(program),
      attribB = new AttributeSet(program),
      textureA = new Texture(attribA),
      textureB = new Texture(attribA),
      textureC = new Texture(attribB),
      leafA = new LoggingLeaf(textureA, 'A'),
      leafB = new LoggingLeaf(textureB, 'B'),
      leafC = new LoggingLeaf(textureC, 'C'),
      leafD = new LoggingLeaf(textureC, 'C');

  // Vertices.
  var vA = new batchGl.VertexSet(leafA),
      vA2 = new batchGl.VertexSet(leafA),
      vB = new batchGl.VertexSet(leafB);

  vA.buffer();
  vB.buffer();
  vA2.buffer();

  program.render();

}(document, batchGl);
