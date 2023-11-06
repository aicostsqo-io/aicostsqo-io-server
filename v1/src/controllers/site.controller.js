const { insertRp, getRpsBySiteBoundId } = require('../services/rp.service');
const { insertDiscs } = require('../services/rpDisc.service');
const { insertSite, listSites, getSite } = require('../services/site.service');
const { insertGpr } = require('../services/gpr.service');
const { insertGprDiscs } = require('../services/gprDisc.service');
const { insertGprProfiles } = require('../services/gprProfile.service');
const {
  insertSiteBound,
  getSiteBoundBySiteId,
} = require('../services/siteBound.service');

const create = async (req, res) => {
  const { site, siteBound, rps, gprs } = req.body;
  const siteToInsert = await insertSite(site);
  const siteBoundToInsert = await insertSiteBound({
    site: siteToInsert._id,
    ...siteBound,
  });

  for (const rp of rps) {
    const { discs, ...rest } = rp;
    const rpToInsert = await insertRp({
      siteBound: siteBoundToInsert._id,
      ...rest,
    });

    await insertDiscs(discs.map((d) => ({ rpId: rpToInsert._id, ...d })));
  }

  for (const gpr of gprs) {
    const { discs, profiles, ...rest } = gpr;
    const createdGpr = await insertGpr({
      siteId: siteToInsert._id,
      ...rest,
    });

    await insertGprDiscs(discs.map((d) => ({ gprId: createdGpr._id, ...d })));
    await insertGprProfiles(
      profiles.map((p) => ({ gprId: createdGpr._id, ...p }))
    );
  }

  res.send({
    site: siteToInsert,
    siteBound: siteBoundToInsert,
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
