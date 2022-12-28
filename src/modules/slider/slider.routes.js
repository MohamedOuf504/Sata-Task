const uploadOptions = require("../../utils/upload.multer");
const { addSlider, findSliders, deleteSlider } = require("./slider.controller");

const sliderRoute = require("express").Router();

sliderRoute.post("/", uploadOptions.array("images", 5), addSlider);
sliderRoute.get("/:size", findSliders);
sliderRoute.delete("/:id", deleteSlider);

module.exports = {
  sliderRoute,
};
