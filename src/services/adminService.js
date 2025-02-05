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
  }
}; 