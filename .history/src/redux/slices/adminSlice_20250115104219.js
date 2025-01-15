import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Mock data
const mockBlogs = [
  {
    id: 1,
    title: "Essential Pet Vaccinations Guide",
    author: "Dr. John Smith",
    category: "Pet Health",
    status: "published",
    views: 1234,
    publishDate: "2024-03-15",
  },
  {
    id: 2,
    title: "Common Pet Behavior Issues",
    author: "Dr. Sarah Johnson",
    category: "Pet Behavior",
    status: "draft",
    views: 0,
    publishDate: "-",
  },
];

// Async actions
export const fetchBlogs = createAsyncThunk(
  "admin/fetchBlogs",
  async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockBlogs;
  }
);

export const deleteBlog = createAsyncThunk(
  "admin/deleteBlog",
  async (blogId) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
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
      // Fetch blogs
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
      // Delete blog
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter(blog => blog.id !== action.payload);
      });
  },
});

export default adminSlice.reducer; 