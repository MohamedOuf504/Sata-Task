const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const advertisementSchema = new Schema({
    ads: {
    type: Object,
  },
});

const advertisementModel = mongoose.model("advertisement", advertisementSchema);

module.exports = {
    advertisementModel,
};
