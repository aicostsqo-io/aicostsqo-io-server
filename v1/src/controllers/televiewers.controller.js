const {
  getBySiteId: getTeleviewers,
  exportBySiteToExcel,
} = require('../services/televiewer.service');
const { getBySiteId: getDiscs } = require('../services/televiewerDisc.service');

const getBySiteId = async (req, res) => {
  const { siteId } = req.params;
  const televiewers = await getTeleviewers(siteId);
  const televiewerDiscs = await getDiscs(siteId);
  const result = {
    televiewers,
    televiewerDiscs,
  };
  res.send({
    result,
    success: true,
    message: 'Televiewers listed successfully',
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
