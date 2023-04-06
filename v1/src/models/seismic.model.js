const Mongoose = require("mongoose");

const SeismicSchema = Mongoose.Schema(
  {
    siteId: {
      type: Mongoose.Types.ObjectId,
      ref: "sites",
    },
    measurementId: Number,
    shape: String,
    profilNumber: Number,
    geophones: Number,
    spacing: Mongoose.Types.Decimal128,
    shots: Number,
    length: Number,
    locationAngle: Number,
    profileLocationX: Mongoose.Types.Decimal128,
    profileLocationY: Mongoose.Types.Decimal128,
    profileLocationZ: Mongoose.Types.Decimal128,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("seismics", SeismicSchema);
