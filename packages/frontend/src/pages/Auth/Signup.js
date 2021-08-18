import { Link, useHistory } from 'react-router-dom';

import Card from '../../components/UI/Card';
import Form from '../../components/Form/Form';
import Input from '../../components/Form/Input';

export default function Signup({ initialValues, authSchema }) {
  const history = useHistory();

  return (
    <Card>
      <Form
        title="Signup"
        setInputs={() => [
          <Input
            key="signup_username"
            name="username"
            type="text"
            label="Username"
          />,
          <Input key="signup_email" name="email" type="email" label="Email" />,
          <Input
            key="signup_password"
            name="password"
            type="password"
            label="Password"
          />,
          <Input
            key="signup_confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
          />,
        ]}
        submitBtnValue="Create Account"
        initialValues={initialValues}
        validationSchema={authSchema.signup}
        httpParams={{ urlPath: '/auth/signup' }}
        statusCodeAction={{
          statusCode: 201,
          action: () => history.push('/auth/login'),
        }}
      />
      <div className="actions">
        <Link to="/auth/login" className="toggle btn">
          Login with existing account
        </Link>
      </div>
    </Card>
  );
}
