const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { create, remove, findAll } = require("./sponsor.service");

const addSponsor = catchAsync(async (req, res, next) => {
  const file = req.file;

  if (!file) return next(new AppError(" logo is required  ", 400));

  const fileName = req.file.filename;

  const basePath = `public/uploads/`;

  const result = await create(`${basePath}${fileName}`);

  res.status(201).json({ result });
});

const deleteSponsor = catchAsync(async (req, res, next) => {
  const result = await remove(req.params.id);

  res.status(200).json({ result });
});

const findSponsor = catchAsync(async (req, res, next) => {
  const sponsors = await findAll(req.query);
  if (!sponsors.length) {
    return next(new AppError(" Sponsors not found ", 404));
  }
  res.status(200).json({ sponsors });
});
module.exports = {
  addSponsor,
  deleteSponsor,
  findSponsor,
};
