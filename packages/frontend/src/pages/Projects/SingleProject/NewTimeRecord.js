import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { timeRecordSchema } from '@records/common';
import { projectActions } from '../../../store/project-slice';

import Card from '../../../components/UI/Card';
import Form from '../../../components/Form/Form';
import Input from '../../../components/Form/Input';
import TimerInputs from '../../../components/PagesComponents/NewTimeRecord/TimerInputs';

export default function NewTimeRecord({ currentProject, projectId }) {
  const history = useHistory();
  const { url } = useRouteMatch();
  const username = useSelector((state) => state.auth.username);
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  const recordsTitles = currentProject.timeRecords.map(
    (record) => record.title
  );

  timeRecordSchema.title = yup
    .string()
    .required('Title is required.')
    .min(4, 'Must be at least 4 characters.')
    .max(30, 'Must be at most 30 characters.')
    .test({
      name: 'Record title already token',
      message: 'This title already exists.',
      test: (title) => !recordsTitles.includes(title),
    });

  return (
    <Card>
      <Form
        title="New Time Record"
        setInputs={({ setFieldValue, setFieldTouched, values }) => [
          <Input
            key="newTimeRecord_title"
            name="title"
            type="text"
            label="Title"
            required={true}
          />,
          <Input
            key="newTimeRecord_description"
            name="description"
            control="textArea"
            label="Description"
            required={true}
          />,
          <TimerInputs
            key="newTimeRecord_timerInputs"
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            values={values}
          />,
        ]}
        submitBtnValue="Create New Time Record"
        initialValues={{
          title: '',
          description: '',
          start: '',
          end: '',
          projectId: projectId,
        }}
        validationSchema={yup.object(timeRecordSchema)}
        httpParams={{ urlPath: '/time-record/add' }}
        statusCodeAction={{
          statusCode: 201,
          action: (formattedResponse) => {
            formattedResponse.newTimeRecord.author = { username, userId };
            dispatch(
              projectActions.addTimeRecord({
                projectId: projectId,
                record: formattedResponse.newTimeRecord,
              })
            );
            history.push(url.replace('/new-time-record', ''));
          },
        }}
      />
    </Card>
  );
}
