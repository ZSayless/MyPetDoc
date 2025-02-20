import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export const faqService = {
    getFaqs: async () => {
        const response = await axios.get(`${BASE_URL}/faqs`);
        return response.data;
    }
}

export default faqService;