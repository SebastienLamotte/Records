const express = require('express');
const yup = require('yup');
const router = express.Router();

const isAuth = require('../middleware/isAuth');
const validate = require('../middleware/validate');

const { timeRecordSchema } = require('@records/common');

const timeRecordController = require('../controllers/timeRecord');

router.post(
  '/add',
  isAuth(),
  validate(yup.object(timeRecordSchema)),
  timeRecordController.addTimeRecord
);

router.delete(
  '/delete/:projectId/:timeRecordId/',
  isAuth(),
  timeRecordController.deleteTimeRecord
);

module.exports = router;
