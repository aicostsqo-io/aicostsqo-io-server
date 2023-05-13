const Mongoose = require("mongoose");

const GprDiscSchema = Mongoose.Schema({
  siteId: {
    type: Mongoose.Types.ObjectId,
    ref: "sites",
  },
  rectangleLineNumber: { type: Number },
  typeOfCrack: { type: String },
  dip: { type: Number },
  dipDirection: { type: Number },
  latitudeStartX: { type: Number },
  latitudeStartY: { type: Number },
  latitudeEndX: { type: Number },
  latitudeEndY: { type: Number },
  altitudeZ: { type: Number },
  latitudeStartN: { type: String },
  latitudeStartE: { type: String },
  latitudeEndN: { type: String },
  latitudeEndE: { type: String },
  nx: { type: Number },
  ny: { type: Number },
  nz: { type: Number },
  discontinuitySetId: { type: Number },
  shape: { type: String },
  expectationTraceLength: { type: Number },
  spacing: { type: Number },
  fisherK: { type: Number },
  frictionAngle: { type: Number },
  location: { type: String },
  persistence: { type: String },
  orientation: { type: String },
  fractureIntensity: { type: String },
  positionX: { type: Number },
  positionY: { type: Number },
  positionXN: { type: Number },
  positionYE: { type: Number },
  positionZ: { type: Number },
});

const GprDiscModel = Mongoose.model("gprDiscs", GprDiscSchema);

module.exports = GprDiscModel;
