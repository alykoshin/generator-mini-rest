'use strict';


module.exports = function(config, app) {

/*  require('./static')({
    //root: __dirname,
    aliases: { '/': '/public' },
    //options: { maxAge: '1d' }, // default = 0;
  }, app); */
  require('./debug')(config, app);

  require('./parsers')(config, app);

  require('./security')(config, app);

  require('./static')(config, app);

};

