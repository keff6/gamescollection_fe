import axios from "./axios";
import { API_ROUTES } from "../utils/constants";

const authController = {
  authenticate: (user) => {
    return axios.post(API_ROUTES.AUTH.LOGIN,
      user, 
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
  },
  
  refreshToken: () => {
    return axios.get(API_ROUTES.AUTH.REFRESH, {
      withCredentials: true,
    })
  },

  logOut: () => {
    return axios.get(API_ROUTES.AUTH.LOGOUT, {
      withCredentials: true,
    })
  }
}

export default authController