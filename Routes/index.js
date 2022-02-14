const express = require("express");
const router = new express.Router();
const shopController = require("../Controllers/shopController");
const authController = require("../Controllers/authController");
router.get("/", shopController.homePage); //middlware runs, then when complete, calls next part of requst
router.post("/add", shopController.createShop);
router.get("/shops", shopController.getShops);
router.patch("/shops/:id", shopController.updateShop);
router.delete("/shops/:id", shopController.deleteShop);

router.post("/register", authController.register);
router.post("/login", authController.login);
/* router.post("/login", function (req, res) {
  User.findOne(
    {
      username: req.body.username,
    },
    function (err, user) {
      if (err) throw err;

      if (!user) {
        res.status(401).send({
          success: false,
          msg: "Authentication failed. User not found.",
        });
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.sign(user.toJSON(), settings.secret);
            // return the information including token as JSON
            res.json({ success: true, token: "JWT " + token });
          } else {
            res.status(401).send({
              success: false,
              msg: "Authentication failed. Wrong password.",
            });
          }
        });
      }
    }
  );
}); */

module.exports = router;
