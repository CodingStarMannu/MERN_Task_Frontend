import axios from "axios";

const API_BASE_URL = "http://localhost:9000/api";

axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

// API functions
export const createAccount = async (data) => {
  return axios.post(`${API_BASE_URL}/user/createAccount`, data);
};

export const login = async (data) => {
  return axios.post(`${API_BASE_URL}/user/login`, data);
};

export const uploadProfilePicture = async (formData) => {
  return axios.patch(`${API_BASE_URL}/user/uploadProfilePicture`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const addBio = async (data) => {
  return axios.patch(`${API_BASE_URL}/user/addBio`, data);
};

export const uploadVideo = async (formData) => {
  return axios.post(`${API_BASE_URL}/user/upload-video`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getUserInfo = async () => {
  return axios.get(`${API_BASE_URL}/user/getUserInfo`,{
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });
};

export const getProfilePic = async () => {
  return axios.get(`${API_BASE_URL}/user/getProfilePic`,{
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });
};

export const getBio = async () => {
  return axios.get(`${API_BASE_URL}/user/getBio`);
};

export const getAllUsersWithContent = async () => {
  return axios.get(`${API_BASE_URL}/user/getAllUsersWithContent`);
};
