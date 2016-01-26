'use strict';

var router = require('express').Router();


// Data routes; use 'no-chache'
router.use( require('../../middlewares/nocache.js') );

// Request handling
router.use('/demo', require('./demo'));
router.use('/test', require('./test'));


module.exports = router;
