const RPDisc = require('../models/rpDisc.model');

const insert = async (discData) => {
  const disc = await RPDisc.create(discData);
  if (disc) return disc;
  throw new Error('Disc not created');
};

const update = async (discId, discData) => {
  const disc = await RPDisc.findByIdAndUpdate(discId, discData, { new: true });
  if (disc) return disc;
  throw new Error('Disc not updated');
};

const insertDiscs = async (discsData) => {
  const discs = await RPDisc.insertMany(discsData);
  if (discs) return discs;
  throw new Error('Discs are not created');
};

const list = async () => {
  const discs = await RPDisc.find();
  if (discs) return discs;
  throw new Error('Discs not found');
};

const getDiscsByRpId = async (rpId) => {
  const discs = await RPDisc.find({ rpId: rpId }).sort({ name: 1 });
  if (discs) return discs;
  throw new Error('Discs not found');
};

const bulkDeleteRpDiscs = async (rps) => {
  await RPDisc.deleteMany({ _id: { $in: rps } });
};

const bulkInsertDisc = async (discs) => {
  await RPDisc.insertMany(discs);
};

module.exports = {
  insertDisc: insert,
  insertDiscs: insertDiscs,
  updateDisc: update,
  listDiscs: list,
  getDiscsByRpId,
  bulkDeleteRpDiscs,
  bulkInsertDisc,
};
