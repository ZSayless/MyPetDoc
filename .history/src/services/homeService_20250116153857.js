import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const homeService = {
  // Lấy featured hospitals
  getFeaturedHospitals: async () => {
    try {
      const response = await axios.get(`${API_URL}/hospitals/featured`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Lấy latest blogs
  getLatestBlogs: async () => {
    try {
      const response = await axios.get(`${API_URL}/blogs/latest`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Lấy testimonials
  getTestimonials: async () => {
    try {
      const response = await axios.get(`${API_URL}/testimonials`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Lấy statistics
  getStatistics: async () => {
    try {
      const response = await axios.get(`${API_URL}/statistics`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}; 