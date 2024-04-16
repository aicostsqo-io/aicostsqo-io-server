const OutputMaxQ = require('../models/outputMaxQ.model');

const getByRpId = async (rpId) => {
  const outputMaxQs = await OutputMaxQ.find({ rpId });
  if (outputMaxQs) return outputMaxQs;
  throw new Error('Data not found');
};

module.exports = {
  getByRpId,
};
