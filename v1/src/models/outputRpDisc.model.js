const Mongoose = require("mongoose");

const OutputRpDiscSchema = Mongoose.Schema({
  rpId: {
    type: Mongoose.Types.ObjectId,
    ref: "rps",
  },
  positionX: { type: Number },
  positionY: { type: Number },
  positionZ: { type: Number },
  positionCorrectX: { type: Number },
  positionCorrectY: { type: Number },
  positionCorrectZ: { type: Number },
  dipApparent: { type: Number },
  dipTrue: { type: Number },
  dipDirection: { type: Number },
  normalX: { type: Number },
  normalY: { type: Number },
  normalZ: { type: Number },
  isSample: { type: Number },
});

const OutputRpDiscModel = Mongoose.model("OutputRpDisc", OutputRpDiscSchema);

module.exports = OutputRpDiscModel;
