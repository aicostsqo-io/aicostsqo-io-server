const Resistivity = require('../models/resistivity.model');

const insert = async (resistivityData) => {
  const resistivity = await Resistivity.create(resistivityData);
  if (resistivity) return resistivity;
  throw new Error('Resistivity not created');
};

const getBySiteId = async (siteId) => {
  const resistivitys = await Resistivity.find({ siteId });
  if (resistivitys) return resistivitys;
  throw new Error('Resistivitys not found');
};

module.exports = {
  insertResistivity: insert,
  getBySiteId,
};
