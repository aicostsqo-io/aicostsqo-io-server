const Mongoose = require('mongoose');

const GprSchema = Mongoose.Schema(
  {
    siteId: {
      type: Mongoose.Types.ObjectId,
      ref: 'sites',
    },
    rectangleNumber: Number,
    shape: String,
    longitudinalProfileNumber: Number,
    traversalProfileNumber: Number,
    distance: Mongoose.Types.Decimal128,
    spacing: Mongoose.Types.Decimal128,
    dimension: {
      type: String,
      enum: ['1D', '2D', '3D'],
    },
    positionX: Mongoose.Types.Decimal128,
    positionY: Mongoose.Types.Decimal128,
    positionZ: Mongoose.Types.Decimal128,
    antenna: String,
    longitudinalProfilesDirectory: String,
    longitudinalProfilesMaxDepth: Mongoose.Types.Decimal128,
    longitudinalProfilesMaxDistance: Mongoose.Types.Decimal128,
    traversalProfilesDirectory: String,
    traversalProfilesMaxDepth: Mongoose.Types.Decimal128,
    traversalProfilesMaxDistance: Mongoose.Types.Decimal128,
    mapReferenceSystemForStartOfLongitudinalProfiles: Number,
    mapReferenceSystemForStartOfTransversalProfiles: Number,
    vertex1: {
      startOfLongitudinalProfilesX: Number,
      startOfLongitudinalProfilesY: Number,
      startOfLongitudinalProfilesZ: Number,
      endOfLongitudinalProfilesX: Number,
      endOfLongitudinalProfilesY: Number,
      endOfLongitudinalProfilesZ: Number,
      startOfTraversalProfilesX: Number,
      startOfTraversalProfilesY: Number,
      startOfTraversalProfilesZ: Number,
      endOfTraversalProfilesX: Number,
      endOfTraversalProfilesY: Number,
      endOfTraversalProfilesZ: Number,
    },
    vertex2: {
      startOfLongitudinalProfilesX: Number,
      startOfLongitudinalProfilesY: Number,
      startOfLongitudinalProfilesZ: Number,
      endOfLongitudinalProfilesX: Number,
      endOfLongitudinalProfilesY: Number,
      endOfLongitudinalProfilesZ: Number,
      startOfTraversalProfilesX: Number,
      startOfTraversalProfilesY: Number,
      startOfTraversalProfilesZ: Number,
      endOfTraversalProfilesX: Number,
      endOfTraversalProfilesY: Number,
      endOfTraversalProfilesZ: Number,
    },
    explanation: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model('gprs', GprSchema);
