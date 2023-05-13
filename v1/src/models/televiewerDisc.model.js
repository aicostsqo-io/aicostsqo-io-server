const Mongoose = require("mongoose");

const TeleviewerDiscSchema = Mongoose.Schema(
  {
    rpId: {
      type: Mongoose.Types.ObjectId,
      ref: "rps",
    },
    siteId: {
      type: Mongoose.Types.ObjectId,
      ref: "sites",
    },
    dip: Number,
    dipDirection: Number,
    pX: Mongoose.Types.Decimal128,
    pY: Mongoose.Types.Decimal128,
    pZ: Mongoose.Types.Decimal128,
    nX: Mongoose.Types.Decimal128,
    nY: Mongoose.Types.Decimal128,
    nZ: Mongoose.Types.Decimal128,
    holeNumber: Number,
    typeOfHole: String,
    imageOrMeshOfFractureInterpolation: String,
    explanation: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("televiewerDiscs", TeleviewerDiscSchema);
