const Mongoose = require("mongoose");

const TeleviewerSchema = Mongoose.Schema(
  {
    siteBoundId: {
      type: Mongoose.Types.ObjectId,
      ref: "siteBounds",
    },
    type: {
      type: String,
      enum: ["Optical", "Acoustic"],
    },
    sizeX: {
      type: Mongoose.Types.Decimal128,
      required: true,
      min: 1,
    },
    sizeY: {
      type: Mongoose.Types.Decimal128,
      required: true,
      min: 1,
    },
    sizeZ: {
      type: Mongoose.Types.Decimal128,
      required: true,
      min: 1,
    },
    positionX: {
      type: Mongoose.Types.Decimal128,
      required: true,
      min: 1,
    },
    positionY: {
      type: Mongoose.Types.Decimal128,
      required: true,
      min: 1,
    },
    positionZ: {
      type: Mongoose.Types.Decimal128,
      required: true,
      min: 1,
    },
    rotationX: {
      type: Number,
      required: true,
      min: 0,
      max: 360,
    },
    rotationY: {
      type: Number,
      required: true,
      min: 0,
      max: 360,
    },
    rotationZ: {
      type: Number,
      required: true,
      min: 0,
      max: 360,
    },
    holeNumber: Number,
    xHole: String,
    yHole: String,
    zHole: String,
    holeVerticalAngle: String,
    direction: String,
    lengthOfHole: Mongoose.Types.Decimal128,
    diameterCore: Mongoose.Types.Decimal128,
    explanation: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("televiewers", TeleviewerSchema);
