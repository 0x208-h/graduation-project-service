const express = require("express");

const router = express.Router();
const goodCtrl = require("../controller/goods");
const auth = require("../middleware/token");

router.get("/all", auth, goodCtrl.getAllGoodsInfo);

router.delete('/:id', auth, goodCtrl.deleteGoodsInfo);

module.exports = router;
