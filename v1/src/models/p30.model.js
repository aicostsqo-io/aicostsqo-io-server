const Mongoose = require("mongoose");

const P30Schema = Mongoose.Schema({
  siteId: {
    type: Mongoose.Types.ObjectId,
    ref: "sites",
  },
  discontinuitySetId: { type: Number },
  intensity: { type: Number },
});

const P30Model = Mongoose.model("P30", P30Schema);

module.exports = P30Model;
