const {
  exportBySiteToExcel,
  getExcelTemplate: getLidarsExcelTemplate,
  importFromXlsx: importLidarsFromXlsx,
} = require('../services/lidar.service');

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
  const result = await getLidarsExcelTemplate();
  res.send({
    result,
    success: true,
    message: 'Imported successfully',
  });
};

const importFromXlsx = async (req, res) => {
  const result = await importLidarsFromXlsx(req.body.fileName);
  res.send({
    result,
    success: true,
    message: 'Imported successfully',
  });
};

module.exports = {
  exportBySiteId,
  getExcelTemplate,
  importFromXlsx,
};
