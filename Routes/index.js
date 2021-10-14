const express = require("express");
const router = new express.Router();
const shopController = require("../Controllers/shopController");
const { catchErrors } = require("../Error/errorHandler"); //add error handling
router.get("/", catchErrors(shopController.homePage)); //middlware runs, then when complete, calls next part of requst

module.exports = router;
