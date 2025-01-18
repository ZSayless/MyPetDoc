import api from "./api";
import { mockBlogs } from "../mocks/blogData";

export const blogService = {
  getRecentBlogs: async () => {
    try {
      // Khi có API thật, uncomment đoạn này
      // const response = await api.get('/blogs/recent');
      // return response.data;

      // Mock data
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockBlogs), 500);
      });
    } catch (error) {
      console.error("Error fetching recent blogs:", error);
      return mockBlogs;
    }
  },

  getBlogById: async (id) => {
    try {
      // const response = await api.get(`/blogs/${id}`);
      // return response.data;
      const blog = mockBlogs.find((blog) => blog.id === id);
      return new Promise((resolve) => {
        setTimeout(() => resolve(blog), 500);
      });
    } catch (error) {
      console.error(`Error fetching blog ${id}:`, error);
      throw error;
    }
  },
};
