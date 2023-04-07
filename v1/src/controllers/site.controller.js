const { list, insert } = require("../services/site.service");

const create = async (req, res) => {
      try {
            const site = await insert(req.body);
            res.send({
                  site,
                  success: true,
                  message: "Site created successfully",
            });
      } catch (e) {
            res.send({
                  success: false,
                  message: e.message,
            });
      }
}

const index = async (req, res) => {
      try {
            const sites = await list();
            res.send({
                  sites,
                  success: true,
                  message: "Sites listed successfully",
            });
      } catch (e) {
            res.send({
                  success: false,
                  message: e.message,
            });
      }
}

module.exports = {
      create,
      index
}