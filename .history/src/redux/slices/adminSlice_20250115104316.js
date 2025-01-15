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

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    status: "active",
    joinDate: "2024-03-01",
  },
  // ...thêm users
];

const mockHospitals = [
  {
    id: 1,
    name: "Pet Care Center",
    address: "123 Main St",
    status: "pending",
    rating: 4.5,
    joinDate: "2024-03-15",
  },
  // ...thêm hospitals
];

const mockReports = [
  {
    id: 1,
    type: "Review",
    content: "Inappropriate content",
    reportedBy: "user123",
    status: "pending",
    createdAt: "2024-03-15",
  },
  // ...thêm reports
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

// Thêm async actions cho Users
export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockUsers;
});

export const deleteUser = createAsyncThunk("admin/deleteUser", async (userId) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return userId;
});

// Thêm async actions cho Hospitals
export const fetchHospitals = createAsyncThunk("admin/fetchHospitals", async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockHospitals;
});

export const approveHospital = createAsyncThunk("admin/approveHospital", async (hospitalId) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return hospitalId;
});

// Thêm async actions cho Reports
export const fetchReports = createAsyncThunk("admin/fetchReports", async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockReports;
});

export const resolveReport = createAsyncThunk("admin/resolveReport", async (reportId) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return reportId;
});

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
      })
      // Users cases
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      // Hospitals cases
      .addCase(fetchHospitals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHospitals.fulfilled, (state, action) => {
        state.hospitals = action.payload;
        state.loading = false;
      })
      .addCase(approveHospital.fulfilled, (state, action) => {
        const hospital = state.hospitals.find(h => h.id === action.payload);
        if (hospital) {
          hospital.status = 'approved';
        }
      })
      // Reports cases
      .addCase(fetchReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.reports = action.payload;
        state.loading = false;
      })
      .addCase(resolveReport.fulfilled, (state, action) => {
        const report = state.reports.find(r => r.id === action.payload);
        if (report) {
          report.status = 'resolved';
        }
      });
  },
});

export default adminSlice.reducer; 