const Mongoose = require("mongoose");

const LidarTraceSchema = Mongoose.Schema(
  {
    siteId: {
      type: Mongoose.Types.ObjectId,
      ref: "sites",
      required: true,
    },
    traceId: Number,
    shape: String,
    dip: Number,
    dipDirection: Number,
    persistence: String,
    traceInitialVertexX: Mongoose.Types.Decimal128,
    traceInitialVertexY: Mongoose.Types.Decimal128,
    traceInitialVertexZ: Mongoose.Types.Decimal128,
    traceEndingVertexX: Mongoose.Types.Decimal128,
    traceEndingVertexY: Mongoose.Types.Decimal128,
    traceEndingVertexZ: Mongoose.Types.Decimal128,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("lidarTraces", LidarTraceSchema);
