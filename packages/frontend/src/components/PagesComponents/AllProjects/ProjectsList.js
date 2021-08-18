import { useState } from 'react';

import Card from '../../UI/Card';
import ProjectItem from './ProjectItem';

import styles from './ProjectsList.module.css';

export default function ProjectsList({ projects }) {
  const [isSortingAsc, setIsSortingAsc] = useState(false);
  
  let sortedProjects = [...projects];

  isSortingAsc && sortedProjects.reverse();

  return (
    <Card>
      <div className="sorting">
        <button onClick={() => setIsSortingAsc((sorted) => !sorted)}>
          Sort by {isSortingAsc ? 'newest first' : 'oldest first'}
        </button>
      </div>
      <ul className={styles.list}>
        {sortedProjects.map((project) => (
          <ProjectItem key={project._id} {...project} />
        ))}
      </ul>
    </Card>
  );
}
