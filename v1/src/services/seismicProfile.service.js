const SeismicProfile = require('../models/seismicProfile.model');

const insertProfiles = async (seismicProfileData) => {
  const seismicProfiles = await SeismicProfile.insertMany(seismicProfileData);
  if (seismicProfiles) return seismicProfiles;
  throw new Error('SeismicProfiles are not created');
};

const getBySiteId = async (siteId) => {
  const seismicProfiles = await SeismicProfile.find({ siteId }).sort({
    rectangleLineNumber: 1,
  });
  if (seismicProfiles) return seismicProfiles;
  throw new Error('Seismic profiles not found');
};

module.exports = {
  insertSeismicProfiles: insertProfiles,
  getBySiteId,
};
