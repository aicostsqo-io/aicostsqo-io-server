const TeleviewerDisc = require('../models/televiewerDisc.model');

const insertDiscs = async (televiewerDiscData) => {
  const televiewerDiscs = await TeleviewerDisc.insertMany(televiewerDiscData);
  if (televiewerDiscs) return televiewerDiscs;
  throw new Error('TeleviewerDiscs are not created');
};

const getBySiteId = async (siteId) => {
  const televiewerDiscs = await TeleviewerDisc.find({ siteId });
  if (televiewerDiscs) return televiewerDiscs;
  throw new Error('Televiewer discs not found');
};

module.exports = {
  insertTeleviewerDiscs: insertDiscs,
  getBySiteId,
};
