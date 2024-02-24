const Mongoose = require('mongoose');

const OutputVertexSchema = Mongoose.Schema(
  {
    rpId: {
      type: Mongoose.Types.ObjectId,
      ref: 'rps',
    },
    vertexId: { type: Number },
    x: { type: Number },
    y: { type: Number },
    z: { type: Number },
  },
  { timestamps: true, versionKey: false }
);

const OutputVertexModel = Mongoose.model('OutputVertex', OutputVertexSchema);

module.exports = OutputVertexModel;
