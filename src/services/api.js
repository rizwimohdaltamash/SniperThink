import axios from "axios";

// Create an Axios instance with base URL for the backend API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Upload Error:", error);
    throw error;
  }
};

export const getJobs = async (status = "all", page = 1) => {
  try {
    const response = await api.get(`/jobs?status=${status}&page=${page}`);
    return response.data;
  } catch (error) {
    console.error("API Get Jobs Error:", error);
    throw error;
  }
};

export const getJobStatus = async (jobId) => {
  try {
    const response = await api.get(`/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    console.error("API Get Job Status Error:", error);
    throw error;
  }
};

export const submitInterest = async (name, email, selectedStep) => {
  try {
    const response = await api.post(`/interest`, { name, email, selectedStep });
    return response.data;
  } catch (error) {
    console.error("API Submit Interest Error:", error);
    throw error;
  }
};

export default api;
