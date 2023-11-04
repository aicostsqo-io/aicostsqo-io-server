const Mongoose = require('mongoose');

const SeismicSchema = Mongoose.Schema(
  {
    siteId: {
      type: Mongoose.Types.ObjectId,
      ref: 'sites',
    },
    measurementId: Number,
    shape: String,
    profilNumber: Number,
    geophones: Number,
    spacing: Number,
    shots: Number,
    length: Number,
    locationAngle: Number,
    profileLocationX: Number,
    profileLocationY: Number,
    profileLocationZ: Number,
    endOfTheSeismicProfile: Number,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model('seismics', SeismicSchema);
