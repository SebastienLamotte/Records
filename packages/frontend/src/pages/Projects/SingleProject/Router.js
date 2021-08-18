import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import ProjectDetail from './ProjectDetail';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';

const EditProject = lazy(() => import('./EditProject'));
const NewTimeRecord = lazy(() => import('./NewTimeRecord'));
const NotFound = lazy(() => import('../../Errors/NotFound'));

export default function ProjectRouter() {
  const { url, params: { projectId } } = useRouteMatch();
  const projectsList = useSelector((state) => state.project.projectsList);

  const currentProject = projectsList.find(
    (project) => project._id === projectId
  );

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {!currentProject ? (
        <NotFound />
      ) : (
        <Switch>
          <Route path={`${url}`} exact>
            <ProjectDetail
              currentProject={currentProject}
              projectId={projectId}
            />
          </Route>
          <Route path={`${url}/edit`} exact>
            <EditProject
              currentProject={currentProject}
              projectId={projectId}
            />
          </Route>
          <Route path={`${url}/new-time-record`} exact>
            <NewTimeRecord
              currentProject={currentProject}
              projectId={projectId}
            />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      )}
    </Suspense>
  );
}
