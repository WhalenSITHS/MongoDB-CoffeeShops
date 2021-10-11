exports.middlewareSample = (req, res, next) => {
  req.name = "TEST"; //this runs before the response is sent to the user
  next(); //cues the next step of the response to occur
};
//for the next example we need to set up some additional middleware in app.js to allow the requests body to be readable
exports.authMiddleware = (req, res, next) => {
  if (req.body.user) {
    next();
  } else {
    //throw new Error("No user");
    res.json("you must be signed in");
  }
};
exports.authPage = (req, res, next) => {
  try {
    res.json(req.body.user);
  } catch (error) {
    console.log(error);
    res.json("User not signed in");
  }
};
exports.homePage = (req, res) => {
  const stores = ["Dunkin", "Tim Hortons", "Starbucks"];
  try {
    console.log(req.name); //we get req.name from the middleware but WE MUST call it in index
    res.json([stores, req.name]); //if we want to send multiple "things" back to the user we need to use an array or object. Can't simply use , as that denotes status codes
  } catch (error) {
    console.log(error);
  }
};
