import { createSlice } from "@reduxjs/toolkit";

const initialState = { loginActive: true };

const authViewSlice = createSlice({
  name: "authView",
  initialState,
  reducers: {
    setLoginActive(state) {
      state.loginActive = true;
    },
    setRegisterActive(state) {
      state.loginActive = false;
    },
  },
});

export const authViewReducer = authViewSlice.reducer;
export const { setLoginActive, setRegisterActive } = authViewSlice.actions;
export const selectLoginActive = (state) => state.authView.loginActive;
