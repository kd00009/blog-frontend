import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    islogin: false,
  },
  reducers: {
    login: (state, action) => {
      state.islogin = true;
    },
    logout: (state, action) => {
      state.islogin = false;
    },
  },
});

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});
