import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const getHospitals = async () => {
  const response = await axios.get(`${BASE_URL}/hospitals`);
  return response.data;
};

const getHospitalDetail = async (slug) => {
  try {
    const response = await axios.get(`${BASE_URL}/hospitals/by-slug/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching hospital:", error);
    throw error;
  }
};

// Thêm các hàm mới
const toggleLikeHospitalImage = async (hospitalId, imageId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${BASE_URL}/hospitals/${hospitalId}/images/${imageId}/like`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
};

const checkImageLikeStatus = async (hospitalId, imageId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `${BASE_URL}/hospitals/${hospitalId}/images/${imageId}/like/check`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error checking like status:", error);
    throw error;
  }
};

const createReview = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${BASE_URL}/reviews`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};

const updateReview = async (reviewId, formData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(
      `${BASE_URL}/reviews/${reviewId}`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};

const getUserReviews = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `${BASE_URL}/reviews/user/me`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    throw error;
  }
};

const reportReview = async (reviewId, reason) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${BASE_URL}/reviews/${reviewId}/report`,
      { reason },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error reporting review:", error);
    throw error;
  }
};

const deleteReviewPermanently = async (reviewId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(
      `${BASE_URL}/reviews/${reviewId}/hard`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error("Error toggling delete review:", error);
    throw error;
  }
};

const getHospitalReviews = async (hospitalId, page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/reviews/hospital/${hospitalId}?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching hospital reviews:", error);
    throw error;
  }
};

export { 
  getHospitals, 
  getHospitalDetail,
  toggleLikeHospitalImage,
  checkImageLikeStatus,
  createReview,
  updateReview,
  getUserReviews,
  reportReview,
  deleteReviewPermanently,
  getHospitalReviews
};
