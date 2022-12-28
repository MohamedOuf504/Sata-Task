const uploadOptions = require("../../utils/upload.multer");
const {
  addSponsor,
  deleteSponsor,
  findSponsor,
} = require("./sponsor.controller");

const sponsorRoute = require("express").Router();

sponsorRoute.get("/", findSponsor);
sponsorRoute.post("/", uploadOptions.single("logo"), addSponsor);
sponsorRoute.delete("/:id", deleteSponsor);

module.exports = sponsorRoute;
