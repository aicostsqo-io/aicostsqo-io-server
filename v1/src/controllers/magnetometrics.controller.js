const {
  getBySiteId: getMagnetometrics,
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

module.exports = {
  getBySiteId,
};
