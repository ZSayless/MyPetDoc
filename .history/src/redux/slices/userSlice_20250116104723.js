import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials) => {
    // Nếu là admin login
    if (credentials.email === "admin@example.com") {
      return {
        id: "admin",
        name: "Admin User",
        email: "admin@example.com",
        role: "admin"
      };
    }
    
    // Nếu là normal user login
    const response = await axios.post("/api/auth/login", credentials);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer; 