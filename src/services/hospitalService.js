import axios from "axios";

const getHospitals = async () => {
  console.log("Node ENV:", process.env.NODE_ENV);
  console.log("API URL:", process.env.REACT_APP_API_URL);
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/hospitals`
  );
  return response.data;
};

const getHospitalDetail = async (slug) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/hospitals/by-slug/${slug}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching hospital:", error);
    throw error;
  }
};

export { getHospitals, getHospitalDetail };
