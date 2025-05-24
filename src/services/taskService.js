// services/taskService.js
import axios from "axios";

const API = "http://localhost:3002/api/v1";
const getToken = () => localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
};

export const createTask = async (formData) => {
  const res = await axios.post(`${API}/tasks`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "multipart/form-data"
    }
  });
  return res.data;
};

export const getTasks = async () => {
  const res = await axios.get(`${API}/tasks`, config);
  return res.data;
};
