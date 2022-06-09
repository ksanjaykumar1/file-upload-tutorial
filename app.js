require("dotenv").config();
const express = require("express");
const app = express();
const Logger = require("./logger/logger");
const logger = Logger.getLogger("./app.js");

// local module imports
const connectDB = require("./db/connect");
const notFoundMiddleware = require("./middleware/not-found");

const port = process.env.PORT || 5000;
app.use(express.json({ extended: false }));

// custom middleware
app.use(notFoundMiddleware)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    logger.info("Connected to MongoDB");
    app.listen(port, () => {
      logger.info(`Server started on ${port}...`);
    });
  } catch (error) {
    process.exit(1);
  }
};

start();
