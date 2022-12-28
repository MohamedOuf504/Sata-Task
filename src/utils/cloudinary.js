const cloudinary = require("cloudinary").v2;
const config = require("../configuration/config.service");
var fs = require("fs");
const AppError = require("./appError");

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
});

const uploadToCloudinary = async (fileString) => {
  try {
    const { uploader } = cloudinary;

    const res = await uploader.upload(fileString);

    fs.unlinkSync(fileString);

    return res;
  } catch (error) {
    throw new AppError("Error during upload to cloudinary ", 500, error);
  }
};

const deleteImage = async (publicId) => {
  try {
    const { uploader } = cloudinary;
    const res = await uploader.destroy(publicId);

    return res;
  } catch (error) {
    throw new AppError("Error during from delete  ", 500, error);
  }
};
module.exports = { uploadToCloudinary, deleteImage };
