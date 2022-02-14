const User = require("../Models/User");
const bcrypt = require("bcryptjs");
exports.register = function (req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({ success: false, msg: "Please pass username and password." });
  } else {
    console.log(req.body.password);
    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });
    // save the user
    newUser.save(function (err) {
      if (err) {
        return res.json({ success: false, msg: "Username already exists." });
      }
      res.json({ success: true, msg: "Successful created new user.", newUser });
    });
  }
};
exports.login = async (req, res) => {
  try {
    let username = req.body.username;
    let password = req.body.password;
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Unable to login");
    }

    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send("user not found");
  }
};
