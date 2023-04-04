const Mongoose = require("mongoose");

const RpDiscSchema = Mongoose.Schema(
  {
    rpId: {
      type: Mongoose.Types.ObjectId,
      ref: "rps",
    },
    dip: {
      type: Number,
      required: true,
    },
    dipDirect: {
      type: Number,
      required: true,
    },
    pX: {
      type: Mongoose.Types.Decimal128,
      required: true,
    },
    pY: {
      type: Mongoose.Types.Decimal128,
      required: true,
    },
    pZ: {
      type: Mongoose.Types.Decimal128,
      required: true,
    },
    nX: {
      type: Mongoose.Types.Decimal128,
      required: true,
    },
    nY: {
      type: Mongoose.Types.Decimal128,
      required: true,
    },
    nZ: {
      type: Mongoose.Types.Decimal128,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("rpDiscs", RpDiscSchema);
