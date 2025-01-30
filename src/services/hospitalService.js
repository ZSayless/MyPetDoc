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

export { 
  getHospitals, 
  getHospitalDetail,
  toggleLikeHospitalImage,
  checkImageLikeStatus 
};
