import axios from "axios";

const getAllReviews = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/reviews`
            , {
                params: {
                    page: page,
                    limit: limit
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching about info:", error);
        throw error;
    }
};

export { getAllReviews };
