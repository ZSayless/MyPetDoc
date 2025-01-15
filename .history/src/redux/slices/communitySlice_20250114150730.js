import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { communityService } from "../../services/communityService";

// Async thunks
export const fetchPosts = createAsyncThunk(
  "community/fetchPosts",
  async ({ page, limit }) => {
    const response = await communityService.getPosts(page, limit);
    return response.data;
  }
);

export const createPost = createAsyncThunk(
  "community/createPost",
  async (postData) => {
    const response = await communityService.createPost(postData);
    return response.data;
  }
);

// ... thêm các thunks khác

const communitySlice = createSlice({
  name: "community",
  initialState: {
    posts: [],
    currentPost: null,
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
  },
  reducers: {
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    // ... thêm các cases khác
  },
});

export const { setCurrentPost, clearError } = communitySlice.actions;
export default communitySlice.reducer; 