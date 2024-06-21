const {
  listRps,
  bulkDeleteRps,
  insertRp,
  updateRp,
  getRpsBySiteBoundId,
  bulkInsertRps,
  getLastRpBySiteBoundId,
  getOutputVolumesByRp,
  exportBySiteBoundToExcel: exportBySiteBound,
  getExcelTemplate: getRPsExcelTemplate,
  importFromXlsx: importRPsFromXlsx,
} = require('../services/rp.service');
const {
  calculateDistributionCurves,
} = require('../services/distributionCurves.service');

const create = async (req, res) => {
  const { name } = await getLastRpBySiteBoundId(req.body.siteBound);
  const lastRPNumber = parseInt(name.split(' ')[1]);
  const rp = await insertRp({
    ...req.body,
    name: `RP ${lastRPNumber + 1}`,
  });
  res.send({
    rp,
    success: true,
    message: 'Rp created successfully',
  });
};

const update = async (req, res) => {
  const { rpId } = req.params;
  const rp = await updateRp(rpId, req.body);
  res.send({
    rp,
    success: true,
    message: 'Rp updated successfully',
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
  let index = 1;
  for (let rp of req.body) {
    const { name } = await getLastRpBySiteBoundId(rp.siteBound);
    const lastRPNumber = parseInt(name.split(' ')[1]);
    rp.name = `RP ${lastRPNumber + index++}`;
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

const exportBySiteBoundToExcel = async (req, res) => {
  const { sitedBoundId } = req.params;
  const result = await exportBySiteBound(sitedBoundId);
  res.send({
    result,
    success: true,
    message: 'Success!',
  });
};

const getExcelTemplate = async (req, res) => {
  const result = await getRPsExcelTemplate();
  res.send({
    result,
    success: true,
    message: 'Imported successfully',
  });
};

const importFromXlsx = async (req, res) => {
  const result = await importRPsFromXlsx(req.body.fileName);
  res.send({
    result,
    success: true,
    message: 'Imported successfully',
  });
};

module.exports = {
  bulkDelete,
  index,
  create,
  update,
  getBySiteBoundId,
  bulkInsert,
  distributionCurves,
  exportBySiteBoundToExcel,
  getExcelTemplate,
  importFromXlsx,
};
