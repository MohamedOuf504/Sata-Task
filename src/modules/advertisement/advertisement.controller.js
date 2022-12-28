const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { create, remove, findAll } = require("./advertisement.service");

const addAdvertisement = catchAsync(async (req, res, next) => {
  const file = req.file;
  console.log(req.body);

  if (!file) return next(new AppError(" Advertisement is required  ", 400));

  const fileName = req.file.filename;

  const basePath = `public/uploads/`;

  const result = await create(`${basePath}${fileName}`);

  res.status(201).json({ result });
});

const deleteAdvertisement = catchAsync(async (req, res, next) => {
  const result = await remove(req.params.id);

  res.status(200).json({ result });
});

const findAdvertisement = catchAsync(async (req, res, next) => {
  const advertisement = await findAll(req.query);
  if (!advertisement.length) {
    return next(new AppError(" advertisement not found ", 404));
  }
  res.status(200).json({ advertisement });
});
module.exports = {
  addAdvertisement,
  deleteAdvertisement,
  findAdvertisement,
};
