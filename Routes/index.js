const express = require("express");
const router = new express.Router();
const passport = require("passport");
require("../config/passport-setup");
const shopController = require("../Controllers/shopController");
router.get("/", shopController.homePage); //middlware runs, then when complete, calls next part of requst
router.post("/add", shopController.createShop);
router.get("/shops", shopController.getShops);
router.patch("/shops/:id", shopController.updateShop);
router.delete("/shops/:id", shopController.deleteShop);
// auth with google+
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// callback route for google to redirect to
router.get("/auth/google/redirect", (req, res) => {
  res.send("you reached the redirect URI");
});
module.exports = router;
