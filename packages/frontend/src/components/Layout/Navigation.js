import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';

import { removeCookieAndLogout } from '../../store/auth-actions';
import useHttp from '../../hooks/use-http';

import styles from './Navigation.module.css';

export default function Navigation({ appCrashed = false }) {
  const dispatch = useDispatch();
  const httpRequest = useHttp();
  const history = useHistory();

  const isAuth = useSelector((state) => state.auth.isAuth);

  const logoutHandler = async () =>
    dispatch(removeCookieAndLogout(httpRequest))
      .then((result) => {
        result && history.push('/auth/login');
      });

  let navContent;
  if (isAuth) {
    navContent = (
      <ul>
        <li>
          <NavLink to="/project" activeClassName={styles.active}>
            All Projects
          </NavLink>
        </li>
        <li>
          <NavLink to="/project/new-project" activeClassName={styles.active}>
            New Project
          </NavLink>
        </li>
        <li>
          <button onClick={logoutHandler}>Logout</button>
        </li>
      </ul>
    );
  } else {
    navContent = (
      <ul>
        <li>
          <NavLink to="/auth/login" activeClassName={styles.active}>
            Login/Signup
          </NavLink>
        </li>
      </ul>
    );
  }

  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.logo}>Records</div>
      </Link>
      {!appCrashed && <nav>{navContent}</nav>}
    </header>
  );
}
