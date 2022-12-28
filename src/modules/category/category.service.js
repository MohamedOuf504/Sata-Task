const { uploadToCloudinary, deleteImage } = require("../../utils/cloudinary");
const paginationa = require("../../utils/paginationa");
const { categoryModel } = require("./category.model");

const create = async (categoryName, categoryImage) => {

  const newPath = await uploadToCloudinary(categoryImage);

  const category = await categoryModel.create({
    name: categoryName,
    image: { public_id: newPath.public_id, url: newPath.url },
  });

  return category;
};

const findAll = async (query) => {
  const { skip, limit } = paginationa(query);

  const categories = await categoryModel.find({}).skip(skip).limit(limit);
  
  return categories;
};

const remove = async (categoryId) => {
  const category = await categoryModel.findById(categoryId);
  if (!category) return "Invalid ID ";
  const destroy = await deleteImage(category.image.public_id);
  const deleteDocument = await categoryModel.deleteOne({ _id: categoryId });

  return deleteDocument;
};

const update = async (categoryId, image, body) => {
  const category = await categoryModel.findById(categoryId);
  let newPath = null;
  const updateObject = {};
  if (!category) return "Invalid ID ";

  if (image) {
    const destroy = await deleteImage(category.image.public_id);
    newPath = await uploadToCloudinary(`public/uploads/${image.filename}`);
    updateObject["image"] = { public_id: newPath.public_id, url: newPath.url };
  }
  if (body.name) {
    updateObject["name"] = body.name;
  }
  const updateDocument = await categoryModel.updateOne(
    {
      _id: categoryId,
    },
    { ...updateObject }
  );

  return updateDocument;
};

module.exports = {
  create,
  findAll,
  remove,
  update,
};
