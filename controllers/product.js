const { StatusCodes } = require("http-status-codes");
const Product = require("../models/Product");

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(StatusCodes.OK).json({ product });
};

const getAllProducts = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "all products" });
};


module.exports = {
  createProduct,
  getAllProducts,
};
