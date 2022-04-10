const express = require("express");

const router = express.Router();
const homeCtrl = require("../controller/home");
const auth = require("../middleware/token");

router.get("/user", auth, homeCtrl.getUsers);

router.get("/order", auth, homeCtrl.getOrders);

router.get("/all", auth, homeCtrl.getAllInfo);

module.exports = router;
