'use strict';


module.exports = function(app) {

  require('./default')(app);
  require('./errors')(app);

};

