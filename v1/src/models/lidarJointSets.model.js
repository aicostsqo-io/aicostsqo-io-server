const Mongoose = require("mongoose");

const LidarJointSetSchema = Mongoose.Schema(
  {
    siteId: {
      type: Mongoose.Types.ObjectId,
      ref: "sites",
      required: true,
    },
    discontinuitySetId: Number,
    shape: String,
    dip: Number,
    dipDirection: Number,
    expectationTraceLength: Mongoose.types.Decimal128,
    spacing: Mongoose.types.Decimal128,
    fisherK: Mongoose.types.Decimal128,
    frictionAngle: Number,
    fractureIntensity: String,
    positionX: Mongoose.types.Decimal128,
    positionY: Mongoose.types.Decimal128,
    positionZ: Mongoose.types.Decimal128,
    numberOfFracture: Number,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("lidarJointSets", LidarJointSetSchema);
