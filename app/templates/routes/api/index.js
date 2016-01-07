'use strict';

var router = require('express').Router();


router.use('/getSteps', require('./getSteps'));


module.exports = router;
