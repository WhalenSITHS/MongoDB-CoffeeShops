const express = require("express");
const port = process.env.PORT || 3000;
const path = require("path");
const passport = require("passport");
const app = express();
const cors = require("cors");
require("./db/mongoose"); //ensures mongoose runs and connects
const routes = require("./Routes/index");
var auth = require("./Routes/auth");
app.use(cors());
// Pass the global passport object into the configuration function
const startPassport = require("./config/passport");

// This will initialize the passport object on every request
app.use(passport.initialize());
startPassport(passport);
// Takes the raw requests and turns them into usable properties on req.body
/* app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); */
//Body Parser deprecated as of Express 4.16
app.use(express.json());
app.use(express.urlencoded());
//routes, imported from routes folder above

app.use("/", routes);
app.use("/", auth);
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
