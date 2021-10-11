const express = require("express");
const router = new express.Router();
const shopController = require("../Controllers/shopController");
router.get("/", shopController.middlewareSample, shopController.homePage); //middlware runs, then when complete, calls next part of requst

module.exports = router;
