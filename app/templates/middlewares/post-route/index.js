'use strict';


module.exports = function(config, app) {

  require('./default')(config, app);
  require('./errors')(config, app);

};

