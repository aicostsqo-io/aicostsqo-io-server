const Mongoose = require('mongoose');

const RpDiscSchema = Mongoose.Schema(
  {
    rpId: {
      type: Mongoose.Types.ObjectId,
      ref: 'rps',
    },
    dip: {
      type: Number,
      required: false,
    },
    dipDirect: {
      type: Number,
      required: false,
    },
    pX: {
      type: Number,
      required: false,
    },
    pY: {
      type: Number,
      required: false,
    },
    pZ: {
      type: Number,
      required: false,
    },
    nX: {
      type: Number,
      required: false,
    },
    nY: {
      type: Number,
      required: false,
    },
    nZ: {
      type: Number,
      required: false,
    },
    type: {
      type: String,
      enum: ['Deterministic', 'Stochastic'],
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model('rpDiscs', RpDiscSchema);
