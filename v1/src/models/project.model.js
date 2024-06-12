const Mongoose = require('mongoose');

const ProjectSchema = Mongoose.Schema(
  {
    user: {
      type: Mongoose.Types.ObjectId,
      ref: 'users',
    },
    name: {
      type: String,
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model('projects', ProjectSchema);
