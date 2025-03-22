import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Update if needed

// Get token from localStorage
const getToken = () => localStorage.getItem("token");

// Axios instance with default headers
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to headers dynamically
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

// API methods
export const api = {
  
  login: (data) => axiosInstance.post("/auth/login", data),
  signup: (userData) => axiosInstance.post("/auth/signup", userData),

 
  getAdminDashboard: () => axiosInstance.get("/admin/dashboard"),
  addUser: (data) => axiosInstance.post("/admin/users", data),
  addStore: (data) => axiosInstance.post("/admin/stores", data),
  getUsers: (filters) => axiosInstance.get("/admin/users", { params: filters }),
  getStores: (filters) =>
    axiosInstance.get("/admin/stores", { params: filters }),
  getUserDetails: (id) => axiosInstance.get(`/admin/users/${id}`),

  
  getStoreRatings: () => axiosInstance.get("/store-owner/ratings"),
  getStoreAvgRating: () => axiosInstance.get("/store-owner/average-rating"),


  getUserStores: (filters) =>
    axiosInstance.get("/user/stores", { params: filters }),
  getStoreDetails: (id) => axiosInstance.get(`/user/stores/${id}`),
  submitRating: (data) => axiosInstance.post("/user/ratings", data),
  updatePassword: (data) => axiosInstance.put("/user/update-password", data),
};
