const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { create, findAll, remove, update } = require("./category.service");
const addCategory = catchAsync(async (req, res, next) => {
  const name = req.body.name;

  if (!name) return next(new AppError(" name is required", 400));

  
  const file = req.file;

  if (!file) return next(new AppError(" Image is required  ", 400));

  const fileName = req.file.filename;

  const basePath = `public/uploads/`;

  const result = await create(name, `${basePath}${fileName}`);

  res.status(201).json({ result });
});

const findCategories = catchAsync(async (req, res, next) => {
  const categories = await findAll(req.query);
  if (!categories.length) {
    return next(new AppError("categories not found ", 404));
  }
  res.status(200).json({ categories });
});

const deleteCategory = catchAsync(async (req, res, next) => {
  
  const result = await remove(req.params.id);

  res.status(200).json({ result });
});
const updateCategory = catchAsync(async (req, res, next) => {
  const { file, body } = req;
  const result = await update(req.params.id, file, body);

  res.status(200).json({ result });
});

module.exports = {
  addCategory,
  findCategories,
  deleteCategory,
  updateCategory,
};
