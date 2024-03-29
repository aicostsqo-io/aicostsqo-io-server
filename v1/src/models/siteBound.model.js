const Mongoose = require("mongoose");

const SiteBoundSchema = Mongoose.Schema(
  {
    site: {
      type: Mongoose.Types.ObjectId,
      ref: "sites",
      required: true,
    },
    backboneExtractionOrIntegration: {
      type: String,
      enum: ["Extraction", "Integration"],
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
          type: Number,
          required: true,
        },
        coordY: {
          type: Number,
          required: true,
        },
        coordZ: {
          type: Number,
          required: false,
        },
        _id: false,
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("siteBounds", SiteBoundSchema);
