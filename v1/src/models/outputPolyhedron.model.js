const Mongoose = require("mongoose");

const OutputPolyhedronSchema = Mongoose.Schema({
  rpId: {
    type: Mongoose.Types.ObjectId,
    ref: "rps",
  },
  polyhedronId: { type: Number },
  volume: { type: Number },
  vertexCount: { type: Number },
  faceCount: { type: Number },
  faceTypeCount: { type: Number },
  faceTypes: { type: String },
  faces: { type: [String] },
});

const OutputPolyhedronModel = Mongoose.model(
  "OutputPolyhedron",
  OutputPolyhedronSchema
);

module.exports = OutputPolyhedronModel;
