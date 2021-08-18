import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import NoProjectFound from '../../components/PagesComponents/AllProjects/NoProjectFound';
import ProjectsList from '../../components/PagesComponents/AllProjects/ProjectsList';

export default function AllProjects() {
  const projects = useSelector((state) => state.project.projectsList);

  return (
    <Fragment>
      {!projects || projects.length === 0 ? (
        <NoProjectFound />
      ) : (
        <ProjectsList projects={projects} />
      )}
    </Fragment>
  );
}
