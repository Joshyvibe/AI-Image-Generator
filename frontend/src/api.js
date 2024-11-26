import axios from "axios";

// Define the base URL
const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
});


export const generateImage = async (data) => {
    try {
      const response = await api.post("/generate-gradio/", data);
      return response.data;
    } catch (error) {
      console.error("Error generating image:", error);
      throw error.response?.data || "An unknown error occurred";
    }
};



export default api;

