import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { authActions } from '../store/auth-slice';
import { fetchProjects } from '../store/project-actions';

const useHttp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const sendRequest = async ({ urlPath, method, body, newToken = null }) => {
    try {
      if (!method) {
        method = body ? 'POST' : 'GET';
      }
      
      const response = await fetch(
        `${process.env.REACT_APP_URL_BACKEND}${urlPath}`,
        {
          method,
          body,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            authorization: `bearer: ${newToken || accessToken}`,
          },
        }
      );
      const statusCode = response.status;
      const data = await response.json();

      if (data.accessToken) {
        await dispatch(fetchProjects(sendRequest, data.accessToken));
        if (urlPath !== '/auth/login') {
          // Relog the user if he receive a new valid accessToken,
          // but don't log a user from /auth/login, cause it would unmount the login component
          // before it finish changing all its states (see App.js).
          // The dispatch login will be done in the login component itself.
          dispatch(authActions.login(data));
          // if the goal wasn't to receive the token, but the token expired, it re-send the initial request with the new token.
          if (urlPath !== '/auth/refresh-token') {
            return sendRequest({
              urlPath,
              method,
              body,
              newToken: data.accessToken,
            });
          }
        }
      }
      if (statusCode === 401) history.push('/auth/login');
      if (statusCode === 500) toast.error(data.error);

      return { ...data, statusCode };
    } catch (err) {
      toast.error('Connection problem, please try it later.');
      return false;
    }
  };
  return sendRequest;
};

export default useHttp;
