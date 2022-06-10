const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");
const Logger = require("../logger/logger");
const logger = Logger.getLogger("./controllers/product");

const createProduct = async (req, res) => {
  logger.info(`Create product body`, req.body);
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products });
};

module.exports = {
  createProduct,
  getAllProducts,
};
