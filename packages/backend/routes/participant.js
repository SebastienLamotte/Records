const express = require('express');
const yup = require('yup');
const router = express.Router();

const isAuth = require('../middleware/isAuth');
const validate = require('../middleware/validate');

const participantController = require('../controllers/participant');

router.put(
  '/edit',
  isAuth(),
  validate(yup.object({ newPartner: yup.string().matches(/^(|.{4,20})$/) })),
  participantController.editParticipants
);

router.delete(
  '/delete/:projectId/:participantId',
  isAuth(),
  participantController.deleteParticipant
);

module.exports = router;
