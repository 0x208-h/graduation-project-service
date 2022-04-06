const express = require("express");

const router = express.Router();
const orderCtrl = require("../controller/order");
const auth = require("../middleware/token");

router.get('/all', auth, orderCtrl.getAllOrder);


module.exports = router;
