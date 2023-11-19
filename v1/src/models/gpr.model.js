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
    distance: Number,
    spacing: Number,
    dimension: {
      type: String,
      enum: ['1D', '2D', '3D'],
    },
    positionX: Number,
    positionY: Number,
    positionZ: Number,
    antenna: String,
    longitudinalProfilesDirectory: String,
    longitudinalProfilesMaxDepth: Number,
    longitudinalProfilesMaxDistance: Number,
    traversalProfilesDirectory: String,
    traversalProfilesMaxDepth: Number,
    traversalProfilesMaxDistance: Number,
    mapReferenceSystemForStartOfLongitudinalProfiles: {
      type: String,
      enum: ['GPS', 'WGS84', 'ITRF96'],
    },
    mapReferenceSystemForStartOfTransversalProfiles: {
      type: String,
      enum: ['GPS', 'WGS84', 'ITRF96'],
    },
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
