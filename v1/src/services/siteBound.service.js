const SiteBound = require("../models/siteBound.model");

const insert = async (data) => {
  const siteBound = await SiteBound.create(data);
  if (siteBound) return siteBound;
  throw new Error("SiteBound not created");
};

const getSiteBoundBySiteId = async (siteId) => {
  const siteBound = await SiteBound.findOne({ site: siteId });
  if (siteBound) return siteBound;
  throw new Error("SiteBound not found");
};

const list = async () => {
  const siteBounds = await SiteBound.find({});
  if (siteBounds) return siteBounds;
  throw new Error("SiteBounds not found");
};

module.exports = {
  insertSiteBound: insert,
  listSiteBounds: list,
  getSiteBoundBySiteId,
};
