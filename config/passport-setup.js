const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config({ path: "secret.env" });
console.log(process.env.clientID);
passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      callbackURL: "/auth/google/redirect",
      clientID: `${process.env.clientID}`,
      clientSecret: `${process.env.clientSecret}` /* add your client secret here */,
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      console.log("passport callback function fired:");
      console.log(profile);
    }
  )
);
