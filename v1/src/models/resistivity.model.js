const Mongoose = require('mongoose');

const ResistivitySchema = Mongoose.Schema(
  {
    siteId: {
      type: Mongoose.Types.ObjectId,
      ref: 'sites',
      required: true,
    },
    resistivityMeasurementId: {
      type: Number,
    },
    profileNumber: Number,
    latitudeMin: Mongoose.Types.Decimal128,
    longitudeMin: Mongoose.Types.Decimal128,
    altitudeMin: Mongoose.Types.Decimal128,
    latitudeMax: Mongoose.Types.Decimal128,
    longitudeMax: Mongoose.Types.Decimal128,
    altitudeMax: Mongoose.Types.Decimal128,
    depth: Mongoose.Types.Decimal128,
    distance: Mongoose.Types.Decimal128,
    resistivity: Mongoose.Types.Decimal128,
    resistivityProfileDirectory: String,
    explanation: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model('resistivities', ResistivitySchema);
