const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { create, findAll, remove } = require("./slider.service");

const addSlider = catchAsync(async (req, res, next) => {
  const { name, size } = req.body;

  if (!name) return next(new AppError(" name is required", 400));

  if (!size) return next(new AppError(" size is required", 400));

  const files = req.files;

  if (!files.length) return next(new AppError(" Images is required  ", 400));

  const basePath = `public/uploads/`;

  filesNames = files.map((image) => {
    return `${basePath}${image.filename}`;
  });

  const result = await create(name, filesNames, size);

  res.status(201).json({ result });
});

const findSliders = catchAsync(async (req, res, next) => {
  const size = parseInt(req.params.size);
  const slider = await findAll(req.query, size);
  if (!slider.length) {
    return next(new AppError("slider not found ", 404));
  }
  res.status(200).json({ slider });
});

const deleteSlider = catchAsync(async (req, res, next) => {
  const result = await remove(req.params.id);

  res.status(200).json({ result });
});

module.exports = {
  addSlider,
  findSliders,
  deleteSlider,
};
