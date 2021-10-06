# Getting Started with Express and MongoDB

---

## Basic Packages Needed To Get Started

###

Express: Framework for working with NodeJS  
Mongoose: For interacting with our DataBase  
Nodemon: For Hot Reloading
<br>

## Setting up the Server

<br>

We'll begin by setting up our app.js file
We need to import the require packages.  
We'll import the express framework and instantiate express. We will also set up the port for our server.

```JavaScript
const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
```

```JavaScript
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
```

Run the NPM script "dev". We should see the server up and running on port 3000.

### Our First Route

Let's create an index.js file in routes and create our first route. We'll need to export this function as a module to be consumed by our app.js

```JavaScript
const express = require("express");
const router = new express.Router();

router.get("/", (req, res) => {
  try {
    return res.send("We're Live");
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
```

Finally let's import this into app.js

```JavaScript
const routes = require("./Routes/index");
app.use("/", routes);
```

We can now open the browser and navigate to localhost:3000 and see our message.
