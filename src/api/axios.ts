import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000", // Replace with your backend server URL
});

export default instance;
