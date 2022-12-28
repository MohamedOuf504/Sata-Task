const { uploadToCloudinary, deleteImage } = require("../../utils/cloudinary");
const paginationa = require("../../utils/paginationa");
const { advertisementModel } = require("./advertisement.model");

const create = async (ads) => {
  const newPath = await uploadToCloudinary(ads);
  const advertisement = await advertisementModel.create({
    ads: { public_id: newPath.public_id, url: newPath.url },
  });
  return advertisement;
};

const remove = async (adsId) => {
  const ads = await advertisementModel.findById(adsId);
  if (!ads) return "Invalid ID ";
  await deleteImage(ads.ads.public_id);
  const deleteDocument = await advertisementModel.deleteOne({ _id: adsId });
  return deleteDocument;
};

const findAll = async (query) => {
  const { skip, limit } = paginationa(query);

  const ads = await advertisementModel.find({}).skip(skip).limit(limit);

  return ads;
};

module.exports = {
  create,
  remove,
  findAll,
};
