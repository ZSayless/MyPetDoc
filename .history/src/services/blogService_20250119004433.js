import api from "./api";
import { mockBlogs } from "../mocks/blogData";

export const blogService = {
  // Get all blogs with filters
  getBlogs: async (params) => {
    try {
      // const response = await api.get('/blogs', { params });
      // return response.data;
      return mockBlogs.filter(blog => {
        if (params.category && params.category !== 'all') {
          return blog.category === params.category;
        }
        return true;
      });
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  },

  // Get blog by id
  getBlogById: async (id) => {
    try {
      // const response = await api.get(`/blogs/${id}`);
      // return response.data;
      const blog = mockBlogs.find(b => b.id === parseInt(id));
      if (!blog) throw new Error('Blog not found');
      return blog;
    } catch (error) {
      console.error(`Error fetching blog ${id}:`, error);
      throw error;
    }
  },

  // Create/Update blog
  saveBlog: async (blogData, isDraft = false) => {
    try {
      const method = blogData.id ? 'put' : 'post';
      const url = blogData.id ? `/blogs/${blogData.id}` : '/blogs';
      // const response = await api[method](url, { ...blogData, status: isDraft ? 'draft' : 'published' });
      // return response.data;
      return { ...blogData, id: blogData.id || Date.now() };
    } catch (error) {
      console.error('Error saving blog:', error);
      throw error;
    }
  },

  // Delete blog
  deleteBlog: async (id) => {
    try {
      // await api.delete(`/blogs/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting blog:', error);
      throw error;
    }
  },

  // Like/Unlike blog
  toggleLike: async (id) => {
    try {
      // const response = await api.post(`/blogs/${id}/like`);
      // return response.data;
      return { liked: true };
    } catch (error) {
      console.error('Error toggling like:', error);
      throw error;
    }
  },

  // Get blog comments
  getComments: async (blogId) => {
    try {
      // const response = await api.get(`/blogs/${blogId}/comments`);
      // return response.data;
      return [];
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  },

  // Add comment
  addComment: async (blogId, content) => {
    try {
      // const response = await api.post(`/blogs/${blogId}/comments`, { content });
      // return response.data;
      return {
        id: Date.now(),
        content,
        createdAt: new Date().toISOString(),
        user: {
          name: 'Current User',
          avatar: null
        }
      };
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }
};
