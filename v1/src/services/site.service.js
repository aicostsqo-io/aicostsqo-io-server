const Site = require('../models/site.model');
const { insertGpr } = require('./gpr.service');
const { insertGprDiscs } = require('./gprDisc.service');
const { insertGprProfiles } = require('./gprProfile.service');
const { insertSiteBound } = require('./siteBound.service');
const { insertRp } = require('./rp.service');
const { insertDiscs: insertRpDiscs } = require('./rpDisc.service');
const { insertMagnetometric } = require('./magnetometric.service');
const { insertMagnetometricDiscs } = require('./magnetometricDisc.service');
const { insertResistivity } = require('./resistivity.service');
const { insertResistivityContours } = require('./resistivityContour.service');
const { insertSeismic } = require('./seismic.service');
const { insertSeismicDiscs } = require('./seismicDisc.service');
const { insertSeismicProfiles } = require('./seismicProfile.service');
const { insertTeleviewer } = require('./televiewer.service');
const { insertTeleviewerDiscs } = require('./televiewerDisc.service');

const insert = async (data) => {
  const site = await Site.create(data);
  if (site) return site;
  throw new Error('Site not created');
};

const list = async () => {
  const sites = await Site.find({});
  if (sites) return sites;
  throw new Error('Sites not found');
};

const get = async (id) => {
  const site = await Site.findById(id);
  if (site) return site;
  throw new Error('Site not found');
};

const insertWithRelations = async (body) => {
  const {
    site,
    siteBound,
    rps,
    gprs,
    magnetometrics,
    seismics,
    televiewers,
    resistivities,
  } = body;

  const { height, ...siteWithoutHeight } = site;

  const siteToInsert = await insert({ ...siteWithoutHeight });
  const siteBoundToInsert = await insertSiteBound({
    site: siteToInsert._id,
    ...siteBound,
  });

  await insertRp({
    siteBound: siteBoundToInsert._id,
    positionZ: height,
    name: 'RP 0',
  });

  for (const rp of rps) {
    const { discs, ...rest } = rp;
    const rpToInsert = await insertRp({
      siteBound: siteBoundToInsert._id,
      ...rest,
    });

    await insertRpDiscs(discs.map((d) => ({ rpId: rpToInsert._id, ...d })));
  }

  for (const gpr of gprs) {
    const { discs, profiles, ...rest } = gpr;
    await insertGpr({
      siteId: siteToInsert._id,
      ...rest,
    });

    await insertGprDiscs(
      discs.map((d) => ({ ...d, siteId: siteToInsert._id }))
    );
    await insertGprProfiles(
      profiles.map((d) => ({ ...d, siteId: siteToInsert._id }))
    );
  }

  for (const magnetometric of magnetometrics) {
    const { discs, ...rest } = magnetometric;
    await insertMagnetometric({
      siteId: siteToInsert._id,
      ...rest,
    });
    await insertMagnetometricDiscs(
      discs.map((d) => ({ ...d, siteId: siteToInsert._id }))
    );
  }

  for (const seismic of seismics) {
    const { discs, profiles, ...rest } = seismic;
    await insertSeismic({
      siteId: siteToInsert._id,
      ...rest,
    });
    await insertSeismicDiscs(
      discs.map((d) => ({ ...d, siteId: siteToInsert._id }))
    );
    await insertSeismicProfiles(
      profiles.map((d) => ({ ...d, siteId: siteToInsert._id }))
    );
  }

  for (const televiewer of televiewers) {
    const { discs, ...rest } = televiewer;
    await insertTeleviewer({
      siteId: siteToInsert._id,
      ...rest,
    });
    await insertTeleviewerDiscs(
      discs.map((d) => ({ ...d, siteId: siteToInsert._id }))
    );
  }

  for (const resistivity of resistivities) {
    const { contours, ...rest } = resistivity;
    await insertResistivity({
      siteId: siteToInsert._id,
      ...rest,
    });
    await insertResistivityContours(
      contours.map((d) => ({ ...d, siteId: siteToInsert._id }))
    );
  }
};

module.exports = {
  insertSite: insert,
  listSites: list,
  getSite: get,
  insertWithRelations,
};
