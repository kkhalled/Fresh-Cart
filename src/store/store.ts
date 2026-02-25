import { configureStore } from "@reduxjs/toolkit";
import { authReducer, User } from "../features/auth/store/authSlice";
import { AuthState } from "../features/auth/server/auth.action";

 export  type preloadedState = {
  auth: AuthState;
};

export function createStore(preloadedState: preloadedState) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState,
  });

  return store;
}
export type AppStoreType = ReturnType<typeof createStore>;
export type AppState = ReturnType<AppStoreType["getState"]>;
