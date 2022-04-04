const express = require("express");

const router = express.Router();

router.use('/', require('./user'))

router.use('/goods', require('./goods'))

module.exports = router;
