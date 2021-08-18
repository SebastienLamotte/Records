import { authActions } from './auth-slice';

export const removeCookieAndLogout = (httpRequest) => {
  return async (dispatch) => {
    const formattedResponse = await httpRequest({
      urlPath: '/auth/logout',
      method: 'POST',
    });
    // true unless server is unreachable
    return formattedResponse && dispatch(authActions.logout());
  };
};
