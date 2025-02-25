import { createSlice } from "@reduxjs/toolkit";

const initialState = { loginActive: true };

const authUiSlice = createSlice({
  name: "authUi",
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

export const authUiReducer = authUiSlice.reducer;
export const { setLoginActive, setRegisterActive } = authUiSlice.actions;
export const selectLoginActive = (state) => state.authUi.loginActive;
