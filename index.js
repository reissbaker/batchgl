!function(mocha) {
  'use strict';

  //mocha.checkLeaks();
  mocha.options.ignoreLeaks = true;
  mocha.globals(['chai', 'BatchGl', 'mocha', 'BatchGlMocks']);
  mocha.run();
}(mocha);
