const {
  getBySiteId: getResistivitys,
  exportBySiteToExcel,
} = require('../services/resistivity.service');
const {
  getBySiteId: getContours,
} = require('../services/resistivityContour.service');

const getBySiteId = async (req, res) => {
  const { siteId } = req.params;
  const resistivities = await getResistivitys(siteId);
  const resistivityContours = await getContours(siteId);
  const result = {
    resistivities,
    resistivityContours,
  };
  res.send({
    result,
    success: true,
    message: 'Resistivities listed successfully',
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
