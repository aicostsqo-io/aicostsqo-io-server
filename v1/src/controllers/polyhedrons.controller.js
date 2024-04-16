const { exportByRpToExcel } = require('../services/polyhedron.service');

const exportByRpId = async (req, res) => {
  const { rpId } = req.params;
  const result = await exportByRpToExcel(rpId);
  res.send({
    result,
    success: true,
    message: 'Exported successfully',
  });
};

module.exports = {
  exportByRpId,
};
