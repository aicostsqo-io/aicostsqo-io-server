const { insertRp, getRpsBySiteBoundId } = require("../services/rp.service");
const { insertSite, listSites } = require("../services/site.service");
const {
  insertSiteBound,
  getSiteBoundBySiteId,
} = require("../services/siteBound.service");

const create = async (req, res) => {
  const { site, siteBound, rps } = req.body;
  try {
    const siteToInsert = await insertSite(site);
    const siteBoundToInsert = await insertSiteBound({
      site: siteToInsert._id,
      ...siteBound,
    });
    const rpsToInsert = await Promise.all(
      rps.map(async (rp) => {
        return await insertRp({
          siteBound: siteBoundToInsert._id,
          ...rp,
        });
      })
    );
    res.send({
      site: siteToInsert,
      siteBound: siteBoundToInsert,
      rps: rpsToInsert,
      success: true,
      message: "Site created successfully",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const index = async (req, res) => {
  const sites = await listSites();

  const siteData = await Promise.all(
    sites.map(async (site) => {
      const siteBound = await getSiteBoundBySiteId(site._id);
      const rps = await getRpsBySiteBoundId(siteBound._id);
      return {
        site,
        siteBound,
        rps,
      };
    })
  );
  res.send(siteData);
};

module.exports = {
  create,
  index,
};
