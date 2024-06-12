const Project = require('../models/project.model');

const insert = async (data) => {
  const project = await Project.create(data);
  if (project) return project;
  throw new Error('Project not created');
};

const list = async () => {
  const projects = await Project.find({});
  if (projects) return projects;
  throw new Error('Projects not found');
};

const get = async (id) => {
  const project = await Project.findById(id);
  if (project) return project;
  throw new Error('Project not found');
};

module.exports = {
  insertProject: insert,
  listProjects: list,
  getProject: get,
};
