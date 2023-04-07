const { insert, list } = require("../services/siteBound.service");

const create = async (req, res) => {
      try {
            const siteBound = await insert(req.body);
            res.send({
                  siteBound,
                  success: true,
                  message: "SiteBound created successfully",
            })
      } catch (e) {
            res.send({
                  success: false,
                  message: e.message
            })
      }
}

const index = async (req, res) => {
      try {
            const siteBounds = await list();
            res.send({
                  siteBounds,
                  success: true,
                  message: "SiteBounds listed successfully",
            })
      } catch (e) {
            res.send({
                  success: false,
                  message: e.message
            })
      }
}

module.exports = {
      create,
      index
}