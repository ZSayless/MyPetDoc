import axios from "axios";

const getContactInfo = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/contact-info/current`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching contact info:", error);
    throw error;
  }
};

export { getContactInfo };
