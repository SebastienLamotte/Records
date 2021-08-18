import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { projectActions } from '../../../store/project-slice';

import ProjectForm from '../../../components/PagesComponents/ProjectForm';
import EditParticipantForm from '../../../components/PagesComponents/EditProject/EditParticipantsForm';

export default function EditProject({ currentProject, projectId }) {
  const history = useHistory();
  const { url } = useRouteMatch();
  const dispatch = useDispatch();

  const { title, description, participants } = currentProject;

  return (
    <Fragment>
      <ProjectForm
        title="Edit Project"
        submitBtnValue="Edit Project"
        initialValues={{ projectId, title, description }}
        httpParams={{ urlPath: '/project/edit', method: 'PATCH' }}
        statusCodeAction={{
          statusCode: 200,
          action: ({ title, description }) => {
            dispatch(
              projectActions.editProject({ projectId, title, description })
            );
            history.push(url.replace('/edit', ''));
          },
        }}
      />
      <EditParticipantForm participants={participants} projectId={projectId} />
    </Fragment>
  );
}
