const Mongoose = require('mongoose');

const OutputMaxQSchema = Mongoose.Schema(
  {
    rpId: {
      type: Mongoose.Types.ObjectId,
      ref: 'rps',
    },
    polyhedronId: { type: Number },
    maxQId: { type: Number },
    volumeOfMaxQ: { type: Number },
    maxQFirstVertexId: { type: Number },
    maxQLastVertexId: { type: Number },
    rotationAngleX: { type: Number },
    rotationAngleY: { type: Number },
    rotationAngleZ: { type: Number },
  },
  { timestamps: true, versionKey: false }
);

const OutputMaxQModel = Mongoose.model('outputMaxQs', OutputMaxQSchema);

module.exports = OutputMaxQModel;
