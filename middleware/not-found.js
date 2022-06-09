const { StatusCodes } = require("http-status-codes");

const notFoundMiddleware = (req, res) =>
  res.status(StatusCodes.NOT_FOUND).json({ msg: "route doesn't exist" });

module.exports = notFoundMiddleware;
