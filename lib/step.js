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
