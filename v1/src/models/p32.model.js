const Mongoose = require("mongoose");

const P32Schema = Mongoose.Schema({
  siteId: {
    type: Mongoose.Types.ObjectId,
    ref: "sites",
  },
  discontinuitySetId: { type: Number },
  intensity: { type: Mongoose.Types.Decimal128 },
});

const P32Model = Mongoose.model("P32", P32Schema);

module.exports = P32Model;
