/*
 * Smoke Test
 * =============================================================================
 */

!function(document, batchGl) {
  'use strict';

  // Stub out context.
  var context = { gl: {} };


  /*
   * Pipeline Class Definitions
   * ---------------------------------------------------------------------------
   */

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

  var Program = batchGl.Step.extend(),
      AttributeSet = batchGl.Step.extend(),
      Texture = batchGl.Step.extend();


  /*
   * Pipeline Setup
   * ---------------------------------------------------------------------------
   */

  var root = new batchGl.Root(context),
        program = new Program(root),
          attribA = new AttributeSet(program),
            textureA = new Texture(attribA),
              leafA = new LoggingLeaf(textureA, 'A'),
            textureB = new Texture(attribA),
              leafB = new LoggingLeaf(textureB, 'B'),
          attribB = new AttributeSet(program),
            textureC = new Texture(attribB),
              leafC = new LoggingLeaf(textureC, 'C'),
              leafD = new LoggingLeaf(textureC, 'D');


  /*
   * Vertices
   * ---------------------------------------------------------------------------
   */

  var vA = new batchGl.VertexSet(leafA),
      vA2 = new batchGl.VertexSet(leafA),
      vB = new batchGl.VertexSet(leafB),
      vC = new batchGl.VertexSet(leafC),
      vC2 = new batchGl.VertexSet(leafC),
      vC3 = new batchGl.VertexSet(leafC),
      vD = new batchGl.VertexSet(leafD);


  /*
   * Rendering
   * ---------------------------------------------------------------------------
   */

  vA.buffer();
  vD.buffer();
  vB.buffer();
  vC2.buffer();
  vC3.buffer();
  vA2.buffer();
  vC.buffer();

  root.render();

}(document, batchGl);
