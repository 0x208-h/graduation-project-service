const express = require("express");

const router = express.Router();

router.use("/", require("./user"));

router.use("/goods", require("./goods"));

router.use("/orders", require("./order"));

router.use("/home", require("./home"));

router.use("/provider", require("./provider"));

module.exports = router;
