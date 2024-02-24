const {
  listRps,
  bulkDeleteRps,
  insertRp,
  getRpsBySiteBoundId,
  bulkInsertRps,
  getLastRpBySiteBoundId,
  getOutputVolumesByRp,
} = require('../services/rp.service');
const {
  calculateDistributionCurves,
} = require('../services/distributionCurves.service');

const create = async (req, res) => {
  const rp = await insertRp(req.body);
  res.send({
    rp,
    success: true,
    message: 'Rp created successfully',
  });
};

const bulkDelete = async (req, res) => {
  await bulkDeleteRps(req.body);
  res.send({
    success: true,
    message: 'Deleted successfully',
  });
};

const bulkInsert = async (req, res) => {
  const newRPs = [];
  if (req?.body[0]?.siteBound === undefined) {
    res.send({
      success: false,
      message: 'Site Bound ID is required',
    });
  }
  for (let rp of req.body) {
    const { name } = await getLastRpBySiteBoundId(rp.siteBound);
    const lastRPNumber = parseInt(name.split(' ')[1]);
    rp.name = `RP ${lastRPNumber + 1}`;
    newRPs.push(rp);
  }

  await bulkInsertRps(newRPs);
  res.send({
    success: true,
    message: 'Created successfully',
  });
};

const index = async (req, res) => {
  const rps = await listRps();
  res.send({
    rps,
    success: true,
    message: 'Rps listed successfully',
  });
};

const getBySiteBoundId = async (req, res) => {
  const { siteBoundId } = req.params;
  const rps = await getRpsBySiteBoundId(siteBoundId);
  res.send({
    rps,
    success: true,
    message: 'Rps listed successfully',
  });
};

const distributionCurves = async (req, res) => {
  const { rpIdList, sourceList, chartList } = req.body;
  const result = [];
  for (let index = 0; index < rpIdList.length; index++) {
    const rpId = rpIdList[index];
    const rpOutputVolumes = await getOutputVolumesByRp(rpId);
    const rpRes = await calculateDistributionCurves(
      rpOutputVolumes,
      sourceList,
      chartList
    );
    result.push({ ...rpRes, rpId });
  }
  res.send({
    result,
    success: true,
    message: 'Success!',
  });
};

module.exports = {
  bulkDelete,
  index,
  create,
  getBySiteBoundId,
  bulkInsert,
  distributionCurves,
};
