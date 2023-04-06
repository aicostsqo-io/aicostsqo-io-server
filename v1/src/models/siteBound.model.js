const Mongoose = require("mongoose");

const SiteBoundSchema = Mongoose.Schema(
  {
    siteId: {
      type: Mongoose.Types.ObjectId,
      ref: "sites",
      required: true,
    },
    mapReferenceSystem: {
      type: String,
      enum: ["WGS-84", "ECET"],
      required: true,
    },
    vertexes: [
      {
        vertexNumber: Number,
        coordX: {
          type: Mongoose.Types.Decimal128,
          required: true,
        },
        coordY: {
          type: Mongoose.Types.Decimal128,
          required: true,
        },
        coordZ: {
          type: Mongoose.Types.Decimal128,
          required: true,
        },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("siteBounds", SiteBoundSchema);
