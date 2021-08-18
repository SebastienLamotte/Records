import { Fragment } from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import { authSchema } from '@records/common';

import Signup from './Signup';
import Login from './Login';

export default function AuthRouter() {
  const { url } = useRouteMatch();

  const loginInitialValues = { username: '', password: '' };
  const signupinitialValues = {
    ...loginInitialValues,
    email: '',
    confirmPassword: '',
  };

  return (
    <Fragment>
      <Route path={`${url}/login`}>
        <Login initialValues={loginInitialValues} authSchema={authSchema} />
      </Route>
      <Route path={`${url}/signup`}>
        <Signup initialValues={signupinitialValues} authSchema={authSchema} />
      </Route>
    </Fragment>
  );
}
