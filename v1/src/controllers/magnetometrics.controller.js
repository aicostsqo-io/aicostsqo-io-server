const {
  getBySiteId: getMagnetometrics,
  exportBySiteToExcel,
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

module.exports = {
  getBySiteId,
  exportBySiteId,
};
