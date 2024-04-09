const Mongoose = require('mongoose');

const ScanlineSchema = Mongoose.Schema(
  {
    siteId: {
      type: Mongoose.Types.ObjectId,
      ref: 'sites',
    },
    dip: {
      type: Number,
      required: false,
    },
    dipDirection: {
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
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model('scanlines', ScanlineSchema);
