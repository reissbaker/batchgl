BatchGL
================================================================================

A library that makes high-performance batched WebGL calls easy.

BatchGL models a series of WebGL calls as a tree with vertex data buffered into
the leaves. It renders the tree depth-first, so buffered vertices in leaves
will get batched over together.  Leaves closer to each other will get rendered
more closely to each other, allowing for fewer expensive context switches,
texture buffering, etc.


Examples
--------------------------------------------------------------------------------

Here's how you might set up a texture-rendering pipeline:

```javascript
var Program = BatchGL.Root.extend({
  init: function(context, vertexShader, fragmentShader) {
    // compile shaders, link program here
  },
  run: function() {
    // tell WebGL to use the program
  }
});

var Texture = BatchGL.Step.extend({
  init: function(program, image) {
    // setup
  },
  run: function() {
    // buffer, bind textures
  }
});

var Uniform = BatchGL.Leaf.extend({
  init: function() {
    // setup
  },

  run: function() {
    // bind uniforms here
  },

  buffer: function(vertexSet) {
    // buffer vertices to WebGL
  },

  flush: function() {
    // call WebGL drawing methods
  }
});

var context = new BatchGL.Context(canvas),
    program = new Program(context, vertexShader, fragmentShader),
    sprite = new Texture(program, spriteSheet),
    otherSprite = new Texture(program, spriteSheet2),
    lion = new Uniform(sprite, someCoordinates),
    tiger = new Uniform(sprite, otherCoordinates),
    bear = new Uniform(otherSprite, otherOtherCoordinates);


var v1 = new BatchGL.VertexSet(lion, [ /* some vertices */ ]);
var v2 = new BatchGL.VertexSet(lion, [ /* more vertices */ ]);
var v3 = new BatchGL.VertexSet(tiger, [ /* more vertices */ ]);
var v4 = new BatchGL.VertexSet(bear, [ /* more vertices */ ]);
var v5 = new BatchGL.VertexSet(bear, [ /* more vertices */ ]);

v1.buffer();
v5.buffer();
v4.buffer();
v3.buffer();
v2.buffer();

program.render(); // draws everything as batched as possible
```

API
--------------------------------------------------------------------------------

### BatchGL.Context

### BatchGL.Root

### BatchGL.Step

### BatchGL.Leaf

### BatchGL.VertexSet


Installation
--------------------------------------------------------------------------------

`bower install batchgl` or `npm install batchgl`

You can use the `build/batchgl.js` file as-is, or run `npm install && make
build` to get the minified and gzipped versions.


Development Notes
--------------------------------------------------------------------------------

To run the tests, make sure you've run an `npm install` at some point, and then
run `script/server 8000` (or pass in the numerical port of your choice).

If you want to peruse the code, tell me about bugs, or submit patches: [a link
to the repo](https://github.com/reissbaker/batchgl).
