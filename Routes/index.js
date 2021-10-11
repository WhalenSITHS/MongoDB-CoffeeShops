const express = require("express");
const router = new express.Router();
const shopController = require("../Controllers/shopController");
router.get("/", shopController.middlewareSample, shopController.homePage); //middlware runs, then when complete, calls next part of requst
router.get("/auth", shopController.authMiddleware, shopController.authPage);
module.exports = router;
