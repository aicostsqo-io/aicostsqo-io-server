const Mongoose = require("mongoose");

const RpSchema = Mongoose.Schema(
  {
    siteBound: {
      type: Mongoose.Types.ObjectId,
      ref: "siteBounds",
    },
    name: {
      type: String,
      required: false,
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
      type: Number,
    },
    sizeX: {
      type: Number,
      required: true,
    },
    sizeY: {
      type: Number,
      required: true,
    },
    sizeZ: {
      type: Number,
      required: true,
    },
    positionX: {
      type: Number,
      required: true,
    },
    positionY: {
      type: Number,
      required: true,
    },
    positionZ: {
      type: Number,
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
