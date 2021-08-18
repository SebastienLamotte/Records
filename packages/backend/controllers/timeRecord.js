const mongoose = require('mongoose');
const Project = require('../models/Project');
const { checkIdsValidity, checkUserId } = require('../utils/check-ids');

exports.addTimeRecord = async (req, res, next) => {
  try {
    const { title, description, start, end, projectId } = req.body;

    checkIdsValidity(projectId);
    
    const project = await Project.findOne({ _id: projectId });
    const participant = project.participants.find(
      (participant) => participant._id.toString() === req.payload.userId
    );

    if (!participant) return res.status(401).json({ error: 'Not authorized.' });

    const isTitleAlreadyExist = project.timeRecords.some(
      (record) => record.title === title
    );

    if (isTitleAlreadyExist)
      return res.status(409).json({ error: `${title} already exists.` });

    const _id = mongoose.Types.ObjectId();
    const duration = new Date(end) - new Date(start);

    const newTimeRecord = {
      _id,
      title,
      description,
      start,
      duration,
      author: participant,
    };

    project.timeRecords.push(newTimeRecord);
    project.totalDuration += duration;
    await project.save();
    res.status(201).json({ newTimeRecord });
  } catch (err) {
    next(err);
  }
};

exports.deleteTimeRecord = async (req, res, next) => {
  try {
    const { projectId, timeRecordId } = req.params;

    checkIdsValidity(projectId);

    const project = await Project.findOne({ _id: projectId }).populate(
      'timeRecords.author'
    );
    const recordIdx = project.timeRecords.findIndex(
      (record) => record._id.toString() === timeRecordId
    );
    const record = project.timeRecords[recordIdx];

    checkUserId(record.author._id, req.payload.userId);

    project.totalDuration -= record.duration;
    project.timeRecords.splice(recordIdx, 1);
    await project.save();
    res.status(200).json({ totalDuration: project.totalDuration });
  } catch (err) {
    next(err);
  }
};
