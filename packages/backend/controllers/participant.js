const Project = require('../models/Project');
const { checkIdsValidity, checkUserId } = require('../utils/check-ids');

// The author of the project add or delete partners
exports.editParticipants = async (req, res, next) => {
  try {
    const { newPartner, newPartnerId, partnerIdsToRemove, projectId } =
      req.body;

    checkIdsValidity(projectId);

    const project = await Project.findOne({ _id: projectId });

    checkUserId(project.participants[0]._id, req.payload.userId);

    const responseObject = {};

    if (newPartnerId) {
      checkIdsValidity(newPartnerId);
      await Project.updateOne(
        { _id: projectId },
        { $addToSet: { participants: newPartnerId } }
      );
      responseObject.participantAdded = {
        _id: newPartnerId,
        username: newPartner,
      };
    }

    if (partnerIdsToRemove.length > 0) {
      checkIdsValidity(...partnerIdsToRemove);
      await Project.updateMany(
        { _id: projectId },
        { $pull: { participants: { $in: partnerIdsToRemove } } }
      );
      responseObject.participantsDeleted = partnerIdsToRemove;
    }

    res.status(200).json(responseObject);
  } catch (err) {
    next(err);
  }
};


// The participant decide to leave the project
exports.deleteParticipant = async (req, res, next) => {
  try {
    const { projectId, participantId } = req.params;

    checkUserId(participantId, req.payload.userId);
    checkIdsValidity(projectId, participantId);

    await Project.updateOne(
      { _id: projectId },
      { $pull: { participants: participantId } }
    );

    res.status(200).json({ success: 'Participant successfully deleted' });
  } catch (err) {
    next(err);
  }
};
