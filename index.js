!function(mocha) {
  'use strict';

  //mocha.checkLeaks();
  mocha.options.ignoreLeaks = true;
  mocha.globals(['chai', 'batchGl', 'mocha', 'batchGlMocks']);
  mocha.run();
}(mocha);
