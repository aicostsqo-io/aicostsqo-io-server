const OutputVertex = require('../models/outputVertex.model');

const getByRpId = async (rpId) => {
  const outputVertexes = await OutputVertex.find({ rpId });
  if (outputVertexes) return outputVertexes;
  throw new Error('Data not found');
};

module.exports = {
  getByRpId,
};
