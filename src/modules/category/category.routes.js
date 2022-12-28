const uploadOptions = require("../../utils/upload.multer");
const {
  addCategory,
  findCategories,
  deleteCategory,
  updateCategory,
} = require("./category.controller");

const categoryRoute = require("express").Router();

categoryRoute.post("/", uploadOptions.single("image"), addCategory);
categoryRoute.get("/", findCategories);
categoryRoute.delete("/:id", deleteCategory);
categoryRoute.put("/:id", uploadOptions.single("image"), updateCategory);

module.exports = categoryRoute;
