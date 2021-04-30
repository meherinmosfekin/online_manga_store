import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/online-manga-store-92ce3/us-central1/api",
});

export default instance;
