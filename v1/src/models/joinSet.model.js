const Mongoose = require('mongoose');

const JoinSetSchema = Mongoose.Schema(
  {
    siteId: {
      type: Mongoose.Types.ObjectId,
      ref: 'sites',
      required: true,
    },
    discontinuitySetId: Number,
    shape: String,
    type: String,
    dip: Number,
    dipDirection: Number,
    expectationTraceLength: Number,
    frictionAngle: Number,
    location: String,
    positionX: Number,
    positionY: Number,
    positionZ: Number,
    trend: Number,
    plunge: Number,
    vertex2: {
      x: Number,
      y: Number,
      z: Number,
    },
    vertex3: {
      x: Number,
      y: Number,
      z: Number,
    },
    vertex4: {
      x: Number,
      y: Number,
      z: Number,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model('joinSets', JoinSetSchema);
