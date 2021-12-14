const express = require("express");
const port = process.env.PORT || 3001;
const app = express();
require("./db/mongoose"); //ensures mongoose runs and connects
const routes = require("./Routes/index");
// Takes the raw requests and turns them into usable properties on req.body
/* app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); */
//Body Parser deprecated as of Express 4.16
app.use(express.json());
app.use(express.urlencoded());
//routes, imported from routes folder above

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
