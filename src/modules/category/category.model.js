const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: Object,
  },
});

const categoryModel = mongoose.model("category", categorySchema);

module.exports = {
  categoryModel,
};
