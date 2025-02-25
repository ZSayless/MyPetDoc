import axios from "axios";

const getUserInfoByEmail = async (email) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/users/by-email?email=${email}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching user info:", error);
        throw error;
    }
};

export { getUserInfoByEmail };