const Mongoose = require("mongoose");

const MagnetometricSchema = Mongoose.Schema(
  {
    siteId: {
      type: Mongoose.Types.ObjectId,
      ref: "sites",
      required: true,
    },
    magnetometricMeasurementId: {
      type: Number,
    },
    profileNumber: Number,
    latitudeMin: Number,
    longitudeMin: Number,
    altitudeMin: Number,
    latitudeMax: Number,
    longitudeMax: Number,
    altitudeMax: Number,
    magnetometricProfileDirectory: String,
    explanation: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("magnetometrics", MagnetometricSchema);
