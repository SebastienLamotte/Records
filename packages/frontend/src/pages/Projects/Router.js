import { lazy, Suspense } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import AllProjects from './AllProjects';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const NewProject = lazy(() => import('./NewProject'));
const SingleProjectRouter = lazy(() => import('./SingleProject/Router'));

export default function ProjectsRouter() {
  const { url } = useRouteMatch();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Switch>
        <Route path={`${url}`} exact>
          <AllProjects />
        </Route>
        <Route path={`${url}/new-project`} exact>
          <NewProject />
        </Route>
        <Route path={`${url}/:projectId`}>
          <SingleProjectRouter />
        </Route>
      </Switch>
    </Suspense>
  );
}
