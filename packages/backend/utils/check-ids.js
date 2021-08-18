const { Types: { ObjectId } } = require('mongoose');

const checkIdsValidity = (...ids) => {
  if (ids.some((id) => !ObjectId.isValid(id))) {
    const error = new Error('Bad request.');
    error.statusCode = 400;
    throw error;
  }
};

const checkUserId = (idToCheck, userId) => {
  if (idToCheck.toString() !== userId) {
    const error = new Error('Not authorized.');
    error.statusCode = 401;
    throw error;
  }
};

module.exports = {
  checkIdsValidity,
  checkUserId,
};
