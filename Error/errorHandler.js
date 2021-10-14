//creates global error handler so we don't have to do try catch everywhere

exports.catchErrors = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
};
//we need an additional error handler for missing routes
exports.notFound = async (req, res, next) => {
  res.status(404).send({
    status: 404,
    error: "Sorry we can't find that route",
  });
};
