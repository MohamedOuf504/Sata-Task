const { uploadToCloudinary, deleteImage } = require("../../utils/cloudinary");
const paginationa = require("../../utils/paginationa");
const { sponsorModel } = require("./sponsor.model");

const create = async (sponsorLogo) => {
  const newPath = await uploadToCloudinary(sponsorLogo);

  const sponsor = await sponsorModel.create({
    logo: { public_id: newPath.public_id, url: newPath.url },
  });

  return sponsor;
};

const remove = async (sponsorId) => {
  const sponsor = await sponsorModel.findById(sponsorId);
  if (!sponsor) return "Invalid ID ";
  const destroy = await deleteImage(sponsor.logo.public_id);
  const deleteDocument = await sponsorModel.deleteOne({ _id: sponsorId });
  return deleteDocument;
};

const findAll = async (query) => {
  const { skip, limit } = paginationa(query);

  const sponsors = await sponsorModel.find({}).skip(skip).limit(limit);

  return sponsors;
};

module.exports = {
  create,
  remove,
  findAll,
};
