const express = require("express");
const router = new express.Router();
const shopController = require("../Controllers/shopController");
router.get("/", shopController.homePage); //middlware runs, then when complete, calls next part of requst
router.post("/add", shopController.createShop);
router.get("/shops", shopController.getShops);
module.exports = router;
