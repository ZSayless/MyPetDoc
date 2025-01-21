import api from "./api";
import { storageService } from "./localStorage";

export const communityService = {
  // Get all posts
  getPosts: async () => {
    try {
      // const response = await api.get('/posts');
      // return response.data;
      return mockPosts.map(post => ({
        ...post,
        comments: post.comments || []
      }));
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },

  // Create new post
  createPost: async (postData) => {
    try {
      // const response = await api.post('/posts', postData);
      // return response.data;
      return {
        id: Date.now(),
        ...postData,
        createdAt: "Just now",
        likes: 0,
        comments: [],
        isLiked: false,
      };
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  },

  // Delete post
  deletePost: async (postId) => {
    try {
      // await api.delete(`/posts/${postId}`);
      return true;
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  },

  // Update post
  updatePost: async (postId, postData) => {
    try {
      // const response = await api.put(`/posts/${postId}`, postData);
      // return response.data;
      return {
        ...postData,
        id: postId,
        comments: postData.comments || [],
        updatedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  },

  // Posts
  getPostById: (postId) => api.get(`/posts/${postId}`),

  // Comments
  getComments: async (postId) => {
    try {
      // const response = await api.get(`/posts/${postId}/comments`);
      // return response.data;
      const posts = storageService.getPosts();
      const post = posts.find(p => p.id === postId);
      return post?.comments || [];
    } catch (error) {
      console.error("Error getting comments:", error);
      throw error;
    }
  },

  addComment: async (postId, commentData) => {
    try {
      // const response = await api.post(`/posts/${postId}/comments`, commentData);
      // return response.data;
      const posts = storageService.getPosts();
      const postIndex = posts.findIndex(p => p.id === postId);
      
      if (postIndex === -1) throw new Error("Post not found");
      
      const newComment = {
        id: Date.now(),
        ...commentData,
        createdAt: "Just now",
      };
      
      if (!Array.isArray(posts[postIndex].comments)) {
        posts[postIndex].comments = [];
      }
      
      posts[postIndex].comments.push(newComment);
      storageService.savePosts(posts);
      
      return newComment;
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  },

  deleteComment: (commentId) => api.delete(`/comments/${commentId}`),

  // Likes
  likePost: (postId) => api.post(`/posts/${postId}/like`),

  unlikePost: (postId) => api.delete(`/posts/${postId}/like`),

  // Reports
  reportPost: (postId, reason) =>
    api.post(`/posts/${postId}/report`, { reason }),
};

// Mock data
const mockPosts = [
  {
    id: 1,
    author: {
      id: 1,
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    },
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
    content: "My lovely cat just had her first vaccination today!",
    createdAt: "2 hours ago",
    likes: 24,
    comments: [],
    isLiked: false,
  },
  // ... other mock posts
];
