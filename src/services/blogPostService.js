import axios from "axios";

const getBlogPosts = async () => {
  try {
    console.log("API URL:", process.env.REACT_APP_API_URL);
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/blog-posts`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }
};

export { getBlogPosts };
