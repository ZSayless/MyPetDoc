import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async actions
export const fetchBlogs = createAsyncThunk(
  "admin/fetchBlogs",
  async () => {
    // TODO: Call API
    return mockBlogs;
  }
);

export const deleteBlog = createAsyncThunk(
  "admin/deleteBlog",
  async (blogId) => {
    // TODO: Call API
    return blogId;
  }
);

// Similar actions for other features...

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    blogs: [],
    users: [],
    hospitals: [],
    reports: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.loading = false;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      // Add other cases...
  },
});

export default adminSlice.reducer; 