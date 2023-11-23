const Mongoose = require("mongoose");

const P10Schema = Mongoose.Schema({
  siteId: {
    type: Mongoose.Types.ObjectId,
    ref: "sites",
  },
  discontinuitySetId: { type: Number },
  intensity: { type: Number },
});

const P10Model = Mongoose.model("P10", P10Schema);

module.exports = P10Model;
