import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "zod";

const initialState: authState = {
  isAuthenticated: false,
  userInfo: null,
};
type User = {
  name: string;
  email: string;
  role: string;
  // Add other user properties as needed
};
type authState = {
  isAuthenticated: boolean;
  userInfo: User | null;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated(state, action: PayloadAction<authState>) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userInfo = action.payload.userInfo;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setAuthenticated } = authSlice.actions;
