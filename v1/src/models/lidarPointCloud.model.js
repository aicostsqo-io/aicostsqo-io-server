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
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("lidarPointClouds", LidarPointCloudSchema);
