import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth-slice';
import projectReducer from './project-slice';

const store = configureStore({
  reducer: { auth: authReducer, project: projectReducer },
});

export default store;
