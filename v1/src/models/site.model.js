const Mongoose = require('mongoose');

const SiteSchema = Mongoose.Schema(
  {
    customerId: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
    name: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model('sites', SiteSchema);
