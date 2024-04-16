const OutputMaxQVertex = require('../models/outputMaxQVertex.model');

const getByRpId = async (rpId) => {
  const outputMaxQVertexes = await OutputMaxQVertex.find({ rpId });
  if (outputMaxQVertexes) return outputMaxQVertexes;
  throw new Error('Data not found');
};

module.exports = {
  getByRpId,
};
