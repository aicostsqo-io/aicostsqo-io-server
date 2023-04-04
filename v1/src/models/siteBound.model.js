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
        type: Mongoose.Schema.Types.ObjectId,
        ref: "vertexes",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("siteBounds", SiteBoundSchema);
