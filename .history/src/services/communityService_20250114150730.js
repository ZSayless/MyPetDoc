import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export const communityService = {
  // Posts
  getPosts: (page = 1, limit = 10) => 
    axios.get(`${BASE_URL}/posts?page=${page}&limit=${limit}`),
  
  getPostById: (postId) => 
    axios.get(`${BASE_URL}/posts/${postId}`),
  
  createPost: (data) => 
    axios.post(`${BASE_URL}/posts`, data),
  
  updatePost: (postId, data) => 
    axios.put(`${BASE_URL}/posts/${postId}`, data),
  
  deletePost: (postId) => 
    axios.delete(`${BASE_URL}/posts/${postId}`),

  // Comments
  getComments: (postId) => 
    axios.get(`${BASE_URL}/posts/${postId}/comments`),
  
  addComment: (postId, data) => 
    axios.post(`${BASE_URL}/posts/${postId}/comments`, data),
  
  deleteComment: (commentId) => 
    axios.delete(`${BASE_URL}/comments/${commentId}`),

  // Likes
  likePost: (postId) => 
    axios.post(`${BASE_URL}/posts/${postId}/like`),
  
  unlikePost: (postId) => 
    axios.delete(`${BASE_URL}/posts/${postId}/like`),

  // Reports
  reportPost: (postId, reason) => 
    axios.post(`${BASE_URL}/posts/${postId}/report`, { reason }),
}; 