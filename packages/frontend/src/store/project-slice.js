import { createSlice } from '@reduxjs/toolkit';

const findProject = (list, id) => list.find((project) => project._id === id);

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    projectsList: null,
  },
  reducers: {
    createProjectsList(state, action) {
      state.projectsList = action.payload;
    },
    addProject(state, action) {
      state.projectsList.push(action.payload);
    },
    editProject(state, action) {
      const { projectId, title, description } = action.payload;
      const project = findProject(state.projectsList, projectId);
      project.title = title;
      project.description = description;
    },
    deleteProject(state, action) {
      const indexProject = state.projectsList.findIndex(
        (project) => project._id === action.payload
      );
      state.projectsList.splice(indexProject, 1);
    },
    addTimeRecord(state, action) {
      const { projectId, record } = action.payload;
      const project = findProject(state.projectsList, projectId);
      if (!project.timeRecords) {
        project.timeRecords = [record];
        return;
      }
      project.timeRecords.push(record);
      project.totalDuration += record.duration;
    },
    deleteTimeRecord(state, action) {
      const { projectId, timeRecordId, totalDuration } = action.payload;
      const project = findProject(state.projectsList, projectId);
      project.totalDuration = totalDuration;
      const indexRecord = project.timeRecords.findIndex(
        (record) => record._id === timeRecordId
      );
      project.timeRecords.splice(indexRecord, 1);
    },
    addParticipant(state, action) {
      const { projectId, participant } = action.payload;
      const project = findProject(state.projectsList, projectId);
      const isParticipantAlreadyExists = project.participants.some(
        (existingParticipant) => existingParticipant._id === participant._id
      );
      if (!isParticipantAlreadyExists) project.participants.push(participant);
    },
    deleteParticipants(state, action) {
      const { projectId, idsToDelete } = action.payload;
      const project = findProject(state.projectsList, projectId);
      project.participants = project.participants.filter(
        (participant) => !idsToDelete.includes(participant._id)
      );
    },
  },
});

export const projectActions = projectSlice.actions;
export default projectSlice.reducer;
