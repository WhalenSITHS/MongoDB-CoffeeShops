const express = require("express");
const router = new express.Router();

router.get("/", (req, res) => {
  const teacher = { name: "Whalen", subject: "Computer Science", tenure: true };
  try {
    // return res.send("We're Live");
    //res.json(teacher);
    //can only send back 1 response
    //res.json(req.query);
    //can access the request here as well
  } catch (err) {
    console.log(err);
  }
});
router.get("/teacher/:name", (req, res) => {
  //try the url /teacher/whalen
  try {
    res.json(req.params.name);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
