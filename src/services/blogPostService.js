import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export const blogPostService = {
  // Get all posts
  getPosts: async (page = 1, limit = 10) => {
    try {
      const response = await axios.get(`${BASE_URL}/blog-posts`, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get post by slug
  getPostBySlug: async (slug) => {
    try {
      const response = await axios.get(`${BASE_URL}/blog-posts/slug/${slug}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Toggle like
  toggleLike: async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BASE_URL}/blog-posts/${postId}/like`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Toggle like response:', response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Check if post is liked
  checkLiked: async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/blog-posts/${postId}/check-like`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Check like response:', response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get comments for a post
  getComments: async (postId, page = 1, limit = 10) => {
    try {
      const response = await axios.get(`${BASE_URL}/blog-posts/${postId}/comments`, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create a new comment
  createComment: async (postId, parentId, content) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${BASE_URL}/blog-posts/${postId}/comments`,
        { content, parent_id: parentId },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete a comment
  deleteComment: async (commentId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${BASE_URL}/blog-posts/comments/${commentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Report a comment
  reportComment: async (commentId, reason) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${BASE_URL}/blog-posts/comments/${commentId}/report`,
        { reason },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
