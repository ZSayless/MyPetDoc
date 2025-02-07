import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export const communityService = {
  // Posts
  getPosts: async (page = 1, limit = 10) => {
    try {
      const response = await axios.get(`${BASE_URL}/community/posts`, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getPostBySlug: async (slug) => {
    try {
      const response = await axios.get(`${BASE_URL}/community/posts/${slug}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createPost: async (formData) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.post(`${BASE_URL}/community/posts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  deletePost: async (postId) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.delete(`${BASE_URL}/community/posts/${postId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Comments
  getComments: async (postId, page = 1, limit = 10) => {
    try {
      const response = await axios.get(`${BASE_URL}/community/posts/${postId}/comments`, {
        params: { page, limit }
      });

      if (response.data.success && response.data.data.comments) {
        // Fetch replies cho mỗi comment
        const commentsWithReplies = await Promise.all(
          response.data.data.comments.map(async (comment) => {
            if (comment.replies_count > 0) {
              const repliesResponse = await communityService.getReplies(comment.id);
              return {
                ...comment,
                is_deleted: comment.is_deleted === 1 || comment.is_deleted === true,
                is_reported: comment.is_reported?.data ? comment.is_reported.data[0] === 1 : false,
                replies: repliesResponse.data.replies || []
              };
            }
            return {
              ...comment,
              is_deleted: comment.is_deleted === 1 || comment.is_deleted === true,
              is_reported: comment.is_reported?.data ? comment.is_reported.data[0] === 1 : false,
              replies: []
            };
          })
        );

        return {
          ...response.data,
          data: {
            ...response.data.data,
            comments: commentsWithReplies
          }
        };
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createComment: async (postId, parentId, content) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
        `${BASE_URL}/community/posts/${postId}/comments`, 
        { 
          content, 
          parent_id: parentId
        }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success && response.data.data) {
        const processedComment = {
          ...response.data.data,
          is_deleted: response.data.data.is_deleted === 1 || response.data.data.is_deleted === true,
          is_reported: response.data.data.is_reported?.data ? response.data.data.is_reported.data[0] === 1 : false,
          parent_id: parentId
        };

        return {
          ...response.data,
          data: processedComment
        };
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteComment: async (commentId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${BASE_URL}/community/comments/${commentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if(response.data.success && response.data.data){
        const processedComment = {
          ...response.data.data,
          is_deleted: response.data.data.is_deleted === 1 || response.data.data.is_deleted === true,
          is_reported: response.data.data.is_reported?.data ? response.data.data.is_reported.data[0] === 1 : false
        };
        return {
          ...response.data,
          data: processedComment
        };
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Replies
  getReplies: async (commentId, page = 1, limit = 10) => {
    try {
      const response = await axios.get(`${BASE_URL}/community/comments/${commentId}/replies`, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  // Likes
  likePost: async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BASE_URL}/community/posts/${postId}/like`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // check if user has liked post
  checkLikedPost: async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/community/posts/${postId}/like/check`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  unlikePost: async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BASE_URL}/community/posts/${postId}/like`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Reports
  reportPost: async (postId, reason) => {
    try {
      const response = await axios.post(`${BASE_URL}/community/posts/${postId}/report`, { reason });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  reportComment: async (commentId, reason) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BASE_URL}/community/comments/${commentId}/report`, { reason }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // User's posts
  getUserPosts: async (userId, page = 1, limit = 10) => {
    try {
      const response = await axios.get(`${BASE_URL}/community/users/${userId}/posts`, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
