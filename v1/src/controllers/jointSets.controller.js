const {
  getBySiteId: getJointSets,
  exportBySiteToExcel,
  getExcelTemplate: getJointSetsExcelTemplate,
  importFromXlsx: importJointSetsFromXlsx,
} = require('../services/jointSet.service');

const getBySiteId = async (req, res) => {
  const { siteId } = req.params;
  const jointSets = await getJointSets(siteId);
  res.send({
    jointSets,
    success: true,
    message: 'Joint sets listed successfully',
  });
};

const exportBySiteId = async (req, res) => {
  const { siteId } = req.params;
  const result = await exportBySiteToExcel(siteId);
  res.send({
    result,
    success: true,
    message: 'Exported successfully',
  });
};

const getExcelTemplate = async (req, res) => {
  const result = await getJointSetsExcelTemplate();
  res.send({
    result,
    success: true,
    message: 'Imported successfully',
  });
};

const importFromXlsx = async (req, res) => {
  const result = await importJointSetsFromXlsx(req.body.fileName);
  res.send({
    result,
    success: true,
    message: 'Imported successfully',
  });
};

module.exports = {
  getBySiteId,
  exportBySiteId,
  importFromXlsx,
  getExcelTemplate,
};
