import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  mockHospitals,
  mockBlogs,
  mockReports,
  mockMessages,
  mockPendingApprovals,
} from "../../data/mockData";
import { adminService } from '../../services/adminService';

const initialState = {
  users: [],
  deletedUsers: [],
  hospitals: mockHospitals || [],
  blogs: mockBlogs || [],
  reports: mockReports || [],
  messages: mockMessages || [],
  pendingApprovals:
    [
      {
        id: 1,
        type: "hospital_registration",
        name: "Pet Care Center",
        email: "petcare@example.com",
        status: "pending",
        submittedAt: "2024-03-15",
        details: {
          address: "123 Main St",
          phone: "0123456789",
          services: ["Vaccination", "Surgery", "Grooming"],
          workingHours: {
            weekdays: "8:00 AM - 8:00 PM",
            weekends: "9:00 AM - 6:00 PM",
          },
          images: ["url1", "url2", "url3"],
        },
      },
      // ... other pending approvals
    ] || [],
  loading: false,
  error: null,
  contactMessages: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  },
};

export const fetchUsers = createAsyncThunk(
  'admin/fetchUsers',
  async ({ page, limit, isDeleted = false }, { rejectWithValue }) => {
    try {
      const response = await adminService.getUsers(page, limit, isDeleted);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const toggleDeleteUser = createAsyncThunk(
  'admin/toggleDeleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await adminService.toggleDeleteUser(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const toggleLockUser = createAsyncThunk(
  'admin/toggleLockUser',
  async (userId, { rejectWithValue }) => {
    try {
      if (!userId) {
        throw new Error('User ID is required');
      }
      const response = await adminService.toggleLockUser(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const toggleActiveUser = createAsyncThunk(
  'admin/toggleActiveUser',
  async (userId, { rejectWithValue }) => {
    try {
      if (!userId) {
        throw new Error('User ID is required');
      }
      const response = await adminService.toggleActiveUser(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchDeletedUsers = createAsyncThunk(
  'admin/fetchDeletedUsers',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await adminService.getDeletedUsers(page, limit);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // Users
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    updateUserStatus: (state, action) => {
      const user = state.users.find((u) => u.id === action.payload.userId);
      if (user) {
        user.status = action.payload.status;
      }
    },

    // Hospitals
    approveHospital: (state, action) => {
      const hospital = state.hospitals.find((h) => h.id === action.payload);
      if (hospital) {
        hospital.status = "approved";
      }
    },
    rejectHospital: (state, action) => {
      const hospital = state.hospitals.find((h) => h.id === action.payload);
      if (hospital) {
        hospital.status = "rejected";
      }
    },
    deleteHospital: (state, action) => {
      state.hospitals = state.hospitals.filter((h) => h.id !== action.payload);
    },

    // Blogs
    deleteBlog: (state, action) => {
      state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
    },
    updateBlogStatus: (state, action) => {
      const blog = state.blogs.find((b) => b.id === action.payload.blogId);
      if (blog) {
        blog.status = action.payload.status;
      }
    },

    // Reports
    resolveReport: (state, action) => {
      const report = state.reports.find((r) => r.id === action.payload);
      if (report) {
        report.status = "resolved";
      }
    },
    dismissReport: (state, action) => {
      const report = state.reports.find((r) => r.id === action.payload);
      if (report) {
        report.status = "dismissed";
      }
    },

    // Messages
    deleteMessage: (state, action) => {
      state.messages = state.messages.filter((m) => m.id !== action.payload);
    },
    markMessageAsRead: (state, action) => {
      const message = state.messages.find((m) => m.id === action.payload);
      if (message) {
        message.status = "read";
      }
    },

    // Pending Approvals
    approvePending: (state, action) => {
      const item = state.pendingApprovals.find((i) => i.id === action.payload);
      if (item) {
        item.status = "approved";
      }
    },
    rejectPending: (state, action) => {
      const item = state.pendingApprovals.find((i) => i.id === action.payload);
      if (item) {
        item.status = "rejected";
      }
    },
    deletePending: (state, action) => {
      state.pendingApprovals = state.pendingApprovals.filter(
        (item) => item.id !== action.payload
      );
    },

    updateUser: (state, action) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },

    updateHospital: (state, action) => {
      const index = state.hospitals.findIndex(
        (hospital) => hospital.id === action.payload.id
      );
      if (index !== -1) {
        state.hospitals[index] = action.payload;
      }
    },

    addContactMessage: (state, action) => {
      state.contactMessages.unshift(action.payload);
    },
    setContactMessages: (state, action) => {
      state.contactMessages = action.payload;
    },
    deleteContactMessage: (state, action) => {
      state.contactMessages = state.contactMessages.filter(
        (msg) => msg.id !== action.payload
      );
    },
    markMessageAsRead: (state, action) => {
      const message = state.contactMessages.find(
        (msg) => msg.id === action.payload
      );
      if (message) {
        message.status = "read";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(toggleLockUser.fulfilled, (state, action) => {
        const user = state.users.find(u => u.id === action.payload.userId);
        if (user) {
          user.is_locked = !user.is_locked;
        }
      })
      .addCase(toggleActiveUser.fulfilled, (state, action) => {
        const user = state.users.find(u => u.id === action.payload.userId);
        if (user) {
          user.is_active = !user.is_active;
        }
      })
      .addCase(fetchDeletedUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeletedUsers.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.data) {
          state.deletedUsers = action.payload.data.users || [];
          state.pagination = action.payload.data.pagination || {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 1
          };
        } else {
          state.deletedUsers = [];
          state.pagination = {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 1
          };
        }
      })
      .addCase(fetchDeletedUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.deletedUsers = [];
      });
  }
});

export const {
  addUser,
  deleteUser,
  updateUserStatus,
  approveHospital,
  rejectHospital,
  deleteHospital,
  deleteBlog,
  updateBlogStatus,
  resolveReport,
  dismissReport,
  deleteMessage,
  markMessageAsRead,
  approvePending,
  rejectPending,
  deletePending,
  updateUser,
  updateHospital,
  addContactMessage,
  setContactMessages,
  deleteContactMessage,
} = adminSlice.actions;

export default adminSlice.reducer;
