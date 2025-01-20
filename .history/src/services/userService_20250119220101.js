import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const userService = {
  updateProfile: async (userData) => {
    try {
      const response = await axios.put(`${API_URL}/users/profile`, userData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  },

  updateAvatar: async (file) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      
      const response = await axios.put(`${API_URL}/users/avatar`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update avatar');
    }
  },

  updatePassword: async (passwordData) => {
    try {
      const response = await axios.put(`${API_URL}/users/password`, passwordData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update password');
    }
  },

  updateSocialMedia: async (socialData) => {
    try {
      const response = await axios.put(`${API_URL}/users/social`, socialData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update social media');
    }
  }
}; 