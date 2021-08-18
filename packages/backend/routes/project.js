const express = require('express');
const yup = require('yup');
const router = express.Router();

const validate = require('../middleware/validate');
const isAuth = require('../middleware/isAuth');

const { projectSchema } = require('@records/common');

const projectController = require('../controllers/project');

router.get('/list', isAuth(), projectController.getProjectsList);

router.post(
  '/add',
  isAuth(),
  validate(yup.object(projectSchema)),
  projectController.postNewProject
);

router.patch(
  '/edit',
  isAuth(),
  validate(yup.object(projectSchema)),
  projectController.editProject
);

router.delete('/delete/:projectId', isAuth(), projectController.deleteProject);

module.exports = router;
