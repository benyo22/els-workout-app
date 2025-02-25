import { createSlice } from "@reduxjs/toolkit";

const initialState = { id: null, username: null, isAuthenticated: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, { payload }) {
      state.id = payload.id;
      state.username = payload.username;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.id = null;
      state.username = null;
      state.isAuthenticated = false;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { login, logout } = authSlice.actions;
export const selectUserId = (state) => state.auth.id;
export const selectLoggedInUsername = (state) => state.auth.username;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
