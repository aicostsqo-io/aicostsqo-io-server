const Mongoose = require('mongoose');

const TeleviewerDiscSchema = Mongoose.Schema(
  {
    // rpId: {
    //   type: Mongoose.Types.ObjectId,
    //   ref: 'rps',
    // },
    siteId: {
      type: Mongoose.Types.ObjectId,
      ref: 'sites',
    },
    dip: Number,
    dipDirection: Number,
    pX: Number,
    pY: Number,
    pZ: Number,
    nX: Number,
    nY: Number,
    nZ: Number,
    holeNumber: Number,
    typeOfHole: String,
    holeVerticalAngle: String,
    imageOrMeshOfFractureInterpolation: String,
    explanation: String,
    zAdjust: Number,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model('televiewerDiscs', TeleviewerDiscSchema);
