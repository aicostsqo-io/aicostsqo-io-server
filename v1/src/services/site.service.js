const Site = require("../models/site.model");

const insert = async (data) => {
  const site = await Site.create(data);
  if (site) return site;
  throw new Error("Site not created");
};

const list = async () => {
  const sites = await Site.find({});
  if (sites) return sites;
  throw new Error("Sites not found");
};

module.exports = {
  insertSite: insert,
  listSites: list,
};
