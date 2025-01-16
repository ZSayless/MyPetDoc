import { configureStore } from "@reduxjs/toolkit";
import communityReducer from "./slices/communitySlice";
import adminReducer from "./slices/adminSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    community: communityReducer,
    admin: adminReducer,
    user: userReducer,
  },
});
