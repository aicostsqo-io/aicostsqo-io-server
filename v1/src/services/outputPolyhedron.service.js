const OutputPolyhedron = require('../models/outputPolyhedron.model');

const getByRpId = async (rpId) => {
  const outputPolyhedrons = await OutputPolyhedron.find({ rpId });
  if (outputPolyhedrons) return outputPolyhedrons;
  throw new Error('Data not found');
};

module.exports = {
  getByRpId,
};
