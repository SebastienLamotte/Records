import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import moment from 'moment';

import { removeProject, leaveProject } from '../../../store/project-actions';
import useHttp from '../../../hooks/use-http';

import Card from '../../../components/UI/Card';
import HighlightedProject from '../../../components/PagesComponents/ProjectDetail/HighlightedProject';
import TimeRecordsList from '../../../components/PagesComponents/ProjectDetail/TimeRecordsList.js';

export default function ProjectDetail({ currentProject, projectId }) {
  const history = useHistory();
  const { url } = useRouteMatch();
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();
  const httpRequest = useHttp();

  const { title, description, participants, timeRecords } = currentProject;

  const participantsName = participants
    .map((participant) => participant.username)
    .join(', ');

  const totalDuration = moment
    .utc(currentProject.totalDuration)
    .format('HH:mm:ss');

  const isCreator = !participants.findIndex(
    (participant) => participant._id === userId
  );

  const updateHandler = () => history.push(`${url}/edit`);

  const deleteOrLeaveHandler = () => {
    const isConfirmed = window.confirm(
      `Are you sure you want to ${isCreator ? 'delete' : 'leave'} this project?`
    );
    if (isConfirmed) {
      dispatch(
        isCreator
          ? removeProject(httpRequest, projectId)
          : leaveProject(httpRequest, projectId, userId)
      );
      history.push(url.replace(`/${projectId}`, ''));
    }
  };

  return (
    <Fragment>
      <Card>
        <div className="centered">
          {isCreator && (
            <button onClick={updateHandler} className="btn btn-small">
              Update Project
            </button>
          )}
          <button
            onClick={deleteOrLeaveHandler}
            className="btn btn-small btn-red"
          >
            {isCreator ? 'Delete Project' : 'Leave the Project'}
          </button>
        </div>
        <HighlightedProject
          description={description}
          participants={participantsName}
          title={title}
          totalDuration={totalDuration}
        />
      </Card>
      <Card>
        <TimeRecordsList
          timeRecords={timeRecords}
          projectId={currentProject._id}
        />
        <div className="centered">
          <Link to={`${url}/new-time-record`} className="btn btn-big">
            Add new Time Record
          </Link>
        </div>
      </Card>
    </Fragment>
  );
}
