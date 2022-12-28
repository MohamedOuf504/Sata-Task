const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sponsorSchema = new Schema({
  logo: {
    type: Object,
  },
});

const sponsorModel = mongoose.model("sponsor", sponsorSchema);

module.exports = {
  sponsorModel,
};
