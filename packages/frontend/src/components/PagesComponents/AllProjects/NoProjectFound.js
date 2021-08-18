import { Link, useRouteMatch } from 'react-router-dom';

import styles from './NoProjectFound.module.css';

export default function NoProjectFound() {
  const { url } = useRouteMatch();

  return (
    <div className={styles.noProject}>
      <p>No project found!</p>
      <Link className="btn" to={`${url}/new-project`}>
        Add a new project
      </Link>
    </div>
  );
}
