const { StatusCodes } = require("http-status-codes");
const path = require("path");
const { BadRequest } = require("../errors");
const Logger = require("../logger/logger");
const logger = Logger.getLogger("./controllers/uploads");
const uploadProductImage = async (req, res) => {
  //   logger.info(JSON.stringify(req.files));

  //check file exists
  if (!req.files) {
    throw new BadRequest("No Image uploaded");
  }
  const productImage = req.files.image;

  // check file type
  if (!productImage.mimetype.startsWith("image")) {
    throw new BadRequest("Please upload a image");
  }

  //check file size
  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new BadRequest("File is larger than 1MB");
  }
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
