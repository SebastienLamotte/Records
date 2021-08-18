import { projectActions } from './project-slice';

export const fetchProjects = (httpRequest, accessToken) => {
  return async (dispatch) => {
    const formattedResponse = await httpRequest({
      urlPath: '/project/list',
      newToken: accessToken,
    });

    if (formattedResponse && formattedResponse.statusCode === 200)
      dispatch(projectActions.createProjectsList(formattedResponse.projects));
  };
};

export const removeProject = (httpRequest, projectId) => {
  return async (dispatch) => {
    const formattedResponse = await httpRequest({
      urlPath: `/project/delete/${projectId}`,
      method: 'DELETE',
    });
    if (formattedResponse && formattedResponse.statusCode === 200)
      dispatch(projectActions.deleteProject(projectId));
  };
};

export const removeTimeRecord = (httpRequest, projectId, timeRecordId) => {
  return async (dispatch) => {
    const formattedResponse = await httpRequest({
      urlPath: `/time-record/delete/${projectId}/${timeRecordId}`,
      method: 'DELETE',
    });

    if (formattedResponse && formattedResponse.statusCode === 200)
      dispatch(
        projectActions.deleteTimeRecord({
          projectId,
          timeRecordId,
          totalDuration: formattedResponse.totalDuration,
        })
      );
  };
};

export const leaveProject = (httpRequest, projectId, participantId) => {
  return async (dispatch) => {
    const formattedResponse = await httpRequest({
      urlPath: `/participant/delete/${projectId}/${participantId}`,
      method: 'DELETE',
    });
    if (formattedResponse && formattedResponse.statusCode === 200)
      dispatch(projectActions.deleteProject(projectId));
  };
};
