!function(mocha) {
  'use strict';

  mocha.checkLeaks();
  mocha.globals(['chai', 'BatchGl', 'mocha', 'BatchGlMocks']);
  mocha.run();
}(mocha);
