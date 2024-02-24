const Rp = require('../models/rp.model');
const { createOutputVolumes } = require('./distributionCurves.service');
const { getByRp } = require('./outputVolume.service');

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

const getLastRpBySiteBoundId = async (siteBoundId) => {
  const rp = await Rp.findOne({
    siteBound: siteBoundId,
  })
    .sort({ name: -1 })
    .limit(1);
  if (rp) return rp;
  throw new Error('Rps not found');
};

const getOutputVolumesByRp = async (rpId) => {
  const outputVolumes = await getByRp(rpId);
  if (outputVolumes.length < 1) {
    return await createOutputVolumes(rpId);
  }
  return outputVolumes;
};

module.exports = {
  bulkDeleteRps,
  listRps: list,
  insertRp: insert,
  getRpsBySiteBoundId,
  bulkInsertRps,
  getLastRpBySiteBoundId,
  getOutputVolumesByRp,
};
