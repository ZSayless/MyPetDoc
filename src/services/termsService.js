import axios from "axios";

const getCurrentTerms = async () => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/terms/current`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching about info:", error);
        throw error;
    }
};

export { getCurrentTerms };
