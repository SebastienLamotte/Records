import { Link, useRouteMatch } from 'react-router-dom';
import moment from 'moment';

import styles from './ProjectItem.module.css';

export default function ProjectItem({ title, participants, _id, createdAt }) {
  const { url } = useRouteMatch();

  const formattedDate = moment(new Date(createdAt)).format('ll');

  return (
    <li className={styles.item}>
      <figure>
        <blockquote>
          <p>{title}</p>
          <small>Created on {formattedDate}</small>
        </blockquote>
        <figcaption>
          {participants.map((participant) => participant.username).join(', ')}
        </figcaption>
      </figure>
      <Link to={`${url}/${_id}`} className="btn">
        Select Project
      </Link>
    </li>
  );
}
