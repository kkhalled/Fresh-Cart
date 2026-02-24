import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/store/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  
});

export const AppStore = typeof store;
export type AppState = ReturnType<typeof store.getState>;
