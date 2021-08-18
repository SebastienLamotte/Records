import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    userId: null,
    username: null,
    isAuth: false,
  },
  reducers: {
    login(state, action) {
      const { accessToken, userId, username } = action.payload;
      state.accessToken = accessToken;
      state.userId = userId;
      state.username = username;
      state.isAuth = true;
    },
    logout(state) {
      state.accessToken = null;
      state.isAuth = false;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
