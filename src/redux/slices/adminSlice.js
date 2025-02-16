import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  mockHospitals,
  mockBlogs,
  mockReports,
  mockMessages,
  mockPendingApprovals,
} from "../../data/mockData";
import {adminService} from '../../services/adminService';

const initialState = {
  users: [],
  deletedUsers: [],
  hospitals: mockHospitals || [],
  blogs: [],
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
  deletedHospitals: [],
  deletedPagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  },
  isLoadingReports: false,
  reportsError: null,
  banners: [],
  isLoadingBanners: false,
  bannersPagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  },
  isSubmittingBanner: false,
  isSubmittingBlog: false,
  deletedBlogs: [],
  faqs: [],
  faqsPagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  },
  isLoadingFaqs: false,
  faqsError: null,
  isSubmittingFaq: false,
  isDeletingFaq: false,
  posts: [],
  postsPagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  },
  isLoadingPosts: false,
  postsError: null,
  isUpdatingStatus: false,
  isDeletingPost: false,
  isSubmitting: false,
  isDeletingMessage: false,
  aboutUsVersions: [],
  isLoadingAboutUs: false,
  aboutUsError: null,
  isSubmittingAboutUs: false,
  currentAboutUs: null,
  isLoadingCurrentAboutUs: false,
  currentAboutUsError: null,
  termsList: [],
  termsPagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  },
  isLoadingTerms: false,
  termsError: null,
  isSubmittingTerms: false,
  contactInfoList: [],
  currentContactInfo: null,
  contactInfoPagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  },
  isLoadingContactInfo: false,
  contactInfoError: null,
  isDeletingBlogComment: false,
  deleteBlogCommentError: null,
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

