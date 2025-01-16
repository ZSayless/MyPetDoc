import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isLoading: false,
  error: null
};

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials) => {
    // Kiểm tra thông tin đăng nhập admin
    if (credentials.email === "admin@gmail.com" && credentials.password === "admin123") {
      return {
        id: "admin",
        email: "admin@gmail.com",
        role: "admin",
      };
    }
    throw new Error("Invalid credentials");
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem('user');
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
        // Lưu thông tin user vào localStorage
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer; 