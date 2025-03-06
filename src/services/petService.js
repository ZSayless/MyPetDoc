import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export const petService = {
  createPet: async (petData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/users/pets`,
        petData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deletePet: async (petId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${BASE_URL}/users/pets/${petId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
}; 