const { StatusCodes } = require("http-status-codes");
const path = require("path");
const Logger = require("../logger/logger");
const logger = Logger.getLogger("./controllers/uploads");
const uploadProductImage = async (req, res) => {
  //   logger.info(JSON.stringify(req.files));
  const productImage = req.files.image;
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  return res.status(StatusCodes.OK).json({
    image: { src: `/uploads/${productImage.name}` },
  });
};

module.exports = {
  uploadProductImage,
};
