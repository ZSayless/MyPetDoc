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
  }
}; 