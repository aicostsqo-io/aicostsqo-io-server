const { list, insert } = require("../services/site.service");

const create = async (req, res) => {
  const site = await insert(req.body);

  /* const { site, siteBound, rp } = req.body;
  const siteToInsert = await insertSite(site);
  const siteBoundToInsert = await insertSiteBound({
    ...siteBound,
    site: siteToInsert._id,
  });
  const rpToInsert = await insertRP({
    ...rp,
    siteBound: siteBoundToInsert._id,
  });

  if (!siteToInsert || !siteBoundToInsert || !rpToInsert)
    throw new Error("Site not created");
  res.send({
    site: siteToInsert,
    siteBound: siteBoundToInsert,
    rp: rpToInsert,
    success: true,
    message: "Site created successfully",
  }); */

  res.send({
    site,
    success: true,
    message: "Site created successfully",
  });
};

const index = async (req, res) => {
  const sites = await list();
  res.send({
    sites,
    success: true,
    message: "Sites listed successfully",
  });
};

module.exports = {
  create,
  index,
};
