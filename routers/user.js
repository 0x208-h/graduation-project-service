const express = require("express");

const router = express.Router();
const userCtrl = require("../controller/user");
const auth = require("../middleware/token");

router.post("/user/login", userCtrl.login);

router.get("/user", auth, userCtrl.getCurrentUser);

module.exports = router;
