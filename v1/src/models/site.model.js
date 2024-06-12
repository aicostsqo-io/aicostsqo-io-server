const Mongoose = require('mongoose');

const SiteSchema = Mongoose.Schema(
  {
    customerId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    project: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'projects',
      default: null,
    },
    name: String,
    generateVirtual1DExtendedRPs: Boolean,
    calculateMaximumCuboids: Boolean,
    calculatePolyhedrons: Boolean,
    generateDiscontinuityPlanes: Boolean,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model('sites', SiteSchema);
