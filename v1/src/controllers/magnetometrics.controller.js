const {
  getBySiteId: getMagnetometrics,
  exportBySiteToExcel,
  getExcelTemplate: getMagnetometricsExcelTemplate,
  importFromXlsx: importMagnetometricsFromXlsx,
} = require('../services/magnetometric.service');
const {
  getBySiteId: getDiscs,
} = require('../services/magnetometricDisc.service');

const getBySiteId = async (req, res) => {
  const { siteId } = req.params;
  const magnetometrics = await getMagnetometrics(siteId);
  const magnetometricDiscs = await getDiscs(siteId);
  const result = {
    magnetometrics,
    magnetometricDiscs,
  };
  res.send({
    result,
    success: true,
    message: 'Magnetometrics listed successfully',
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
  const result = await getMagnetometricsExcelTemplate();
  res.send({
    result,
    success: true,
    message: 'Imported successfully',
  });
};

const importFromXlsx = async (req, res) => {
  const result = await importMagnetometricsFromXlsx(req.body.fileName);
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
