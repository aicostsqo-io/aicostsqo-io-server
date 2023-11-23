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
    x: Number,
    y: Number,
    z: Number,
    resistivity: Number,
    resistivityContourProfileDirectory: String,
    explanation: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model(
  "resistivitiyContours",
  ResistivityContourSchema
);
