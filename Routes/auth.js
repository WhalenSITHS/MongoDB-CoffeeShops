const mongoose = require("mongoose");
const passport = require("passport");
const settings = require("../config/settings");
require("../config/passport")(passport);
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../Models/User");
const generateToken = require("../config/passport");
router.post("/register", function (req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({ success: false, msg: "Please pass username and password." });
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });
    // save the user
    newUser.save(function (err) {
      if (err) {
        return res.json({ success: false, msg: "Username already exists." });
      }
      res.json({ success: true, msg: "Successful created new user." });
    });
  }
});
router.post("/login", function (req, res) {
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
        user.comparePassword(req.body.password, async function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            const tokenObject = await generateToken(user);
            // return the information including token as JSON
            res.json({ success: true, tokenObject });
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
});

module.exports = router;
