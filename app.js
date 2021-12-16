const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const authController = require("./Controllers/authController");
require("./db/mongoose"); //ensures mongoose runs and connects
const routes = require("./Routes/index");
const User = require("./Models/User");
// Takes the raw requests and turns them into usable properties on req.body
/* app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); */
//Body Parser deprecated as of Express 4.16

app.use(express.json());
app.use(express.urlencoded());
//routes, imported from routes folder above
const { auth } = require("express-openid-connect");

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: "http://localhost:3000",
  clientID: "e0hDlm7YlT7WYBqs2rHcPXB9N8qqaJ36",
  issuerBaseURL: "https://dev-hr-9upb4.us.auth0.com",
  secret: "LONG_RANDOM_STRING",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? `${req.oidc.user.name}` : "Logged out");
  console.log(req.oidc.user);
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    console.log(error, "test");
  }
}),
  app.patch("/users/:id", async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      ).exec();
      res.json(user);
    } catch (error) {
      console.log(error, "test");
    }
  }),
  app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
  });
