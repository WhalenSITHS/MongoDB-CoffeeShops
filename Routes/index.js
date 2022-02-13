const express = require("express");
const router = new express.Router();
const shopController = require("../Controllers/shopController");
var passport = require("passport");

require("../config/passport")(passport);
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(" ");
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
router.get("/", shopController.homePage); //middlware runs, then when complete, calls next part of requst
router.post("/add", shopController.createShop);
router.get(
  "/shops",

  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");

      if (!token) {
        throw new Error();
      }
      req.token = token;

      next();
    } catch (e) {
      res.status(401).send({ error: "Please authenticate." });
    }
  },
  shopController.getShops
);
/* router.get("/shops", function (req, res, next) {
  const token = req.header("Authorization").replace("Bearer ", "");
  console.log(token);
  next();
  res.send("tets");
}); */
router.patch("/shops/:id", shopController.updateShop);
router.delete("/shops/:id", shopController.deleteShop);
module.exports = router;
