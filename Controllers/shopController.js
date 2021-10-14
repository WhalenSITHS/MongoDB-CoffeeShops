exports.homePage = (req, res) => {
  const stores = ["Dunkin", "Tim Hortons", "Starbucks"];

  res.json(stores); //if we want to send multiple "things" back to the user we need to use an array or object. Can't simply use , as that denotes status codes
};
