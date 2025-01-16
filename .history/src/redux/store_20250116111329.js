import { configureStore } from "@reduxjs/toolkit";
import communityReducer from "./slices/communitySlice";
import adminReducer from "./slices/adminSlice";

export const store = configureStore({
  reducer: {
    community: communityReducer,
    admin: adminReducer,
  },
});
