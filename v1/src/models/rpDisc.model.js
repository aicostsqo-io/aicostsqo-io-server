const Mongoose = require('mongoose');

const RpDiscSchema = Mongoose.Schema(
  {
    rpId: {
      type: Mongoose.Types.ObjectId,
      ref: 'rps',
    },
    dip: {
      type: Number,
      required: true,
    },
    dipDirect: {
      type: Number,
      required: true,
    },
    pX: {
      type: Number,
      required: true,
    },
    pY: {
      type: Number,
      required: true,
    },
    pZ: {
      type: Number,
      required: true,
    },
    nX: {
      type: Number,
      required: true,
    },
    nY: {
      type: Number,
      required: true,
    },
    nZ: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ['Determinisctic', 'Stokastic'],
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model('rpDiscs', RpDiscSchema);
