import { useSelector } from 'react-redux';
import * as yup from 'yup';

import { projectSchema } from '@records/common';

import Card from '../UI/Card';
import Form from '../Form/Form';
import Input from '../Form/Input';

export default function ProjectForm({
  title,
  submitBtnValue,
  initialValues = { title: '', description: '' },
  httpParams,
  statusCodeAction,
}) {
  const projectsTitles = useSelector((state) =>
    state.project.projectsList.map((project) => project.title)
  );

  projectSchema.title = projectSchema.title.test({
    name: 'Project title already exists',
    message: 'This title already exists.',
    test: (title) => {
      if (initialValues.title && initialValues.title === title) return true;
      return !projectsTitles.includes(title);
    },
  });

  return (
    <Card>
      <Form
        title={title}
        setInputs={() => [
          <Input
            key="newProject_title"
            name="title"
            type="text"
            label="Title"
          />,
          <Input
            key="newProject_description"
            name="description"
            control="textArea"
            label="Description"
          />,
        ]}
        submitBtnValue={submitBtnValue}
        initialValues={initialValues}
        validationSchema={yup.object(projectSchema)}
        httpParams={httpParams}
        statusCodeAction={statusCodeAction}
      />
    </Card>
  );
}
