!function(mocha) {
  'use strict';

  mocha.checkLeaks();
  mocha.globals(['chai', 'BatchGL', 'mocha', 'BatchGLMocks']);
  mocha.run();
}(mocha);
