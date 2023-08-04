import axiosInstance from "../config/axiosConfig";
import { toast } from "react-toastify";

export const UserAPI = {
  getUserInfo: async () => {
    return axiosInstance
      .get("user")
      .then((res) => {
        const data = res.data;
        return data;
      })
  },
  }
