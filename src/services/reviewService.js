import axios from "axios";

const getAllReviewsByAuth = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/reviews/user/me`
            , {
                params: {
                    page: page,
                    limit: limit
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching about info:", error);
        throw error;
    }
};

export { getAllReviewsByAuth };
