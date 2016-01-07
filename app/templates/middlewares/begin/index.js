'use strict';


module.exports = function(app) {

/*  require('./static')({
    //root: __dirname,
    aliases: { '/': '/public' },
    //options: { maxAge: '1d' }, // default = 0;
  }, app); */
  require('./parsers')(app);
  require('./static')(app);

};

