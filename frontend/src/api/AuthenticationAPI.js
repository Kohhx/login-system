import axiosInstance from "../config/axiosConfig";
import { toast } from "react-toastify";

 const TOKEN_PREFIX= 'Bearer ';
 const AUTH_USER_KEY = 'authenticatedUser';
 const TOKEN_KEY = 'token';
 const ROLE_KEY = 'roles';
 const AUTH_ID_KEY = 'id';

export const AuthenticationAPI = {
  signup: async (userRegistrationDetails) => {
    return axiosInstance
      .post("signup", userRegistrationDetails)
      .then((res) => {
        const data = res.data;
        let token = TOKEN_PREFIX + data.token;
        setSessionStorage(data.id, data.username, token, JSON.stringify(data.roles));
      })
  },
  login: async (userLoginDetails) => {
    return axiosInstance
    .post("login", userLoginDetails)
    .then((res) => {
      removeSessionStorage();
      const data = res.data;
      let token = TOKEN_PREFIX + data.token;
      setSessionStorage(data.id, data.username, token, JSON.stringify(data.roles));
      return Promise.resolve(res);
    })
    .catch((err) => {
      return Promise.reject(err.response.data.message);
    });
  },
  changeRole(role) {
    sessionStorage.setItem(ROLE_KEY, role);
  }
};

function setSessionStorage(
  id,
  email,
  token,
  role
) {
  sessionStorage.setItem(AUTH_ID_KEY, id);
  sessionStorage.setItem(AUTH_USER_KEY, email);
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(ROLE_KEY, role);
}

function removeSessionStorage() {
  sessionStorage.removeItem(AUTH_ID_KEY);
  sessionStorage.removeItem(AUTH_USER_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(ROLE_KEY);
}
