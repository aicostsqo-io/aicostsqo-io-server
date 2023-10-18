const RPDisc = require('../models/rpDisc.model');

const insert = async (discData) => {
  console.log('discData: ', discData);

  const disc = await RPDisc.create(discData);
  if (disc) return disc;
  throw new Error('Disc not created');
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

module.exports = {
  insertDisc: insert,
  listDiscs: list,
  getDiscsByRpId,
};
