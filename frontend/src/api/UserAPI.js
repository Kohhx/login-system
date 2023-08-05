import axiosInstance from "../config/axiosConfig";
import { toast } from "react-toastify";
import { session } from "../utility/Session";

export const UserAPI = {
  getUserInfo: async () => {
    return axiosInstance
      .get("user")
      .then((res) => {
        const data = res.data;
        return data;
      })
  },
  updateUserInfo: async (userUpdateDetails) => {
    return axiosInstance
      .put(`users/${userUpdateDetails.id}`, userUpdateDetails)
      .then((res) => {
        session.removeSessionStorage();
        const data = res.data;
        session.setSessionStorage(data.id, data.username, data.token, JSON.stringify(data.roles));
        return Promise.resolve(res);
      })
      .catch((err) => {
        return Promise.reject(err.response.data.message);
      });
  },
  getAllUsers: async () => {
    return axiosInstance
      .get(`users`)
      .then((res) => {
        const data = res.data;
        return Promise.resolve(data);
      })
      .catch((err) => {
        return Promise.reject(err.response.data.message);
      });
  },
  deleteUser: async (userId) => {
    return axiosInstance
    .delete(`users/${userId}`)
      .then((res) => {
        const data = res.data;
        return Promise.resolve(data);
      }
      ).catch((err) => {
        return Promise.reject(err.response.data.message);
      });
  },
  updateUserInfoAndRole: async (userUpdateDetails) => {
    return axiosInstance
      .put(`users/${userUpdateDetails.id}/update`, userUpdateDetails)
      .then((res) => {
        const data = res.data;
        return Promise.resolve(data);
      })
      .catch((err) => {
        return Promise.reject(err.response.data.message);
      });
  },

}
