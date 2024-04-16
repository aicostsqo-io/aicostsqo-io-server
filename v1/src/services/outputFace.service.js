const OutputFace = require('../models/outputFace.model');

const getByRpId = async (rpId) => {
  const outputFaces = await OutputFace.find({ rpId });
  if (outputFaces) return outputFaces;
  throw new Error('Data not found');
};

module.exports = {
  getByRpId,
};
