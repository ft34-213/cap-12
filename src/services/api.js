import axios from "axios";

const BASE_URL = "https://dummyjson.com"; // API for blogs
const CONTACT_API = "https://jsonplaceholder.typicode.com/posts"; // Mock API for form submission

// Fetch blog posts
export const fetchBlogs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`);
    return response.data.posts; // Extract blog posts
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};

// Submit Contact Us form data (mock API)
export const submitContactForm = async (formData) => {
  try {
    const response = await axios.post(CONTACT_API, formData);
    return response.data;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
};
