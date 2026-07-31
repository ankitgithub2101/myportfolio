import axios from "axios";

// this will not let u go back from home page to login page till u logout
export const axiosInstance = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
