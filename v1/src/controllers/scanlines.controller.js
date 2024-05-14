const {
  getBySiteId: getScanlines,
  exportBySiteToExcel,
  importFromXlsx: importScanlinesFromXlsx,
  getExcelTemplate: getScanlinesExcelTemplate,
} = require('../services/scanline.service');

const getBySiteId = async (req, res) => {
  const { siteId } = req.params;
  const scanlines = await getScanlines(siteId);
  res.send({
    scanlines,
    success: true,
    message: 'Scanlines listed successfully',
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
  const result = await getScanlinesExcelTemplate();
  res.send({
    result,
    success: true,
    message: 'Imported successfully',
  });
};

const importFromXlsx = async (req, res) => {
  const result = await importScanlinesFromXlsx(req.body.fileName);
  res.send({
    result,
    success: true,
    message: 'Imported successfully',
  });
};

module.exports = {
  getBySiteId,
  exportBySiteId,
  getExcelTemplate,
  importFromXlsx,
};
