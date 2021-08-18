import { useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { projectActions } from '../../store/project-slice';

import ProjectForm from '../../components/PagesComponents/ProjectForm';

export default function NewProject() {
  const history = useHistory();
  const { url } = useRouteMatch();
  const dispatch = useDispatch();

  return (
    <ProjectForm
      title="New Project"
      submitBtnValue="Create New Project"
      httpParams={{ urlPath: '/project/add' }}
      statusCodeAction={{
        statusCode: 201,
        action: ({ newProject }) => {
          dispatch(projectActions.addProject(newProject));
          history.push(url.replace('/new-project', ''));
        },
      }}
    />
  );
}
