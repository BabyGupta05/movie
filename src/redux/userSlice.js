import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  users: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register: (state, action) => {
      state.users.push(action.payload);
    },
    login: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { register, login, logout } = userSlice.actions;

export default userSlice.reducer;
