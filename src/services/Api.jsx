import axios from "axios";

const api = axios.create({
  baseURL: "https://canteen-app-backend-nooq.onrender.com/api",
});

export default api;
