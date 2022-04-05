const express = require("express");

const router = express.Router();
const goodCtrl = require("../controller/goods");
const auth = require("../middleware/token");

router.get("/all", auth, goodCtrl.getAllGoodsInfo);

router.put("/updateStatus", auth, goodCtrl.updateStatus);

router.get('/:id', auth, goodCtrl.getGoodsInfo)

router.delete("/:id", auth, goodCtrl.deleteGoodsInfo);

// router.get('/level', auth, goodCtrl.getLevel)

router.post('/add', auth, goodCtrl.AddGoodsInfo)

module.exports = router;
