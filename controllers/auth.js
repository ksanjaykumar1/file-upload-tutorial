const { StatusCodes } = require("http-status-codes");
const { BadRequest, Unauthenticated } = require("../errors");
const User = require("../models/User");
const Logger = require("../logger/logger");
const logger = Logger.getLogger("./controllers/auth.js");

const register = async (req, res) => {
  const user = await User.create(req.body);
  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ user: { userId: user._id, name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest("Please provide email id and password to login");
  }
  const user = await User.findOne({ email });

  if (!user) {
    logger.info("User not found");
    throw new Unauthenticated("Invalid Credentials");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Unauthenticated("Invalid Credentials");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
