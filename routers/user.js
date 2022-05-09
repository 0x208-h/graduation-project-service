const express = require("express");

const router = express.Router();
const userCtrl = require("../controller/user");
const auth = require("../middleware/token");

router.post("/user/login", userCtrl.login);

router.get("/user", auth, userCtrl.getCurrentUser);

router.get("/user/all", auth, userCtrl.allUsersInfo);

router.post("/user/add", auth, userCtrl.addUserInfo);

router.delete("/user/:id", auth, userCtrl.deleteUserInfo);

router.get("/user/:id", auth, userCtrl.getCurrentUser);

router.put("/user/:id", auth, userCtrl.updateUserInfo);

router.put("/user/permission/:id", auth, userCtrl.getUserPermissions);

module.exports = router;
