const express = require("express");
const { createProduct, getAllProducts } = require("../controllers/product");
const { uploadProductImage } = require("../controllers/upload");
const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);
router.route('/uploads').post(uploadProductImage)

module.exports = router;
