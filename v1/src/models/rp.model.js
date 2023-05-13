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
      type: number,
    },
    sizeX: {
      type: number,
      required: true,
    },
    sizeY: {
      type: number,
      required: true,
    },
    sizeZ: {
      type:number,
      required: true,
    },
    positionX: {
      type: number,
      required: true,
    },
    positionY: {
      type:number,
      required: true,
    },
    positionZ: {
      type:number,
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
