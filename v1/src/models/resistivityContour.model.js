const Mongoose = require("mongoose");

const ResistivityContourSchema = Mongoose.Schema(
  {
    siteId: {
      type: Mongoose.Types.ObjectId,
      ref: "sites",
      required: true,
    },
    resistivityMeasurementId: {
      type: Number,
    },
    profileNumber: Number,
    x: Mongoose.Types.Decimal128,
    y: Mongoose.Types.Decimal128,
    z: Mongoose.Types.Decimal128,
    resistivity: Mongoose.Types.Decimal128,
    resistivityContourProfileDirectory: String,
    explanation: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model(
  "resistivitiyContours",
  ResistivityContourSchema
);
