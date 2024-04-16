const DFN = require('../models/dfn.model');

const insert = async (dfnData) => {
  const dfn = await DFN.create(dfnData);
  if (dfn) return dfn;
  throw new Error('DFN are not created');
};

const getByRpId = async (rpId) => {
  const dfns = await DFN.find({ rpId });
  if (dfns) return dfns;
  throw new Error('DFN not found');
};

const getById = async (id) => {
  const dfn = await DFN.findById(id);
  if (dfn) return dfn;
  throw new Error('DFN not found');
};

module.exports = {
  insert,
  getByRpId,
  getById,
};
