import { useState, useCallback } from 'react';
import { blogService } from '../services/blogService';
import { useAsync } from './useAsync';

export function useBlog(id) {
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);

  const { data: blog, loading, error, execute: fetchBlog } = useAsync(
    () => blogService.getBlogById(id),
    true
  );

  const toggleLike = useCallback(async () => {
    try {
      await blogService.toggleLike(id);
      setIsLiked(prev => !prev);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  }, [id]);

  const addComment = useCallback(async (content) => {
    try {
      const newComment = await blogService.addComment(id, content);
      setComments(prev => [...prev, newComment]);
      return newComment;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }, [id]);

  return {
    blog,
    loading,
    error,
    isLiked,
    comments,
    toggleLike,
    addComment,
    refetch: fetchBlog
  };
} 