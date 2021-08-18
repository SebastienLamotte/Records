const Project = require('../models/Project');
const { checkIdsValidity, checkUserId } = require('../utils/check-ids');

exports.getProjectsList = async (req, res, next) => {
  try {
    const projects = await Project.find({
      participants: req.payload.userId,
    }).populate('participants timeRecords.author', 'username');

    res.status(200).json({ projects });
  } catch (err) {
    next(err);
  }
};

exports.postNewProject = async (req, res, next) => {
  try {
    const newProject = await new Project({
      ...req.body,
      totalDuration: 0,
      participants: [req.payload.userId],
    }).save();

    await newProject.populate('participants', 'username').execPopulate();

    res.status(201).json({ newProject });
  } catch (err) {
    next(err);
  }
};

exports.editProject = async (req, res, next) => {
  try {
    const { projectId, title, description } = req.body;

    checkIdsValidity(projectId);

    const project = await Project.findOne({ _id: projectId });

    checkUserId(project.participants[0]._id, req.payload.userId);

    project.title = title;
    project.description = description;
    await project.save();

    res.status(200).json({ title, description });
  } catch (err) {
    next(err);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const projectId = req.params.projectId;

    checkIdsValidity(projectId);

    const project = await Project.findOne({ _id: projectId });

    checkUserId(project.participants[0]._id, req.payload.userId);

    await project.deleteOne();
    
    res.status(200).json({ success: 'Project successfully deleted.' });
  } catch (err) {
    next(err);
  }
};
