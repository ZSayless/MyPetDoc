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
  {
    id: 2, 
    name: "Jane Smith",
    email: "jane@example.com",
    role: "admin",
    status: "active", 
    joinDate: "2024-02-15",
  }
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
  {
    id: 2,
    name: "Animal Hospital",
    address: "456 Oak St", 
    status: "approved",
    rating: 4.8,
    joinDate: "2024-03-10",
  }
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
  {
    id: 2,
    type: "Comment",
    content: "Spam content",
    reportedBy: "user456",
    status: "resolved",
    createdAt: "2024-03-14",
  }
];

const mockMessages = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    subject: "Question about services",
    message: "I have a question about your pet vaccination services...",
    status: "unread",
    createdAt: "2024-03-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com", 
    subject: "Feedback",
    message: "I wanted to share my experience...",
    status: "read",
    createdAt: "2024-03-14",
  }
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

export const updateUserStatus = createAsyncThunk(
  "admin/updateUserStatus",
  async ({userId, status}) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {userId, status};
  }
);

// Thêm async actions cho Hospitals
export const fetchHospitals = createAsyncThunk("admin/fetchHospitals", async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockHospitals;
});

export const approveHospital = createAsyncThunk("admin/approveHospital", async (hospitalId) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return hospitalId;
});

export const rejectHospital = createAsyncThunk("admin/rejectHospital", async (hospitalId) => {
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

export const dismissReport = createAsyncThunk("admin/dismissReport", async (reportId) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return reportId;
});

// Actions cho Messages
export const fetchMessages = createAsyncThunk("admin/fetchMessages", async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockMessages;
});

export const markMessageAsRead = createAsyncThunk(
  "admin/markMessageAsRead", 
  async (messageId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return messageId;
  }
);

export const deleteMessage = createAsyncThunk(
  "admin/deleteMessage",
  async (messageId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return messageId;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    blogs: [],
    users: [],
    hospitals: [],
    reports: [],
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        const user = state.users.find(u => u.id === action.payload.userId);
        if (user) {
          user.status = action.payload.status;
        }
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
      .addCase(rejectHospital.fulfilled, (state, action) => {
        const hospital = state.hospitals.find(h => h.id === action.payload);
        if (hospital) {
          hospital.status = 'rejected';
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
      })
      .addCase(dismissReport.fulfilled, (state, action) => {
        const report = state.reports.find(r => r.id === action.payload);
        if (report) {
          report.status = 'dismissed';
        }
      })

      // Messages cases
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
        state.loading = false;
      })
      .addCase(markMessageAsRead.fulfilled, (state, action) => {
        const message = state.messages.find(m => m.id === action.payload);
        if (message) {
          message.status = 'read';
        }
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter(m => m.id !== action.payload);
      });
  },
});

export default adminSlice.reducer; 