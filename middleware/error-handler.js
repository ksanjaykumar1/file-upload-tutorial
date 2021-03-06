const { StatusCodes } = require("http-status-codes");
const Logger = require("../logger/logger");
const logger = Logger.getLogger("./middleware/error-handler.js");

const errorHandlerMiddleware = (err, req, res, next) => {
  logger.info(`err`, JSON.stringify(err));
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again",
  };

  // mongoose validation Error
  if (err.name === "ValidationError") {
    logger.info(JSON.stringify(err));
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");

    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // duplicate mongoose error
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate Value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // caste error
  if (err.name === "CastError") {
    customError.msg = `No item found with id : ${err.vaue}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
