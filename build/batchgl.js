!function(window) {
  'use strict';

  var BatchGL = window.BatchGL;

  var BatchGL = window.BatchGL = {
    noConflict: function() {
      window.BatchGL = BatchGL;
      return BatchGL;
    },
    extend: function(Base, derived) {
      var Derived,
          Temp = function() {};

      Derived = ownConstructor(derived) || extendingConstructor(Base);

      Temp.prototype = Base.prototype;
      Derived.prototype = new Temp;

      mixin(Derived.prototype, derived);
      Derived.prototype.constructor = Derived;
      mixin(Derived, Base);

      return Derived;
    }
  };

  function ownConstructor(derived) {
    if(derived.hasOwnProperty('constructor')) return derived.constructor;
    return null;
  }

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

  function Extendable() { this.init.apply(this, arguments); }
  Extendable.prototype.init = function() {};
  Extendable.extend = function(Derived) {
    return exports.extend(this, Derived);
  };

  exports.Extendable = Extendable;

}(BatchGL);
!function(exports) {
  'use strict';

  var WEBGL_CTX = 'webgl',
      VENDOR_WEBGL_CTX = 'experimental-webgl';


  var Extendable = exports.Extendable;

  /*
   * Class Definition
   * ---------------------------------------------------------------------------
   */

  var Context = Extendable.extend({
    constructor: function(canvas) {
      this.canvas = canvas;
      this.gl = initWebGl(this.canvas);
      Extendable.apply(this, arguments);
    },


    /*
     * ### updateSize
     *
     * Updates the instance's size, and the size of its WebGL context. You must
     * call this method if you manually add the canvas element to the DOM with the
     * `el()` method, rather than using `appendTo`.
     */

    updateSize: function() {
      var canvas = this.canvas;

      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      this.gl.viewport(0, 0, canvas.width, canvas.height);
    }
  });


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

  var TreeNode = exports.Extendable.extend({
    run: function() {},
    render: function() {}
  });

  exports.TreeNode = TreeNode;

}(BatchGL);
!function(exports) {
  'use strict';

  var TreeNode = exports.TreeNode;

  var Root = TreeNode.extend({
    constructor: function(context) {
      this.context = context;
      this.children = [];

      TreeNode.apply(this, arguments);
    },
    render: function() {
      this.run();
      for(var i = 0, l = this.children.length; i < l; i++) {
        this.children[i].render();
      }
    },
    add: function(child) {
      this.children.push(child);
      child.context = this.context;
    }
  });

  exports.Root = Root;

}(BatchGL);
!function(exports) {
  'use strict';

  var TreeNode = exports.TreeNode;

  var Step = TreeNode.extend({
    constructor: function(parent) {
      this.context = null;
      this.parent = parent;
      this.children = [];

      parent.add(this);

      TreeNode.apply(this, arguments);
    },
    render: function() {
      this.run();
      for(var i = 0, l = this.children.length; i < l; i++) {
        this.children[i].render();
      }
    },
    add: function(child) {
      this.children.push(child);
      child.context = this.context;
    }
  });

  exports.Step = Step;

}(BatchGL);
!function(exports) {
  'use strict';

  var TreeNode = exports.TreeNode;

  var Leaf = TreeNode.extend({
    constructor: function(parent) {
      this.parent = parent;
      this.context = null;
      this._buffer = [];

      parent.add(this);

      TreeNode.apply(this, arguments);
    },

    _bufferVertex: function(vSet) {
      this._buffer.unshift(vSet);
    },

    render: function() {
      var buffered = this._buffer.length !== 0;
      this.run();
      while(this._buffer.length > 0) {
        this.flush(this._buffer.pop());
      }
    },

    flush: function(vSet) {}
  });


  exports.Leaf = Leaf;

}(BatchGL);
!function(exports) {
  'use strict';

  var Extendable = exports.Extendable;

  var VertexSet = Extendable.extend({
    constructor: function(leaf) {
      this.leaf = leaf;

      Extendable.apply(this, arguments);
    },
    buffer: function() {
      this.leaf._bufferVertex(this);
    }
  });

  exports.VertexSet = VertexSet;

}(BatchGL);
!function(exports) {
  'use strict';

  var Extendable = exports.Extendable;

  exports.Memory = Extendable.extend({
    constructor: function(arrayish) {
      this.store = arrayish;
      Extendable.apply(this, arguments);
    },
    get: function(i) {
      return this.store[i];
    },
    set: function(i, val) {
      this.store[i] = val;
      return val;
    }
  });

}(BatchGL);
!function(exports) {
  'use strict';

  var Extendable = exports.Extendable;

  exports.VirtualMemory = Extendable.extend({
    constructor: function(memory, start) {
      this.start = start || 0;
      this.memory = memory;
    },
    get: function(i) {
      return this.memory.get(this.start + i);
    },
    set: function(i, val) {
      this.memory.set(this.start + i, val)
      return val;
    }
  });

}(BatchGL);
!function(exports) {
  'use strict';

  var VirtualMemory = exports.VirtualMemory;

  var BOUNDS_CHECK_ERROR = 'Attempt to access illegal MemoryBlock location: ';

  exports.BoundedVirtualMemory = VirtualMemory.extend({
    constructor: function(memory, start, length) {
      this.end = (start || 0) + (length || arrayish.length) - 1;
      VirtualMemory.apply(this, arguments);
    },
    get: function(i) {
      var loc = this.start + i;
      if(loc < this.start || loc > this.end) {
        throw new Error(BOUNDS_CHECK_ERROR + loc + '.');
      }
      return this.memory.get(this.start + i);
    },
    set: function(i, val) {
      var loc = this.start + i;
      if(loc < this.start || loc > this.end) {
        throw new Error(BOUNDS_CHECK_ERROR + loc + '.');
      }
      this.memory.set(this.start + i, val);
      return val;
    }
  });

}(BatchGL);
