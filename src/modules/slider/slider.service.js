const { uploadToCloudinary, deleteImage } = require("../../utils/cloudinary");
const paginationa = require("../../utils/paginationa");
const { sliderModel } = require("./slider.model");

const create = async (sliderName, sliderImages, sliderSize) => {
  const imagesUrl = [];

  for await (const Image of sliderImages) {
    console.log(Image);
    const newPath = await uploadToCloudinary(Image);
    imagesUrl.push({
      public_id: newPath.public_id,
      url: newPath.url,
    });
  }

  const slider = await sliderModel.create({
    name: sliderName,
    images: imagesUrl,
    size: sliderSize,
  });

  return slider;
};

const findAll = async (query, size) => {
  const { skip, limit } = paginationa(query);

  const slider = await sliderModel.find({ size: size }).skip(skip).limit(limit);

  return slider;
};
const remove = async (sliderId) => {
  const slider = await sliderModel.findById(sliderId);

  if (!slider) return "Invalid ID ";

  for (const iterator of slider.images) {
    console.log(iterator.public_id);
    const res = await deleteImage(iterator.public_id);
    console.log(res);
  }

  const deleteDocument = await sliderModel.deleteOne({ _id: sliderId });

  return deleteDocument;
};

module.exports = {
  create,
  findAll,
  remove,
};
