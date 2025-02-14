import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export const adminService = {
  getUsers: async (page = 1, limit = 10) => {
    try {
      const response = await axios.get(`${BASE_URL}/users`, {
        params: { page, limit },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  toggleLockUser: async (userId) => {
    try {
      if (!userId) throw new Error('User ID is required');
      const response = await axios.patch(`${BASE_URL}/users/${userId}/toggle-lock`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  toggleActiveUser: async (userId) => {
    try {
      if (!userId) throw new Error('User ID is required');
      
      const response = await axios.patch(
        `${BASE_URL}/users/${userId}/toggle-active`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  toggleDeleteUser: async (userId) => {
    try {
      if (!userId) throw new Error('User ID is required');
      
      const response = await axios.patch(
        `${BASE_URL}/users/${userId}/toggle-delete`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  getDeletedUsers: async (page = 1, limit = 10) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/deleted/list`, {
        params: { page, limit },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  createUser: async (userData) => {
    try {
      const formData = new FormData();
      formData.append('email', userData.email);
      formData.append('full_name', userData.full_name);
      formData.append('password', userData.password);
      formData.append('role', userData.role);
      formData.append('phone_number', userData.phone_number);
      if (userData.avatar) {
        formData.append('avatar', userData.avatar);
      }

      const response = await axios.post(`${BASE_URL}/users/create`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  updateUser: async (userId, userData) => {
    try {
      const formData = new FormData();
      
      // Xử lý dữ liệu trước khi append vào formData
      Object.keys(userData).forEach(key => {
        if (key === 'avatar' || key === 'pet_photo') {
          if (userData[key] instanceof File) {
            formData.append(key, userData[key]);
          }
        } else {
          // Chỉ append các giá trị không phải null/undefined
          // Với các trường string, gửi '' thay vì null/undefined
          if (userData[key] !== null && userData[key] !== undefined) {
            if (typeof userData[key] === 'string') {
              formData.append(key, userData[key] || '');
            } else {
              formData.append(key, userData[key]);
            }
          }
        }
      });

      const response = await axios.put(`${BASE_URL}/users/${userId}`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  deleteUserPermanently: async (userId) => {
    try {
      if (!userId) throw new Error('User ID is required');
      
      const response = await axios({
        method: 'DELETE',
        url: `${BASE_URL}/users/${userId}`,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  getHospitals: async (params = {}) => {
    try {
      const response = await axios.get(`${BASE_URL}/hospitals`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        params
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  toggleActiveHospital: async (hospitalId) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/hospitals/${hospitalId}/toggle-active`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  // getDeletedHospitals
  getDeletedHospitals: async (page = 1, limit = 10) => {
    try {
      const response = await axios.get(`${BASE_URL}/hospitals/deleted/list`, {
        params: { page, limit },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  // toggleDeleteHospital
  toggleDeleteHospital: async (hospitalId) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/hospitals/${hospitalId}/toggle-delete`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  updateHospital: async (hospitalId, formData) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/hospitals/${hospitalId}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      return response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  createHospital: async (formData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/hospitals/create`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      return response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  deleteHospitalPermanently: async (hospitalId) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/hospitals/${hospitalId}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  // Lấy danh sách reports
  getReports: async (page = 1) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/reports?page=${page}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  // Đánh dấu report đã xử lý
  resolveReport: async (reportId) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/reports/${reportId}/resolve`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  // Xóa cứng review
  deleteReviewPermanently: async (reviewId) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/reviews/${reviewId}/hard`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  // Xóa cứng report
  deleteReportPermanently: async (reportId) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/reports/${reportId}/force`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  // Xóa gallery comment
  deleteGalleryComment: async (commentId) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/community/comments/${commentId}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  // Lấy danh sách banners
  getBanners: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/banners`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data; // Trả về cả object bao gồm banners và pagination
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  updateBanner: async (id, formData) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/banners/${id}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  toggleActiveBanner: async (id) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/banners/${id}/toggle-active`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  createBanner: async (formData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/banners`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  toggleDeleteBanner: async (id) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/banners/${id}/soft`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  hardDeleteBanner: async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/banners/${id}/hard`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  getBlogPosts: async (params = {}) => {
    try {
      const response = await axios.get(`${BASE_URL}/blog-posts/admin/all`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        params
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  createBlogPost: async (formData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/blog-posts/admin`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  updateBlogPost: async (id, formData) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/blog-posts/admin/${id}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  fetchDeletedBlogs: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/blog-posts/admin/trash`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  toggleDeleteBlog: async (blogId) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/blog-posts/admin/${blogId}/toggle-delete`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  deleteBlogPermanently: async (blogId) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/blog-posts/admin/hard/${blogId}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  getFaqs: async (params = {}) => {
    try {
      const response = await axios.get(`${BASE_URL}/faqs`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        params
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  createFaq: async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/faqs`, data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  updateFaq: async (id, data) => {
    try {
      const response = await axios.put(`${BASE_URL}/faqs/${id}`, data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  deleteFaq: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/faqs/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  getAllPosts: async (params) => {
    try {
      const response = await axios.get(`${BASE_URL}/community/admin/posts/all`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          ...params
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  updatePostStatus: async (id, status) => {
    try {
      const response = await axios.patch(`${BASE_URL}/community/admin/posts/${id}/status`, 
        { status },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
  deletePostPermanently: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/community/posts/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getContactMessages: async (params = {}) => {
    try {
      const response = await axios.get(`${BASE_URL}/contact-messages`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          ...params
        }
      });
      return response.data.result;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  respondToContactMessage: async (messageId, data) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/contact-messages/${messageId}/respond`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data.message;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteContactMessagePermanently: async (messageId) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/contact-messages/${messageId}/hard-delete`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getAboutUsHistory: async (params = { page: 1, limit: 10 }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/about-us/history`,
        {
          params: {
            page: params.page,
            limit: params.limit
          },
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      // Đảm bảo trả về đúng format dữ liệu
      return {
        versions: response.data?.versions || [],
        pagination: response.data?.pagination || {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 1
        }
      };
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  createAboutUs: async (data) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/about-us/create`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateAboutUs: async (id, data) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/about-us/update/${id}`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getCurrentAboutUs: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/about-us/current`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  deleteAboutUs: async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/about-us/hard-delete/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
}; 