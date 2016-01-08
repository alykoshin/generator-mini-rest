'use strict';


module.exports = function(app) {

/*  require('./static')({
    //root: __dirname,
    aliases: { '/': '/public' },
    //options: { maxAge: '1d' }, // default = 0;
  }, app); */
  require('./debug')(app);

  require('./parsers')(app);

  require('./security')(app);

  require('./static')(app);

};

