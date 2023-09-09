const Mongoose = require("mongoose");

const DfnSchema = Mongoose.Schema(
  {
    siteId: {
      type: Mongoose.Types.ObjectId,
      ref: "sites",
      required: true,
    },
    discontinuitySetId: Number,
    shape: String,
    type: String,
    dip: Number,
    dipDirection: Number,
    expectationTraceLength: Mongoose.types.Decimal128,
    spacing: Mongoose.types.Decimal128,
    fisherK: Mongoose.types.Decimal128,
    frictionAngle: Number,
    location: String,
    persistence: String,
    orientation: String,
    fractureIntensity: String,
    positionX: Mongoose.types.Decimal128,
    positionY: Mongoose.types.Decimal128,
    positionZ: Mongoose.types.Decimal128,
    vertex2x: Mongoose.types.Decimal128,
    vertex2y: Mongoose.types.Decimal128,
    vertex2z: Mongoose.types.Decimal128,
    vertex3x: Mongoose.types.Decimal128,
    vertex3y: Mongoose.types.Decimal128,
    vertex3z: Mongoose.types.Decimal128,
    vertex4x: Mongoose.types.Decimal128,
    vertex4y: Mongoose.types.Decimal128,
    vertex4z: Mongoose.types.Decimal128,
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("dfns", DfnSchema);
