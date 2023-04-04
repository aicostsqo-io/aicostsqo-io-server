const Mongoose = require("mongoose");

const RpSchema = Mongoose.Schema(
  {
    siteBoundId: {
      type: Mongoose.Types.ObjectId,
      ref: "siteBounds",
    },
    slopeAngle: {
      type: Number,
      required: true,
    },
    crepeAngle: {
      type: Number,
      required: true,
    },
    volume: {
      type: Mongoose.Types.Decimal128,
    },
    sizeX: {
      type: Mongoose.Types.Decimal128,
      required: true,
    },
    sizeY: {
      type: Mongoose.Types.Decimal128,
      required: true,
    },
    sizeZ: {
      type: Mongoose.Types.Decimal128,
      required: true,
    },
    positionX: {
      type: Mongoose.Types.Decimal128,
      required: true,
    },
    positionY: {
      type: Mongoose.Types.Decimal128,
      required: true,
    },
    positionZ: {
      type: Mongoose.Types.Decimal128,
      required: true,
    },
    rotationX: {
      type: Number,
      required: true,
    },
    rotationY: {
      type: Number,
      required: true,
    },
    rotationZ: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("rps", RpSchema);
