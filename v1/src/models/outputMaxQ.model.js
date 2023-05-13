const Mongoose = require("mongoose");

const OutputMaxQSchema = Mongoose.Schema({
  rpId: {
    type: Mongoose.Types.ObjectId,
    ref: "rps",
  },
  polyhedronId: { type: Number },
  volume: { type: Number },
  maxQId: { type: Number },
  maxQVolume: { type: Number },
  maxQFirstVertexId: { type: Number },
  maxQLastVertexId: { type: Number },
});

const OutputMaxQModel = Mongoose.model("OutputMaxQ", OutputMaxQSchema);

module.exports = OutputMaxQModel;
