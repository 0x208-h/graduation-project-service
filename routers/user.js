const express = require("express");

const router = express.Router();
const userCtrl = require("../controller/user");
// const userValidate = require("../validate/user");
// const auth = require("../middleware/token")

router.get('/user', userCtrl.get )

module.exports = router;