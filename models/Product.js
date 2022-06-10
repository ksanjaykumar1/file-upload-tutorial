const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name of the product is required"],
  },
  price: {
    type: Number,
    required: [true, "Price of the product is required"],
  },
  image: {
    type: String,
    required: [true, "Image path is is required"],
  },
});

module.exports = mongoose.model("Product", ProductSchema);
