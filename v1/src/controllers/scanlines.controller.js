const {
  getBySiteId: getScanlines,
  exportBySiteToExcel,
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

module.exports = {
  getBySiteId,
  exportBySiteId,
};
