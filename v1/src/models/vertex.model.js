const Mongoose = require("mongoose");

const VertexSchema = Mongoose.Schema(
  {
    siteBoundId: {
      type: Mongoose.Types.ObjectId,
      ref: "siteBounds",
      required: true,
    },
    vertexNumber: Number,
    coordX: {
      type: Mongoose.Types.Decimal128,
      required: true,
    },
    coordY: {
      type: Mongoose.Types.Decimal128,
      required: true,
    },
    coordZ: {
      type: Mongoose.Types.Decimal128,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("vertexes", VertexSchema);
