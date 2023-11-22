const { getRpsBySiteBoundId } = require('../services/rp.service');
const {
  listSites,
  getSite,
  insertWithRelations,
} = require('../services/site.service');
const { getSiteBoundBySiteId } = require('../services/siteBound.service');

const create = async (req, res) => {
  await insertWithRelations(req.body);
  res.send({
    success: true,
    message: 'Site created successfully',
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
};
