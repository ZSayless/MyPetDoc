import axios from "axios";

const getAboutInfo = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/about-us/current`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching about info:", error);
    throw error;
  }
};

export { getAboutInfo };
