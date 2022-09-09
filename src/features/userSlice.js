import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.isAuthenticated = true;
    },
    update: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    logout: (state) => {
      state.user = {};
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout, update } = userSlice.actions;

export const { user } = (state) => state.user;

export default userSlice.reducer;
