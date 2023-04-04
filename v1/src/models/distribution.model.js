const Mongoose = require("mongoose");

const DistributionSchema = Mongoose.Schema(
  {
    vertexNumber: String,
    destinationTable: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("distributions", DistributionSchema);
