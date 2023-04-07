const SiteBound = require('../models/siteBound.model');

const insert = async (data) => {
      const siteBound = await SiteBound.create(data);
      if (siteBound) return siteBound;
      throw new Error("SiteBound not created");
}

const list = async () => {
      const siteBounds = await SiteBound.find({});
      if (siteBounds) return siteBounds;
      throw new Error("SiteBounds not found");
}

module.exports = {
      insert,
      list
}