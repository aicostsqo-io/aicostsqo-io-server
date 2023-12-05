const Mongoose = require('mongoose');

const GprProfileSchema = Mongoose.Schema(
  {
    siteId: {
      type: Mongoose.Types.ObjectId,
      ref: 'sites',
    },
    rectangleLineNumber: Number,
    profileType: {
      type: String,
      enum: ['Longitudinal', 'Traversal'],
    },
    longitudinalProfileNumber: Number,
    traversalProfileNumber: Number,
    distance: Number,
    spacing: Number,
    numberOfProfile: Number,
    startingVertexX: Number,
    startingVertexY: Number,
    startingVertexZ: Number,
    endVertexX: Number,
    endVertexY: Number,
    endVertexZ: Number,
    frequency: Number,
    filname: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model('gprProfiles', GprProfileSchema);
