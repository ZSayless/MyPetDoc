import { createSlice } from "@reduxjs/toolkit";
import {
  mockUsers,
  mockHospitals,
  mockBlogs,
  mockReports,
  mockMessages,
  mockPendingApprovals,
} from "../../data/mockData";

const initialState = {
  users: mockUsers || [],
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
};

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
  },
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
} = adminSlice.actions;

export default adminSlice.reducer;
