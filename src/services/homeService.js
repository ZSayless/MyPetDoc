import axios from "axios";

const getActiveBanners = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/banners/active`
    );
    console.log(process.env.REACT_APP_API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { getActiveBanners };
