import { createSlice } from "@reduxjs/toolkit";

const initialState = { id: null, user: null, isAuthenticated: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, { payload }) {
      state.id = payload.id;
      state.user = payload.user;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.id = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { login, logout } = authSlice.actions;
export const selectUserId = (state) => state.auth.id;
export const selectLoggedInUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
