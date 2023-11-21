const { getBySiteId: getGprs } = require('../services/gpr.service');
const { getBySiteId: getDiscs } = require('../services/gprDisc.service');
const { getBySiteId: getProfiles } = require('../services/gprProfile.service');

const getBySiteId = async (req, res) => {
  const { siteId } = req.params;
  const gprs = await getGprs(siteId);
  const gprProfiles = await getProfiles(siteId);
  const gprDiscs = await getDiscs(siteId);
  const result = {
    gprs,
    gprProfiles,
    gprDiscs,
  };
  res.send({
    result,
    success: true,
    message: 'Gprs listed successfully',
  });
};

module.exports = {
  getBySiteId,
};
