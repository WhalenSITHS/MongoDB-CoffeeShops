const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const cors = require("cors");
require("./db/mongoose"); //ensures mongoose runs and connects
//const routes = require("./Routes/index");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Create middleware for checking the JWT
const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-hr-9upb4.us.auth0.com/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer
  audience: "http://localhost:3000", //replace with your API's audience, available at Dashboard > APIs
  issuer: "https://dev-hr-9upb4.us.auth0.com/",
  algorithms: ["RS256"],
});

// Enable the use of request body parsing middleware - code omitted

// create timesheets API endpoint - code omitted
app.get("/authorized", checkJwt, function (req, res) {
  res.send("Secured Resource");
});
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
