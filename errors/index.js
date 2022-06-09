const CustomAPIError = require("./custom-error");
const BadRequest = require("./bad-request");
const Unauthenticated = require("./unauthenticated");
const NotFoundError = require("./not-found");

module.exports = {
  CustomAPIError,
  BadRequest,
  Unauthenticated,
  NotFoundError,
};
