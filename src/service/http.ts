import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-Encoding": "application/json",
  },
});

export default {
  get: axiosInstance.get,
  put: axiosInstance.put,
  post: axiosInstance.post,
  patch: axiosInstance.patch,
  delete: axiosInstance.delete,
};
