const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
const routes = require("./Routes/index");
//routes, imported from routes folder above

app.use("/", routes);
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
