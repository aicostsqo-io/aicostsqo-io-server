const Mongoose = require('mongoose');

const OutputFaceSchema = Mongoose.Schema(
  {
    rpId: {
      type: Mongoose.Types.ObjectId,
      ref: 'rps',
    },
    polyhedronId: { type: Number },
    faceId: { type: Number },
    vertexes: { type: [Number] },
  },
  { timestamps: true, versionKey: false }
);

const OutputFaceModel = Mongoose.model('outputFaces', OutputFaceSchema);

module.exports = OutputFaceModel;
