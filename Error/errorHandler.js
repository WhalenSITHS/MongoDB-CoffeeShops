//creates global error handler so we don't have to do try catch everywhere
//WE will wrap all of our controllers with this error handler to catch the sopecifci controller errors
exports.catchErrors = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

//we need an additional error handler for missing routes
exports.notFound = (req, res, next) => {
  res.status(404).send({
    status: 404,
    error: "Sorry we can't find that route",
  });
};
