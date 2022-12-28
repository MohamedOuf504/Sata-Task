const uploadOptions = require("../../utils/upload.multer");
const {
  addAdvertisement,
  deleteAdvertisement,
  findAdvertisement,
} = require("./advertisement.controller");

const advertisementRoute = require("express").Router();

advertisementRoute.get("/", findAdvertisement);
advertisementRoute.post("/", uploadOptions.single("ads"), addAdvertisement);
advertisementRoute.delete("/:id", deleteAdvertisement);

module.exports = advertisementRoute;
