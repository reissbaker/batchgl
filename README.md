BatchGL
================================================================================

A library that makes high-performance batched WebGL calls easy.

BatchGL models a series of WebGL calls as a tree with vertex data buffered into
the leaves. It renders the tree depth-first, so buffered vertices in leaves
will get batched over together.  Leaves closer to each other will get rendered
more closely to each other, allowing for fewer expensive context switches,
texture buffering, etc.


Installation
--------------------------------------------------------------------------------

`bower install batchgl` or `npm install batchgl`

You can use the `build/batchgl.js` file as-is, or run `npm install && make
build` to get the minified and gzipped versions.


Examples
--------------------------------------------------------------------------------

Here's how you might set up a texture-rendering pipeline:

```javascript

/*
 * One-time setup of the rendering pipeline starts here:
 */

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


/*
 * One-time setup is finished. You can now create sets of vertices pointing to
 * different leaves in the pipeline tree, and pass them around as renderable
 * objects.
 */

var v1 = new BatchGL.VertexSet(lion, [ /* some vertices */ ]);
var v2 = new BatchGL.VertexSet(lion, [ /* more vertices */ ]);
var v3 = new BatchGL.VertexSet(tiger, [ /* more vertices */ ]);
var v4 = new BatchGL.VertexSet(bear, [ /* more vertices */ ]);
var v5 = new BatchGL.VertexSet(bear, [ /* more vertices */ ]);

/*
 * You can buffer vertices in any order: BatchGL will optimize the underlying
 * calls so that it doesn't matter.
 */

v1.buffer();
v5.buffer();
v4.buffer();
v3.buffer();
v2.buffer();


/*
 * The following renders any buffered vertices. It optimizes the underlying
 * WebGL buffering and drawing according to the rendering tree set up above, to
 * maximize batching and to minimize expensive context switches.
 */

program.render();
```


API Docs
--------------------------------------------------------------------------------

### BatchGL.Context

The BatchGL Context object holds a reference to a `<canvas>` element and its
corresponding WebGL context.

#### Methods:

* `new Context(canvas)`. The Context constructor takes a canvas object and
  initializes its `gl` object by calling the HTML5 `getContext` method.
* `.updateSize()`. This updates the `width` and `height` properties of the
  `<canvas>` element to be equal to their container's CSS box-sizing. It also
  updates the WebGL viewport to be the same.

#### Public Properties

* `canvas`, the `<canvas>` element.
* `gl`, the WebGL context object.


### BatchGL.TreeNode

TreeNode is the base class for any of the classes that make up the BatchGL
rendering tree: `Root`, `Step`, and `Leaf`. TreeNodes are never instantiated
directly, and are just a convenient holding place for shared callback stubs.

#### Class Methods:

* `.extend(Derived)` sets up the prototype chain so that Derived extends the
  class, and also copies over any class methods from the base class to Derived.
  If Derived is a function, it will use the function as the constructor; if
  Derived is an object, it will create a constructor, make it extend the base
  class, and then add any properties from the given object to the derived
  constructor's prototype. In any case, it returns the derived constructor
  function.

#### Public Methods:

* `new TreeNode()`. The TreeNode constructor takes any number of arguments, and
  passes them all to its overridable `init` method.
* `.init()`, a method stub. Client code can override the `init` method to do
  something when a node is initialized.
* `.run()`, a method stub. Client code can override the `run` method to do work
  when BatchGL is processing a `render` call and has reached the current node in
  the tree.

#### Framework-Reserved Methods

* `.render()`, a method stub that gets overridden by the derived node classes.
  Client code probably shouldn't override this method. `render` is called to
  render the current node.


### BatchGL.Root

The Root class defines the roots of rendering trees. You might set up a WebGL
program in the root, and use it for all subsequent calls; if you have multiple
programs, you might not do much here at all except for some basic environment
setup.

#### Public Methods

* `new Root(context)` creates a new Root object for the given Context object.
  It also calls the overridable `.init()` method inherited from TreeNode.