export const createUser = createAsyncThunk(
  'admin/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await adminService.createUser(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'admin/updateUserInfo',
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await adminService.updateUser(userId, userData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUserPermanently = createAsyncThunk(
  'admin/deleteUserPermanently',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await adminService.deleteUserPermanently(userId);
      return { ...response, userId };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchHospitals = createAsyncThunk(
  'admin/fetchHospitals',
  async (params, { rejectWithValue }) => {
    try {
      const response = await adminService.getHospitals(params);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const toggleActiveHospital = createAsyncThunk(
  'admin/toggleActiveHospital',
  async (hospitalId, { rejectWithValue }) => {
    try {
      const response = await adminService.toggleActiveHospital(hospitalId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchDeletedHospitals = createAsyncThunk(
  'admin/fetchDeletedHospitals',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await adminService.getDeletedHospitals(page, limit);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const toggleDeleteHospital = createAsyncThunk(
  'admin/toggleDeleteHospital',
  async (hospitalId, { rejectWithValue }) => {
    try {
      const response = await adminService.toggleDeleteHospital(hospitalId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateHospital = createAsyncThunk(
  'admin/updateHospital',
  async ({ hospitalId, formData }, { rejectWithValue }) => {
    try {
      const response = await adminService.updateHospital(hospitalId, formData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createHospital = createAsyncThunk(
  'admin/createHospital',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await adminService.createHospital(formData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteHospitalPermanently = createAsyncThunk(
  'admin/deleteHospitalPermanently',
  async (hospitalId, { rejectWithValue }) => {
    try {
      await adminService.deleteHospitalPermanently(hospitalId);
      return hospitalId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchReports = createAsyncThunk(
  'admin/fetchReports',
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await adminService.getReports(page);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const resolveReport = createAsyncThunk(
  'admin/resolveReport',
  async (reportId, { rejectWithValue }) => {
    try {
      await adminService.resolveReport(reportId);
      return reportId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteReviewPermanently = createAsyncThunk(
  'admin/deleteReviewPermanently',
  async ({ reviewId, reportId }, { dispatch, rejectWithValue }) => {
    try {
      await adminService.deleteReviewPermanently(reviewId);
      dispatch(resolveReport(reportId));
      return { reviewId, reportId };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteReportPermanently = createAsyncThunk(
  'admin/deleteReportPermanently',
  async (reportId, { rejectWithValue }) => {
    try {
      await adminService.deleteReportPermanently(reportId);
      return reportId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteGalleryComment = createAsyncThunk(
  'admin/deleteGalleryComment',
  async ({ commentId, reportId }, { dispatch, rejectWithValue }) => {
    try {
      await adminService.deleteGalleryComment(commentId);
      dispatch(resolveReport(reportId));
      return { commentId, reportId };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchBanners = createAsyncThunk(
  'admin/fetchBanners',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.getBanners();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateBanner = createAsyncThunk(
  'admin/updateBanner',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await adminService.updateBanner(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const toggleActiveBanner = createAsyncThunk(
  'admin/toggleActiveBanner',
  async (id, { rejectWithValue }) => {
    try {
      const response = await adminService.toggleActiveBanner(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createBanner = createAsyncThunk(
  'admin/createBanner',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await adminService.createBanner(formData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const toggleDeleteBanner = createAsyncThunk(
  'admin/toggleDeleteBanner',
  async (id, { rejectWithValue }) => {
    try {
      const response = await adminService.toggleDeleteBanner(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const hardDeleteBanner = createAsyncThunk(
  'admin/hardDeleteBanner',
  async (id, { rejectWithValue }) => {
    try {
      await adminService.hardDeleteBanner(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchBlogPosts = createAsyncThunk(
  'admin/fetchBlogPosts',
  async (params, { rejectWithValue }) => {
    try {
      const response = await adminService.getBlogPosts(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createBlogPost = createAsyncThunk(
  'admin/createBlogPost',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await adminService.createBlogPost(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateBlogPost = createAsyncThunk(
  'admin/updateBlogPost',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await adminService.updateBlogPost(id, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchDeletedBlogs = createAsyncThunk(
  'admin/fetchDeletedBlogs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.fetchDeletedBlogs();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const toggleDeleteBlog = createAsyncThunk(
  'admin/toggleDeleteBlog',
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await adminService.toggleDeleteBlog(blogId);
      return { ...response.data, id: blogId };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteBlogPermanently = createAsyncThunk(
  'admin/deleteBlogPermanently',
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await adminService.deleteBlogPermanently(blogId);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const fetchFaqs = createAsyncThunk(
  'admin/fetchFaqs',
  async (params, { rejectWithValue }) => {
    try {
      const response = await adminService.getFaqs(params);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createFaq = createAsyncThunk(
  'admin/createFaq',
  async (data, { rejectWithValue }) => {
    try {
      const response = await adminService.createFaq(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateFaq = createAsyncThunk(
  'admin/updateFaq',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await adminService.updateFaq(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteFaq = createAsyncThunk(
  'admin/deleteFaq',
  async (id, { rejectWithValue }) => {
    try {
      const response = await adminService.deleteFaq(id);
      return { id, response };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchPosts = createAsyncThunk(
  'admin/fetchPosts',
  async (params, { rejectWithValue }) => {
    try {
      const response = await adminService.getAllPosts(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updatePostStatus = createAsyncThunk(
  'admin/updatePostStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await adminService.updatePostStatus(id, status);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deletePostPermanently = createAsyncThunk(
  'admin/deletePostPermanently',
  async (id, { rejectWithValue }) => {
    try {
      await adminService.deletePostPermanently(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchContactMessages = createAsyncThunk(
  'admin/fetchContactMessages',
  async (params, { rejectWithValue }) => {
    try {
      const response = await adminService.getContactMessages(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const respondToMessage = createAsyncThunk(
  'admin/respondToMessage',
  async ({ messageId, data }, { rejectWithValue }) => {
    try {
      const response = await adminService.respondToContactMessage(messageId, data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteContactMessagePermanently = createAsyncThunk(
  'admin/deleteContactMessagePermanently',
  async (messageId, { rejectWithValue }) => {
    try {
      await adminService.deleteContactMessagePermanently(messageId);
      return messageId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchAboutUsHistory = createAsyncThunk(
  'admin/fetchAboutUsHistory',
  async (params, { rejectWithValue }) => {
    try {
      const response = await adminService.getAboutUsHistory(params);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createAboutUs = createAsyncThunk(
  'admin/createAboutUs',
  async (data, { rejectWithValue }) => {
    try {
      const response = await adminService.createAboutUs(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateAboutUs = createAsyncThunk(
  'admin/updateAboutUs',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await adminService.updateAboutUs(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCurrentAboutUs = createAsyncThunk(
  'admin/fetchCurrentAboutUs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.getCurrentAboutUs();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteAboutUs = createAsyncThunk(
  'admin/deleteAboutUs',
  async (id, { rejectWithValue }) => {
    try {
      const response = await adminService.deleteAboutUs(id);
      return { id, response };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchTermsList = createAsyncThunk(
  'admin/fetchTermsList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.getTermsList();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createTerms = createAsyncThunk(
  'admin/createTerms',
  async (data, { rejectWithValue }) => {
    try {
      const response = await adminService.createTerms(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteTerms = createAsyncThunk(
  'admin/deleteTerms',
  async (id, { rejectWithValue }) => {
    try {
      await adminService.deleteTerms(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateTerms = createAsyncThunk(
  'admin/updateTerms',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await adminService.updateTerms(id, data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchContactInfoHistory = createAsyncThunk(
  'admin/fetchContactInfoHistory',
  async (params, { rejectWithValue }) => {
    try {
      const response = await adminService.getContactInfoHistory(params);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCurrentContactInfo = createAsyncThunk(
  'admin/fetchCurrentContactInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.getCurrentContactInfo();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createContactInfo = createAsyncThunk(
  'admin/createContactInfo',
  async (data, { rejectWithValue }) => {
    try {
      const response = await adminService.createContactInfo(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateContactInfo = createAsyncThunk(
  'admin/updateContactInfo',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await adminService.updateContactInfo(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteContactInfo = createAsyncThunk(
  'admin/deleteContactInfo',
  async (id, { rejectWithValue }) => {
    try {
      await adminService.deleteContactInfo(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteBlogComment = createAsyncThunk(
  'admin/deleteBlogComment',
  async ({ commentId, reportId }, { dispatch, rejectWithValue }) => {
    try {
      await adminService.deleteCommentBlog(commentId);
      dispatch(resolveReport(reportId));
      return { commentId, reportId };
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
    updateReportStatus: (state, action) => {
      const report = state.reports.find((r) => r.id === action.payload.reportId);
      if (report) {
        report.status = action.payload.status;
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
        state.error = action.error.message || "Có lỗi xảy ra khi tải dữ liệu";
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
      })
      .addCase(createUser.fulfilled, (state, action) => {
        if (action.payload && action.payload.data) {
          state.users = [action.payload.data, ...state.users];
        }
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        const updatedUser = action.payload.data;
        state.users = state.users.map(user => 
          user.id === updatedUser.id ? updatedUser : user
        );
      })
      .addCase(deleteUserPermanently.fulfilled, (state, action) => {
        state.deletedUsers = state.deletedUsers.filter(
          user => user.id !== action.payload.userId
        );
      })
      .addCase(fetchHospitals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHospitals.fulfilled, (state, action) => {
        state.loading = false;
        state.hospitals = action.payload.hospitals;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchHospitals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleActiveHospital.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleActiveHospital.fulfilled, (state, action) => {
        state.loading = false;
        const updatedHospital = action.payload;
        state.hospitals = state.hospitals.map(hospital =>
          hospital.id === updatedHospital.id ? updatedHospital : hospital
        );
      })
      .addCase(toggleActiveHospital.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDeletedHospitals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeletedHospitals.fulfilled, (state, action) => {
        state.loading = false;
        state.deletedHospitals = action.payload.data.hospitals;
        state.deletedPagination = action.payload.data.pagination;
      })
      .addCase(fetchDeletedHospitals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.deletedHospitals = [];
      })
      .addCase(toggleDeleteHospital.fulfilled, (state, action) => {
        const updatedHospital = action.payload.data.data;
        if (updatedHospital.is_deleted) {
          state.hospitals = state.hospitals.filter(h => h.id !== updatedHospital.id);
          if (!state.deletedHospitals.find(h => h.id === updatedHospital.id)) {
            state.deletedHospitals.push(updatedHospital);
          }
        } else {
          state.deletedHospitals = state.deletedHospitals.filter(h => h.id !== updatedHospital.id);
          if (!state.hospitals.find(h => h.id === updatedHospital.id)) {
            state.hospitals.push(updatedHospital);
          }
        }
      })
      .addCase(updateHospital.fulfilled, (state, action) => {
        const updatedHospital = action.payload.data.data;
        const index = state.hospitals.findIndex(h => h.id === updatedHospital.id);
        if (index !== -1) {
          state.hospitals[index] = updatedHospital;
        }
      })
      .addCase(createHospital.fulfilled, (state, action) => {
        state.hospitals.unshift(action.payload.data.data);
      })
      .addCase(deleteHospitalPermanently.fulfilled, (state, action) => {
        state.deletedHospitals = state.deletedHospitals.filter(
          hospital => hospital.id !== action.payload
        );
      })
      .addCase(fetchReports.pending, (state) => {
        state.isLoadingReports = true;
        state.reportsError = null;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.reports = action.payload.reports;
        state.isLoadingReports = false;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.isLoadingReports = false;
        state.reportsError = action.payload;
      })
      .addCase(resolveReport.fulfilled, (state, action) => {
        const reportIndex = state.reports.findIndex(
          report => report.id === action.payload
        );
        if (reportIndex !== -1) {
          state.reports[reportIndex].resolved = true;
        }
      })
      .addCase(deleteReviewPermanently.fulfilled, (state, action) => {
        const reportIndex = state.reports.findIndex(
          report => report.id === action.payload.reportId
        );
        if (reportIndex !== -1) {
          state.reports[reportIndex].resolved = true;
        }
      })
      .addCase(deleteReportPermanently.fulfilled, (state, action) => {
        state.reports = state.reports.filter(report => report.id !== action.payload);
      })
      .addCase(deleteGalleryComment.fulfilled, (state, action) => {
        const reportIndex = state.reports.findIndex(
          report => report.id === action.payload.reportId
        );
        if (reportIndex !== -1) {
          state.reports[reportIndex].resolved = true;
        }
      })
      .addCase(fetchBanners.pending, (state) => {
        state.isLoadingBanners = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.isLoadingBanners = false;
        state.banners = action.payload.banners;
        state.bannersPagination = action.payload.pagination;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.isLoadingBanners = false;
        state.error = action.payload;
      })
      .addCase(updateBanner.pending, (state) => {
        state.isSubmittingBanner = true;
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        state.isSubmittingBanner = false;
        const index = state.banners.findIndex(banner => banner.id === action.payload.id);
        if (index !== -1) {
          state.banners[index] = action.payload;
        }
      })
      .addCase(updateBanner.rejected, (state) => {
        state.isSubmittingBanner = false;
      })
      .addCase(toggleActiveBanner.fulfilled, (state, action) => {
        const index = state.banners.findIndex(banner => banner.id === action.payload.id);
        if (index !== -1) {
          state.banners[index] = action.payload;
        }
      })
      .addCase(createBanner.pending, (state) => {
        state.isSubmittingBanner = true;
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.isSubmittingBanner = false;
        state.banners.unshift(action.payload);
      })
      .addCase(createBanner.rejected, (state) => {
        state.isSubmittingBanner = false;
      })
      .addCase(toggleDeleteBanner.fulfilled, (state, action) => {
        const index = state.banners.findIndex(banner => banner.id === action.payload.id);
        if (index !== -1) {
          state.banners[index] = action.payload;
        }
      })
      .addCase(hardDeleteBanner.fulfilled, (state, action) => {
        state.banners = state.banners.filter(banner => banner.id !== action.payload);
      })
      .addCase(fetchBlogPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.posts;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBlogPost.pending, (state) => {
        state.isSubmittingBlog = true;
        state.error = null;
      })
      .addCase(createBlogPost.fulfilled, (state, action) => {
        state.isSubmittingBlog = false;
        state.blogs.unshift(action.payload);
      })
      .addCase(createBlogPost.rejected, (state, action) => {
        state.isSubmittingBlog = false;
        state.error = action.payload;
      })
      .addCase(updateBlogPost.pending, (state) => {
        state.isSubmittingBlog = true;
        state.error = null;
      })
      .addCase(updateBlogPost.fulfilled, (state, action) => {
        state.isSubmittingBlog = false;
        const updatedBlog = action.payload;
        const index = state.blogs.findIndex(blog => blog.id === updatedBlog.id);
        if (index !== -1) {
          state.blogs[index] = updatedBlog;
        }
      })
      .addCase(updateBlogPost.rejected, (state, action) => {
        state.isSubmittingBlog = false;
        state.error = action.payload;
      })
      .addCase(fetchDeletedBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.deletedBlogs = action.payload.data.posts;
        state.pagination = action.payload.data.pagination;
      })
      .addCase(toggleDeleteBlog.fulfilled, (state, action) => {
        const { id, is_deleted } = action.payload;
        if (is_deleted) {
          state.blogs = state.blogs.filter(b => b.id !== id);
          state.deletedBlogs.push({ ...state.blogs.find(b => b.id === id), is_deleted: true });
        } else {
          state.deletedBlogs = state.deletedBlogs.filter(b => b.id !== id);
          state.blogs.push({ ...state.deletedBlogs.find(b => b.id === id), is_deleted: false });
        }
      })
      .addCase(deleteBlogPermanently.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlogPermanently.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteBlogPermanently.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFaqs.pending, (state) => {
        state.isLoadingFaqs = true;
        state.faqsError = null;
      })
      .addCase(fetchFaqs.fulfilled, (state, action) => {
        state.isLoadingFaqs = false;
        state.faqs = action.payload.faqs || [];
        state.faqsPagination = action.payload.pagination || {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 1
        };
      })
      .addCase(fetchFaqs.rejected, (state, action) => {
        state.isLoadingFaqs = false;
        state.faqsError = action.payload;
        state.faqs = [];
      })
      .addCase(createFaq.pending, (state) => {
        state.isSubmittingFaq = true;
      })
      .addCase(createFaq.fulfilled, (state, action) => {
        state.isSubmittingFaq = false;
        if (action.payload.data) {
          state.faqs.unshift(action.payload.data);
        }
      })
      .addCase(createFaq.rejected, (state) => {
        state.isSubmittingFaq = false;
      })
      .addCase(updateFaq.pending, (state) => {
        state.isSubmittingFaq = true;
      })
      .addCase(updateFaq.fulfilled, (state, action) => {
        state.isSubmittingFaq = false;
        const updatedFaq = action.payload.data;
        const index = state.faqs.findIndex(faq => faq.id === updatedFaq.id);
        if (index !== -1) {
          state.faqs[index] = updatedFaq;
        }
      })
      .addCase(updateFaq.rejected, (state) => {
        state.isSubmittingFaq = false;
      })
      .addCase(deleteFaq.pending, (state) => {
        state.isDeletingFaq = true;
      })
      .addCase(deleteFaq.fulfilled, (state, action) => {
        state.isDeletingFaq = false;
        state.faqs = state.faqs.filter(faq => faq.id !== action.payload.id);
      })
      .addCase(deleteFaq.rejected, (state) => {
        state.isDeletingFaq = false;
      })
      .addCase(fetchPosts.pending, (state) => {
        state.isLoadingPosts = true;
        state.postsError = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoadingPosts = false;
        state.posts = action.payload.posts;
        state.postsPagination = action.payload.pagination;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoadingPosts = false;
        state.postsError = action.payload;
      })
      .addCase(updatePostStatus.pending, (state) => {
        state.isUpdatingStatus = true;
      })
      .addCase(updatePostStatus.fulfilled, (state, action) => {
        state.isUpdatingStatus = false;
        const updatedPost = action.payload;
        const index = state.posts.findIndex(post => post.id === updatedPost.id);
        if (index !== -1) {
          state.posts[index] = { ...state.posts[index], ...updatedPost };
        }
      })
      .addCase(updatePostStatus.rejected, (state) => {
        state.isUpdatingStatus = false;
      })
      .addCase(deletePostPermanently.pending, (state) => {
        state.isDeletingPost = true;
      })
      .addCase(deletePostPermanently.fulfilled, (state, action) => {
        state.isDeletingPost = false;
        state.posts = state.posts.filter(post => post.id !== action.payload);
      })
      .addCase(deletePostPermanently.rejected, (state) => {
        state.isDeletingPost = false;
      })
      .addCase(fetchContactMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContactMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.contactMessages = action.payload.messages;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchContactMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(respondToMessage.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
      })
      .addCase(respondToMessage.fulfilled, (state, action) => {
        state.isSubmitting = false;
        const updatedMessage = action.payload;
        const index = state.contactMessages.findIndex(msg => msg.id === updatedMessage.id);
        if (index !== -1) {
          state.contactMessages[index] = updatedMessage;
        }
      })
      .addCase(respondToMessage.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload;
      })
      .addCase(deleteContactMessagePermanently.pending, (state) => {
        state.isDeletingMessage = true;
        state.error = null;
      })
      .addCase(deleteContactMessagePermanently.fulfilled, (state, action) => {
        state.isDeletingMessage = false;
        state.contactMessages = state.contactMessages.filter(
          message => message.id !== action.payload
        );
        state.selectedMessage = null;
      })
      .addCase(deleteContactMessagePermanently.rejected, (state, action) => {
        state.isDeletingMessage = false;
        state.error = action.payload;
      })
      .addCase(fetchAboutUsHistory.pending, (state) => {
        state.isLoadingAboutUs = true;
        state.aboutUsError = null;
      })
      .addCase(fetchAboutUsHistory.fulfilled, (state, action) => {
        state.isLoadingAboutUs = false;
        state.aboutUsVersions = action.payload?.versions || [];
        state.pagination = action.payload?.pagination || {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 1
        };
      })
      .addCase(fetchAboutUsHistory.rejected, (state, action) => {
        state.isLoadingAboutUs = false;
        state.aboutUsError = action.payload;
        state.aboutUsVersions = [];
      })
      .addCase(createAboutUs.pending, (state) => {
        state.isSubmittingAboutUs = true;
        state.aboutUsError = null;
      })
      .addCase(createAboutUs.fulfilled, (state, action) => {
        state.isSubmittingAboutUs = false;
        state.aboutUsVersions.unshift(action.payload);
      })
      .addCase(createAboutUs.rejected, (state, action) => {
        state.isSubmittingAboutUs = false;
        state.aboutUsError = action.payload;
      })
      .addCase(updateAboutUs.pending, (state) => {
        state.isSubmittingAboutUs = true;
        state.aboutUsError = null;
      })
      .addCase(updateAboutUs.fulfilled, (state, action) => {
        state.isSubmittingAboutUs = false;
        const updatedVersion = action.payload.data;
        const index = state.aboutUsVersions.findIndex(v => v.id === updatedVersion.id);
        if (index !== -1) {
          state.aboutUsVersions[index] = updatedVersion;
        }
        state.currentAboutUs = updatedVersion;
      })
      .addCase(updateAboutUs.rejected, (state, action) => {
        state.isSubmittingAboutUs = false;
        state.aboutUsError = action.payload;
      })
      .addCase(fetchCurrentAboutUs.pending, (state) => {
        state.isLoadingCurrentAboutUs = true;
        state.currentAboutUsError = null;
      })
      .addCase(fetchCurrentAboutUs.fulfilled, (state, action) => {
        state.isLoadingCurrentAboutUs = false;
        state.currentAboutUs = action.payload;
      })
      .addCase(fetchCurrentAboutUs.rejected, (state, action) => {
        state.isLoadingCurrentAboutUs = false;
        state.currentAboutUsError = action.payload;
      })
      .addCase(deleteAboutUs.pending, (state) => {
        state.isSubmittingAboutUs = true;
        state.aboutUsError = null;
      })
      .addCase(deleteAboutUs.fulfilled, (state, action) => {
        state.isSubmittingAboutUs = false;
        state.aboutUsVersions = state.aboutUsVersions.filter(
          version => version.id !== action.payload.id
        );
      })
      .addCase(deleteAboutUs.rejected, (state, action) => {
        state.isSubmittingAboutUs = false;
        state.aboutUsError = action.payload;
      })
      .addCase(fetchTermsList.pending, (state) => {
        state.isLoadingTerms = true;
        state.termsError = null;
      })
      .addCase(fetchTermsList.fulfilled, (state, action) => {
        state.isLoadingTerms = false;
        state.termsList = action.payload.versions;
        state.termsPagination = action.payload.pagination;
      })
      .addCase(fetchTermsList.rejected, (state, action) => {
        state.isLoadingTerms = false;
        state.termsError = action.payload;
      })
      .addCase(createTerms.pending, (state) => {
        state.isSubmittingTerms = true;
        state.termsError = null;
      })
      .addCase(createTerms.fulfilled, (state, action) => {
        state.isSubmittingTerms = false;
        state.termsList = [action.payload, ...state.termsList];
      })
      .addCase(createTerms.rejected, (state, action) => {
        state.isSubmittingTerms = false;
        state.termsError = action.payload;
      })
      .addCase(deleteTerms.pending, (state) => {
        state.isSubmittingTerms = true;
        state.termsError = null;
      })
      .addCase(deleteTerms.fulfilled, (state, action) => {
        state.isSubmittingTerms = false;
        state.termsList = state.termsList.filter(terms => terms.id !== action.payload);
      })
      .addCase(deleteTerms.rejected, (state, action) => {
        state.isSubmittingTerms = false;
        state.termsError = action.payload;
      })
      .addCase(updateTerms.pending, (state) => {
        state.isSubmittingTerms = true;
        state.termsError = null;
      })
      .addCase(updateTerms.fulfilled, (state, action) => {
        state.isSubmittingTerms = false;
        const index = state.termsList.findIndex(terms => terms.id === action.payload.id);
        if (index !== -1) {
          state.termsList[index] = action.payload;
        }
      })
      .addCase(updateTerms.rejected, (state, action) => {
        state.isSubmittingTerms = false;
        state.termsError = action.payload;
      })
      .addCase(fetchContactInfoHistory.pending, (state) => {
        state.isLoadingContactInfo = true;
        state.contactInfoError = null;
      })
      .addCase(fetchContactInfoHistory.fulfilled, (state, action) => {
        state.isLoadingContactInfo = false;
        state.contactInfoList = action.payload.versions;
        state.contactInfoPagination = action.payload.pagination;
      })
      .addCase(fetchContactInfoHistory.rejected, (state, action) => {
        state.isLoadingContactInfo = false;
        state.contactInfoError = action.payload;
      })
      .addCase(fetchCurrentContactInfo.pending, (state) => {
        state.isLoadingContactInfo = true;
        state.contactInfoError = null;
      })
      .addCase(fetchCurrentContactInfo.fulfilled, (state, action) => {
        state.isLoadingContactInfo = false;
        state.currentContactInfo = action.payload;
      })
      .addCase(fetchCurrentContactInfo.rejected, (state, action) => {
        state.isLoadingContactInfo = false;
        state.contactInfoError = action.payload;
      })
      .addCase(createContactInfo.pending, (state) => {
        state.isSubmittingContactInfo = true;
        state.contactInfoError = null;
      })
      .addCase(createContactInfo.fulfilled, (state, action) => {
        state.isSubmittingContactInfo = false;
        state.contactInfoList = [action.payload, ...state.contactInfoList];
        state.contactInfoPagination.total += 1;
      })
      .addCase(createContactInfo.rejected, (state, action) => {
        state.isSubmittingContactInfo = false;
        state.contactInfoError = action.payload;
      })
      .addCase(updateContactInfo.pending, (state) => {
        state.isSubmittingContactInfo = true;
        state.contactInfoError = null;
      })
      .addCase(updateContactInfo.fulfilled, (state, action) => {
        state.isSubmittingContactInfo = false;
        state.contactInfoList = state.contactInfoList.map(info => 
          info.id === action.payload.id ? action.payload : info
        );
      })
      .addCase(updateContactInfo.rejected, (state, action) => {
        state.isSubmittingContactInfo = false;
        state.contactInfoError = action.payload;
      })
      .addCase(deleteContactInfo.pending, (state) => {
        state.isSubmittingContactInfo = true;
        state.contactInfoError = null;
      })
      .addCase(deleteContactInfo.fulfilled, (state, action) => {
        state.isSubmittingContactInfo = false;
        state.contactInfoList = state.contactInfoList.filter(
          info => info.id !== action.payload
        );
        state.contactInfoPagination.total -= 1;
      })
      .addCase(deleteContactInfo.rejected, (state, action) => {
        state.isSubmittingContactInfo = false;
        state.contactInfoError = action.payload;
      })
      .addCase(deleteBlogComment.pending, (state) => {
        state.isDeletingBlogComment = true;
        state.deleteBlogCommentError = null;
      })
      .addCase(deleteBlogComment.fulfilled, (state, action) => {
        state.isDeletingBlogComment = false;
        state.deleteBlogCommentError = null;
        const reportIndex = state.reports.findIndex(
          report => report.id === action.payload.reportId
        );
        if (reportIndex !== -1) {
          state.reports[reportIndex].resolved = true;
        }
      })
      .addCase(deleteBlogComment.rejected, (state, action) => {
        state.isDeletingBlogComment = false;
        state.deleteBlogCommentError = action.payload;
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
  updateReportStatus,
  deleteMessage,
  markMessageAsRead,
  approvePending,
  rejectPending,
  deletePending,
  updateUser,
  addContactMessage,
  setContactMessages,
  deleteContactMessage,
} = adminSlice.actions;

export default adminSlice.reducer;
