import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "https://myportfolio-2e8d.onrender.com",
});

export default api;
