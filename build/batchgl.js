!function(window) {
  'use strict';

  var BatchGL = window.BatchGL;

  var BatchGL = window.BatchGL = {
    noConflict: function() {
      window.BatchGL = BatchGL;
      return BatchGL;
    },
    extend: function(Base, Derived) {
      var Temp = function() {};
      Temp.prototype = Base.prototype;

      Derived.prototype = new Temp;
      Derived.prototype.constructor = Derived;

      mixin(Derived, Base);

      return Derived;
    },
    _extendable: function(Base) {
      Base.extend = function(derived) {
        var Derived;
        if(typeof derived !== 'function') Derived = extendingConstructor(Base);
        else Derived = derived;

        BatchGL.extend(Base, Derived);
        if(typeof derived === 'object') mixin(Derived.prototype, derived);

        return Derived;
      };
      return Base;
    }
  };

  function extendingConstructor(Base) {
    return function() { Base.apply(this, arguments); };
  }

  function mixin(dest, src) {
    for(var prop in src) {
      if(src.hasOwnProperty(prop)) {
        dest[prop] = src[prop];
      }
    }
  }

}(window);
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

}(BatchGL);
!function(exports) {
  'use strict';

  exports._extendable(Root);
  function Root(context) {
    this.context = context;
    this.children = [];

    this.init.apply(this, arguments);
  }


  /*
   * Methods
   * ---------------------------------------------------------------------------
   */

  Root.prototype.init = function() {};
  Root.prototype.run = function() {};

  Root.prototype.render = function() {
    this.run();
    for(var i = 0, l = this.children.length; i < l; i++) {
      this.children[i].render();
    }
  };

  Root.prototype.add = function(child) {
    this.children.push(child);
    child.context = this.context;
  };


  exports.Root = Root;

}(BatchGL);
!function(exports) {
  'use strict';

  exports._extendable(Step);
  function Step(parent) {
    this.context = null;
    this.parent = parent;
    this.children = [];

    parent.add(this);

    this.init.apply(this, arguments);
  }

  Step.prototype.init = function() {};
  Step.prototype.run = function() {};

  Step.prototype.render = function() {
    this.run();
    for(var i = 0, l = this.children.length; i < l; i++) {
      this.children[i].render();
    }
  };

  Step.prototype.add = function(child) {
    this.children.push(child);
    child.context = this.context;
  };

  exports.Step = Step;

}(BatchGL);
!function(exports) {
  'use strict';

  exports._extendable(Leaf);
  function Leaf(parent) {
    this.parent = parent;
    this.context = null;
    this._buffer = [];

    parent.add(this);

    this.init.apply(this, arguments);
  }


  /*
   * Methods
   * ---------------------------------------------------------------------------
   */

  Leaf.prototype.init = function() {};
  Leaf.prototype.run = function() {};

  Leaf.prototype._bufferVertex = function(vertexSet) {
    this._buffer.unshift(vertexSet);
  };

  Leaf.prototype.render = function() {
    var buffered = this._buffer.length !== 0;
    this.run();
    while(this._buffer.length > 0) {
      this.buffer(this._buffer.pop());
    }
    if(buffered) this.flush();
  };

  Leaf.prototype.buffer = function(vertexSet) {};
  Leaf.prototype.flush = function() {};

  exports.Leaf = Leaf;

}(BatchGL);
!function(exports) {
  'use strict';

  exports._extendable(VertexSet);
  function VertexSet(leaf, vertices) {
    this.leaf = leaf;
    this.vertices = null;

    if(vertices) this.setVertices(vertices);
  }


  /*
   * Methods
   * ---------------------------------------------------------------------------
   */

  VertexSet.prototype.setVertices = function(vertices) {
    this.vertices = new Float32Array(vertices);
  };

  VertexSet.prototype.buffer = function() {
    this.leaf._bufferVertex(this);
  };

  exports.VertexSet = VertexSet;

}(BatchGL);
