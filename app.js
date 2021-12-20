const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const { auth } = require("express-oauth2-jwt-bearer");
const cors = require("cors");
require("./db/mongoose"); //ensures mongoose runs and connects
const routes = require("./Routes/index");
app.use(cors());
// Takes the raw requests and turns them into usable properties on req.body
/* app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); */
//Body Parser deprecated as of Express 4.16
app.use(express.json());
app.use(express.urlencoded());
//routes, imported from routes folder above

const checkJwt = auth({
  issuerBaseURL: "https://dev-hr-9upb4.us.auth0.com",
  audience: "http://localhost:3000",
});

// Define an endpoint that must be called with an access token
app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your Access Token was successfully validated!",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
