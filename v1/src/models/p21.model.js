const Mongoose = require("mongoose");

const P21Schema = Mongoose.Schema({
  siteId: {
    type: Mongoose.Types.ObjectId,
    ref: "sites",
  },
  discontinuitySetId: { type: Number },
  intensity: { type: Mongoose.Types.Decimal128 },
});

const P21Model = Mongoose.model("P21", P21Schema);

module.exports = P21Model;
