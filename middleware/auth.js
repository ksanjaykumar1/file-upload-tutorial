const jwt = require("jsonwebtoken");
const { BadRequest, Unauthenticated } = require("../errors");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new BadRequest("Token missing");
  }

  try {
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userID: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new Unauthenticated("Authencation invalid");
  }
};

module.exports = authMiddleware;
