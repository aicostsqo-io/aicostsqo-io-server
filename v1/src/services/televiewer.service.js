const Televiewer = require('../models/televiewer.model');

const insert = async (televiewerData) => {
  const televiewer = await Televiewer.create(televiewerData);
  if (televiewer) return televiewer;
  throw new Error('Televiewer not created');
};

const getBySiteId = async (siteId) => {
  const televiewers = await Televiewer.find({ siteId });
  if (televiewers) return televiewers;
  throw new Error('Televiewers not found');
};

module.exports = {
  insertTeleviewer: insert,
  getBySiteId,
};
