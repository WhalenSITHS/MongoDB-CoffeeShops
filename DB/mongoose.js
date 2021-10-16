const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });
mongoose
  .connect(`${process.env.DATABASE}`, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to DB"));
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on("error", (err) => {
  console.error(`${err.message}`);
});
