exports.login = function (email, password, callback) {
  const bcrypt = require("bcrypt");
  const MongoClient = require("mongodb@3.1.4").MongoClient;
  const client = new MongoClient(
    "mongodb+srv://Whalen:" +
      configuration.MONGO_PASSWORD +
      "@cluster0.t1qxb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );

  client.connect(function (err) {
    if (err) return callback(err);

    const db = client.db("db-name");
    const users = db.collection("users");

    users.findOne({ email: email }, function (err, user) {
      if (err || !user) {
        client.close();
        return callback(err || new WrongUsernameOrPasswordError(email));
      }

      bcrypt.compare(password, user.password, function (err, isValid) {
        client.close();

        if (err || !isValid)
          return callback(err || new WrongUsernameOrPasswordError(email));

        return callback(null, {
          user_id: user._id.toString(),
          nickname: user.nickname,
          email: user.email,
        });
      });
    });
  });
};

exports.create = function (user, callback) {
  const bcrypt = require("bcrypt");
  const MongoClient = require("mongodb@3.1.4").MongoClient;
  const client = new MongoClient(
    "mongodb+srv://Whalen:" +
      configuration.MONGO_PASSWORD +
      "@cluster0.t1qxb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );

  client.connect(function (err) {
    if (err) return callback(err);

    const db = client.db("db-name");
    const users = db.collection("users");

    users.findOne({ email: user.email }, function (err, withSameMail) {
      if (err || withSameMail) {
        client.close();
        return callback(err || new Error("the user already exists"));
      }

      bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
          client.close();
          return callback(err);
        }

        user.password = hash;
        users.insert(user, function (err, inserted) {
          client.close();

          if (err) return callback(err);
          callback(null);
        });
      });
    });
  });
};

exports.getByEmail = function (email, callback) {
  const MongoClient = require("mongodb@3.1.4").MongoClient;
  const client = new MongoClient(
    "mongodb+srv://Whalen:" +
      configuration.MONGO_PASSWORD +
      "@cluster0.t1qxb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );

  client.connect(function (err) {
    if (err) return callback(err);

    const db = client.db("db-name");
    const users = db.collection("users");

    users.findOne({ email: email }, function (err, user) {
      client.close();

      if (err) return callback(err);
      if (!user) return callback(null, null);

      return callback(null, {
        user_id: user._id.toString(),
        nickname: user.nickname,
        email: user.email,
      });
    });
  });
};
