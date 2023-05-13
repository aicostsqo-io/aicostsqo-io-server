const Mongoose = require("mongoose");

const GprProfileSchema = Mongoose.Schema(
  {
    siteId: {
      type: Mongoose.Types.ObjectId,
      ref: "sites",
    },
    rectangleLineNumber: Number,
    shape: String,
    longitudinalProfileNumber: Number,
    traversalProfileNumber: Number,
    distance: Mongoose.Types.Decimal128,
    spacing: Mongoose.Types.Decimal128,
    numberOfProfile: Number,
    latitudeStartX: Mongoose.Types.Decimal128,
    latitudeStartY: Mongoose.Types.Decimal128,
    latitudeEndX: Mongoose.Types.Decimal128,
    latitudeEndY: Mongoose.Types.Decimal128,
    altitudeZ: Mongoose.Types.Decimal128,
    latitudeStartN: String,
    latitudeStartE: String,
    latitudeEndN: String,
    latitudeEndE: String,
    lengthOfProfile: Mongoose.Types.Decimal128,
    lengthFromPrism: Mongoose.Types.Decimal128,
    lengthFromGfs: Mongoose.Types.Decimal128,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("gprProfiles", GprProfileSchema);
