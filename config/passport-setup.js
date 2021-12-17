const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config({ path: "secrets.env" });
console.log(process.env.clientID);
passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      clientID: `${process.env.clientID}`,
      clientSecret: `${process.env.clientSecret}` /* add your client secret here */,
    },
    () => {
      // passport callback function
    }
  )
);
