const Rp = require('../models/rp.model');

const list = async () => {
  const rps = await Rp.find({});
  if (rps) return rps;
  throw new Error('Rps not found');
};
const bulkDeleteRps = async (rps) => {
  const result = await Rp.deleteMany({ _id: { $in: rps } });
  console.log('silme sonucu: ', result);
};

const bulkInsertRps = async (rps) => {
  await Rp.insertMany(rps);
};

const insert = async (rpData) => {
  const rp = await Rp.create(rpData);
  if (rp) return rp;
  throw new Error('Rp not created');
};

const getRpsBySiteBoundId = async (siteBoundId) => {
  const rps = await Rp.find({ siteBound: siteBoundId }).sort({ name: 1 });
  if (rps) return rps;
  throw new Error('Rps not found');
};

module.exports = {
  bulkDeleteRps,
  listRps: list,
  insertRp: insert,
  getRpsBySiteBoundId,
  bulkInsertRps,
};
