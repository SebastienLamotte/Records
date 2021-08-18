import { Fragment, useEffect, useState, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import useHttp from './hooks/use-http';

import Welcome from './pages/Welcome';

import Layout from './components/Layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';

import 'react-toastify/dist/ReactToastify.css';

const AuthRouter = lazy(() => import('./pages/Auth/Router'));
const ProjectsRouter = lazy(() => import('./pages/Projects/Router'));
const NotFound = lazy(() => import('./pages/Errors/NotFound'));

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const httpRequest = useHttp();

  useEffect(() => {
    httpRequest({ urlPath: '/auth/refresh-token', method: 'POST' })
      .then(() =>
        setIsLoading(false)
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Fragment>
      <ToastContainer
        draggable={false}
        position="top-center"
        hideProgressBar={true}
        autoClose={8000}
      />
      <Layout>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Suspense fallback={<LoadingSpinner />}>
            <Switch>
              <Route path="/" exact>
                <Welcome />
              </Route>
              {isAuth ? (
                <Route path="/project">
                  <ProjectsRouter />
                </Route>
              ) : (
                <Route path="/auth">
                  <AuthRouter />
                </Route>
              )}
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Suspense>
        )}
      </Layout>
    </Fragment>
  );
}
