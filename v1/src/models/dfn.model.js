const Mongoose = require('mongoose');

const DfnSchema = Mongoose.Schema(
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
    spacing: Number,
    fisherK: Number,
    frictionAngle: Number,
    location: String,
    persistence: String,
    orientation: String,
    fractureIntensity: String,
    positionX: Number,
    positionY: Number,
    positionZ: Number,
    vertex2x: Number,
    vertex2y: Number,
    vertex2z: Number,
    vertex3x: Number,
    vertex3y: Number,
    vertex3z: Number,
    vertex4x: Number,
    vertex4y: Number,
    vertex4z: Number,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model('dfns', DfnSchema);
