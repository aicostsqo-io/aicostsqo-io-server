const Mongoose = require('mongoose');

const GprDiscSchema = Mongoose.Schema({
  siteId: {
    type: Mongoose.Types.ObjectId,
    ref: 'sites',
  },
  rectangleLineNumber: { type: Number },
  profileType: {
    type: String,
    enum: ['Longitudinal', 'Traversal'],
  },
  crackProfileNumber: Number,
  typeOfCrack: {
    type: String,
    enum: ['Main Crack', 'Crack Zone'],
  },
  typeOfDisc: {
    type: String,
    enum: ['Circular', 'Quadratic', 'Triangular', 'Other'],
  },
  dip: { type: Number },
  dipDirection: { type: Number },
  mapReferenceSystem: { type: String },
  startingVertexX: Number,
  startingVertexY: Number,
  startingVertexZ: Number,
  endVertexX: Number,
  endVertexY: Number,
  endVertexZ: Number,
  nX: Number,
  nY: Number,
  nZ: Number,
});

const GprDiscModel = Mongoose.model('gprDiscs', GprDiscSchema);

module.exports = GprDiscModel;
