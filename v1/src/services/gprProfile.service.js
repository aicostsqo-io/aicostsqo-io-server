const GprProfile = require('../models/gprProfile.model');

const insertProfiles = async (gprProfileData) => {
  const gprProfiles = await GprProfile.insertMany(gprProfileData);
  if (gprProfiles) return gprProfiles;
  throw new Error('GprProfiles are not created');
};

module.exports = {
  insertGprProfiles: insertProfiles,
};
