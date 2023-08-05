import axiosInstance from "../config/axiosConfig";
import { toast } from "react-toastify";
import { session } from "../utility/Session";

export const AuthenticationAPI = {
  signup: async (userRegistrationDetails) => {
    return axiosInstance
      .post("signup", userRegistrationDetails)
      .then((res) => {
        const data = res.data;
        session.setSessionStorage(data.id, data.username, data.token, JSON.stringify(data.roles));
        return Promise.resolve(res);
      })
      .catch((err) => {
        return Promise.reject(err.response.data.message);
      });
  },
  login: async (userLoginDetails) => {
    return axiosInstance
    .post("login", userLoginDetails)
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
  // changeRole(role) {
  //   sessionStorage.setItem(ROLE_KEY, role);
  // }
};
