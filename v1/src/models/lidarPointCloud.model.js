const Mongoose = require("mongoose");

const LidarPointCloudSchema = Mongoose.Schema(
  {
    siteId: {
      type: Mongoose.Types.ObjectId,
      ref: "sites",
    },
    vertexId: Number,
    jointSetNumber: Number,
    discontiunityPlaneNumber: Number,
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
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("lidarPointClouds", LidarPointCloudSchema);
