const Mongoose = require("mongoose");

const OutputMaxQVertexSchema = Mongoose.Schema({
  rpId: {
    type: Mongoose.Types.ObjectId,
    ref: "rps",
  },
  polyhedronId: { type: Number },
  vertexId: { type: Number },
  x: { type: Number },
  y: { type: Number },
  z: { type: Number },
});

const OutputMaxQVertexModel = Mongoose.model(
  "OutputMaxQVertex",
  OutputMaxQVertexSchema
);

module.exports = OutputMaxQVertexModel;
