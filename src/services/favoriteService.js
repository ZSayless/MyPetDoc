import axios from "axios";

const getHospitalFavorites = async (userId, page = 1, limit = 10) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/favorites/user/${userId}/hospitals`,
            {
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
        console.error("Error fetching favorites:", error);
        throw error;
    }
};

export { getHospitalFavorites };
