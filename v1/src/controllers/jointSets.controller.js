const {
  getBySiteId: getJointSets,
  exportBySiteToExcel,
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

module.exports = {
  getBySiteId,
  exportBySiteId,
};
