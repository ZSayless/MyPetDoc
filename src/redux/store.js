import { configureStore } from "@reduxjs/toolkit";
import communityReducer from "./slices/communitySlice";
import adminReducer from "./slices/adminSlice";
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    community: communityReducer,
    admin: adminReducer,
    auth: authReducer,
  },
});
