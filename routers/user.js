const express = require("express");

const router = express.Router();
const userCtrl = require("../controller/user");
const auth = require("../middleware/token");

router.post("/user/login", userCtrl.login);

router.get("/user", auth, userCtrl.getCurrentUser);

router.get("/user/all", auth, userCtrl.allUsersInfo)

router.post('/user/add', auth, userCtrl.addUserInfo);

router.delete('/user/:id', auth, userCtrl.deleteUserInfo);

module.exports = router;
