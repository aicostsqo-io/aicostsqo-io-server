const Mongoose = require('mongoose');

const GprSchema = Mongoose.Schema(
  {
    siteId: {
      type: Mongoose.Types.ObjectId,
      ref: 'sites',
    },
    rectangleNumber: Number,
    shape: {
      type: String,
      enum: ['Circular', 'Triangular', 'Quadratic', 'Line'],
    },
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
      startOfLongitudinalProfilesX: { type: Number, required: false },
      startOfLongitudinalProfilesY: { type: Number, required: false },
      startOfLongitudinalProfilesZ: { type: Number, required: false },
      endOfLongitudinalProfilesX: { type: Number, required: false },
      endOfLongitudinalProfilesY: { type: Number, required: false },
      endOfLongitudinalProfilesZ: { type: Number, required: false },
      startOfTraversalProfilesX: { type: Number, required: false },
      startOfTraversalProfilesY: { type: Number, required: false },
      startOfTraversalProfilesZ: { type: Number, required: false },
      endOfTraversalProfilesX: { type: Number, required: false },
      endOfTraversalProfilesY: { type: Number, required: false },
      endOfTraversalProfilesZ: { type: Number, required: false },
    },
    vertex2: {
      startOfLongitudinalProfilesX: { type: Number, required: false },
      startOfLongitudinalProfilesY: { type: Number, required: false },
      startOfLongitudinalProfilesZ: { type: Number, required: false },
      endOfLongitudinalProfilesX: { type: Number, required: false },
      endOfLongitudinalProfilesY: { type: Number, required: false },
      endOfLongitudinalProfilesZ: { type: Number, required: false },
      startOfTraversalProfilesX: { type: Number, required: false },
      startOfTraversalProfilesY: { type: Number, required: false },
      startOfTraversalProfilesZ: { type: Number, required: false },
      endOfTraversalProfilesX: { type: Number, required: false },
      endOfTraversalProfilesY: { type: Number, required: false },
      endOfTraversalProfilesZ: { type: Number, required: false },
    },
    explanation: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model('gprs', GprSchema);
