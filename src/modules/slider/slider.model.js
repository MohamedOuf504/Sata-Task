const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sliderSchema = new Schema({
  name: {
    type: String,
  },
  images: {
    type: [Object],
  },
  size: {
      type: Number,
      
  },
});

const sliderModel = mongoose.model("slider", sliderSchema);

module.exports = {
  sliderModel,
};
