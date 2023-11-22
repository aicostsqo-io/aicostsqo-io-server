const { getBySiteId: getSeismics } = require('../services/seismic.service');
const { getBySiteId: getDiscs } = require('../services/seismicDisc.service');
const {
  getBySiteId: getProfiles,
} = require('../services/seismicProfile.service');

const getBySiteId = async (req, res) => {
  const { siteId } = req.params;
  const seismics = await getSeismics(siteId);
  const seismicProfiles = await getProfiles(siteId);
  const seismicDiscs = await getDiscs(siteId);
  const result = {
    seismics,
    seismicProfiles,
    seismicDiscs,
  };
  res.send({
    result,
    success: true,
    message: 'Seismics listed successfully',
  });
};

module.exports = {
  getBySiteId,
};
