import { createSlice } from "@reduxjs/toolkit";

const initialState = { id: null, username: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, { payload }) {
      state.id = payload.id;
      state.username = payload.username;
    },
    logout(state) {
      state.id = null;
      state.username = null;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { login, logout } = authSlice.actions;
export const selectUserId = (state) => state.auth.id;
export const selectLoggedInUsername = (state) => state.auth.username;
