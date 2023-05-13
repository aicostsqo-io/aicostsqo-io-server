const Mongoose = require("mongoose");

const SeismicProfileSchema = Mongoose.Schema(
  {
    siteId: {
      type: Mongoose.Types.ObjectId,
      ref: "sites",
    },
    seismicMeasurementId: Number,
    shape: String,
    profileNumber: Number,
    endsOfSeismicProfile: Number,
    seismicProfileDirectory: String,
    explanation: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("seismicProfiles", SeismicProfileSchema);
