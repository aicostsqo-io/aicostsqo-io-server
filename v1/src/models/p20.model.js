const Mongoose = require("mongoose");

const P20Schema = Mongoose.Schema({
  siteId: {
    type: Mongoose.Types.ObjectId,
    ref: "sites",
  },
  discontinuitySetId: { type: Number },
  intensity: { type: Number },
});

const P20Model = Mongoose.model("P20", P20Schema);

module.exports = P20Model;
