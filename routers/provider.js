const express = require("express");

const router = express.Router();
const providerCtrl = require("../controller/provider");
const auth = require("../middleware/token");

router.get("/list", auth, providerCtrl.list);

module.exports = router;
