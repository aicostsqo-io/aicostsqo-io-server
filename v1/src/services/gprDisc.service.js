const GprDisc = require('../models/gprDisc.model');

const insert = async (data) => {
  const created = await GprDisc.create(data);
  if (created) return created;
  throw new Error('Data can not created');
};

const insertDiscs = async (gprDiscData) => {
  const gprDiscs = await GprDisc.insertMany(gprDiscData);
  if (gprDiscs) return gprDiscs;
  throw new Error('GprDiscs are not created');
};

const getBySiteId = async (siteId) => {
  const gprDiscs = await GprDisc.find({ siteId });
  if (gprDiscs) return gprDiscs;
  throw new Error('Gpr discs not found');
};

module.exports = {
  insertGprDiscs: insertDiscs,
  getBySiteId,
  insert,
};
