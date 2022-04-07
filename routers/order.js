const express = require("express");

const router = express.Router();
const orderCtrl = require("../controller/order");
const auth = require("../middleware/token");

router.get('/all', auth, orderCtrl.getAllOrder);

router.get("/:id", auth, orderCtrl.getCurrentOrder)

module.exports = router;
