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
    latitudeMin: Mongoose.Types.Decimal128,
    longitudeMin: Mongoose.Types.Decimal128,
    altitudeMin: Mongoose.Types.Decimal128,
    latitudeMax: Mongoose.Types.Decimal128,
    longitudeMax: Mongoose.Types.Decimal128,
    altitudeMax: Mongoose.Types.Decimal128,
    magnetometricProfileDirectory: String,
    explanation: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("magnetometrics", MagnetometricSchema);
