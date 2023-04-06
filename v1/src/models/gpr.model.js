const Mongoose = require("mongoose");

const GprSchema = Mongoose.Schema(
  {
    siteId: {
      type: Mongoose.Types.ObjectId,
      ref: "sites",
    },
    rectangleNumber: Number,
    shape: String,
    longitudinalProfileNumber: Number,
    traversalProfileNumber: Number,
    distance: Mongoose.Types.Decimal128,
    spacing: Mongoose.Types.Decimal128,
    dimension: {
      type: String,
      enum: ["1D", "2D", "3D"],
    },
    positionX: Mongoose.Types.Decimal128,
    positionY: Mongoose.Types.Decimal128,
    positionZ: Mongoose.Types.Decimal128,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("gprs", GprSchema);