* `.render()` calls the `.run()` method, and then calls `render` on all of the
  root's children.

#### Framework-Reserved Methods

* `.add(child)` adds a TreeNode child to the Root. Steps (and Leaves) call this
  method automatically on their parents, so you shouldn't need to call this
  method manually when constructing a rendering tree.

#### Public Properties

* `context` holds the Context object for the root.


### BatchGL.Step

The Step class is for intermediate steps in the rendering tree. For example,
you might bind textures in a step, which would ensure that any calls to the
leaves beneath them would be batched into a single texture binding call. If
you're using multiple programs, you probably want the programs to be
implemented as Step classes underneath a single Root.

#### Public Methods

* `new Step(parent)` creates a new Step object underneath the given parent Root
  or Step node. It also calls the overridable `.init()` method inherited from
  TreeNode.
* `.render()`, much like the Root object, calls the Step's `run()` method and
  then calls `render` on all of its children.

#### Framework-Reserved Methods

* `.add(child)`, like the Root's `.add()` method, adds a TreeNode child to the
  Step. Since Steps and Leaves call this automatically in their constructors,
  you shouldn't need to call this manually when constructing a rendering tree.

#### Public Properties

* `context` is the Step's Context object.
* `parent` is the Step's parent.


### BatchGL.Leaf

The Leaf class defines the leaves of a rendering tree, and are what do the
actual buffering and drawing of vertices. Leaves should ideally be cheap to
switch: binding things like uniforms here is a good idea.

#### Public Methods

* `new Leaf(parent)` creates a new Leaf object underneath the given Root or
  Step parent. It also calls the overridable `.init()` method inherited from
  TreeNode.
* `.buffer(vertexSet)` is an overriddable method stub for buffering VertexSet
  instances. You should put WebGL buffering calls in here.
* `flush()` is an overridable method stub for flushing buffered vertices. You
  should put WebGL draw calls here.
* `.render()`, much like the other TreeNode rendering methods, calls the Leaf's
  `.run()` method. However, the similarities stop there: it then calls its own
  `.buffer()` method on each buffered VertexSet, and assuming that it buffered
  some vertices, then calls `.flush()`.

#### Framework-Reserved Methods

* `._bufferVertex()` buffers a VertexSet into the Leaf's rendering queue.
  VertexSets call this method automatically when you call their `.buffer()`
  method, so you should never have to call this yourself.

#### Public Properties

* `parent` is the Leaf's TreeNode parent.
* `context` is the Leaf's Context object.


### BatchGL.VertexSet

The VertexSet class defines a set of vertices for a particular leaf in the
rendering tree. VertexSets are easy objects to pass around, and you can just
call their `.buffer()` method when you want to tell the rendering tree that you
want to render the set. Whenever you want to flush the frame, calling
`.render()` on the tree's root node will flush all of the buffered vertices.

#### Public Methods

* `new VertexSet(leaf, vertices)` creates a new VertexSet for the given leaf.
  The vertices array is an optional array of numeric vertices; if you don't
  pass one into the constructor, you'll have to pass one in later with a
  `.setVertices` call before attempting to buffer the set.
* `.setVertices(vertices)` takes an array of numeric vertices, and creates a
  Float32Array out of them and assigns it to the `vertices` property.
* `.buffer()` buffers the vertex into its Leaf parent for rendering. Note that
  it won't actually be rendered until a subsequent `.render()` call on the root
  of the rendering tree (which you should probably call at the end of your
  frame).

#### Public Properties

* `leaf` is the parent Leaf object.
* `vertices` is a Float32Array of vertices.



Development Notes
--------------------------------------------------------------------------------

To run the tests, make sure you've run an `npm install` at some point, and then
run `script/test 8000` (or pass in the numerical port of your choice).

If you want to peruse the code, tell me about bugs, or submit patches: [a link
to the repo](https://github.com/reissbaker/batchgl).
