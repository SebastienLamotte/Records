import { Link, useHistory } from 'react-router-dom';

import Card from '../../components/UI/Card';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';

export default function Login({ initialValues, authSchema }) {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <Card>
      <Form
        title="Login"
        setInputs={() => [
          <Input
            key="login_username"
            name="username"
            type="text"
            label="Username"
          />,
          <Input
            key="login_password"
            name="password"
            type="password"
            label="Password"
          />,
        ]}
        submitBtnValue="Login"
        initialValues={initialValues}
        validationSchema={authSchema.login}
        httpParams={{ urlPath: '/auth/login' }}
        statusCodeAction={{
          statusCode: 200,
          action: ({ accessToken, userId, username }) => {
            dispatch(authActions.login({ accessToken, userId, username }));
            history.push('/');
          },
        }}
      />
      <div className="actions">
        <Link to="/auth/signup" className="toggle btn">
          Create new account
        </Link>
      </div>
    </Card>
  );
}
