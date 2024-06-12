const { getUserIdFromRequest } = require('../scripts/utils/helper');
const { getRpsBySiteBoundId } = require('../services/rp.service');
const {
  listSites,
  listSitesByProjectId,
  getSite,
  insertWithRelations,
  insertSite,
  exportMySitesToExcel: exportMySites,
} = require('../services/site.service');
const { insertRp } = require('../services/rp.service');
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
  const siteBoundToInsert = await insertSiteBound({
    site: siteToInsert._id,
    ...req.body.siteBound,
  });

  await insertRp({
    siteBound: siteBoundToInsert._id,
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    sizeX: 0,
    sizeY: 0,
    sizeZ: 0,
    name: 'RP 0',
    slopeAngle: 0,
    crepeAngle: 0,
  });

  res.send({
    success: true,
    message: 'Site and bounds created manually',
  });
};

const list = async (req, res) => {
  const { projectId } = req.params;
  // const sites = await listSites();
  const sites = await listSitesByProjectId(projectId);
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

const exportMySitesToExcel = async (req, res) => {
  const userId = getUserIdFromRequest(req);
  const result = await exportMySites(userId);
  res.send({
    result,
    success: true,
    message: 'Success!',
  });
};

module.exports = {
  create,
  list,
  get,
  manual,
  exportMySitesToExcel,
};
