const Shop = require("../Models/Stores");
exports.homePage = (req, res) => {
  const stores = ["Dunkin", "Tim Hortons", "Starbucks"];
  try {
    console.log(req.name); //we get req.name from the middleware but WE MUST call it in index
    res.json([stores, req.name]); //if we want to send multiple "things" back to the user we need to use an array or object. Can't simply use , as that denotes status codes
  } catch (error) {
    console.log(error);
  }
};

exports.createShop = async (req, res) => {
  try {
    const shop = new Shop(req.body);
    await shop.save();
    res.json(shop);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.getShops = async (req, res) => {
  try {
    const shops = await Shop.find();
    res.json(shops);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.updateShop = async (req, res) => {
  // find and update the store
  const store = await Shop.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new store instead of the old one
    runValidators: true, //built into mongoose, validates update fits the model
  }).exec();

  res.json(store);
  // Redriect them the store and tell them it worked
};

exports.deleteShop = async (req, res) => {
  try {
    const shop = await Shop.findByIdAndDelete(req.params.id);
    if (!shop) {
      res.status(404).send();
    }
    res.send(`${shop} was removed`);
  } catch (error) {
    res.status(500).send(error);
  }
};
