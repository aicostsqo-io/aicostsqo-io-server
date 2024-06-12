const { listProjects, insertProject } = require('../services/project.service');

const create = async (req, res) => {
  const { body } = req;
  const project = await insertProject(body);
  res.send({
    project,
    success: true,
    message: 'Project created successfully',
  });
};

const index = async (req, res) => {
  const projects = await listProjects();
  res.send({
    projects,
    success: true,
    message: 'Projects listed successfully',
  });
};

module.exports = {
  index,
  create,
};
