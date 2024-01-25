const { getRpsBySiteBoundId } = require('../services/rp.service');
const {
  listSites,
  getSite,
  insertWithRelations,
  insertSite,
} = require('../services/site.service');
const {
  getSiteBoundBySiteId,
  insertSiteBound,
} = require('../services/siteBound.service');

const create = async (req, res) => {
  await insertWithRelations(req.body);
  res.send({
    success: true,
    message: 'Site created successfully',
  });
};

const manual = async (req, res) => {
  const siteToInsert = await insertSite(req.body.site);
  await insertSiteBound({
    site: siteToInsert._id,
    ...req.body.siteBound,
  });

  res.send({
    success: true,
    message: 'Site and bounds created manually',
  });
};

const list = async (req, res) => {
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

const get = async (req, res) => {
  const { id } = req.params;
  const site = await getSite(id);
  const siteBound = await getSiteBoundBySiteId(site._id);
  const rps = await getRpsBySiteBoundId(siteBound._id);
  res.send({
    site,
    siteBound,
    rps,
  });
};

module.exports = {
  create,
  list,
  get,
  manual,
};
