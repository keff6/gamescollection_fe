import axios from "./axios";

const authController = {
  authenticate: (user) => {
    return axios.post("/auth",
      user, 
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
  },
  
  refreshToken: () => {
    return axios.get('/refresh', {
      withCredentials: true,
    })
  },

  logOut: () => {
    return axios.get('/logout', {
      withCredentials: true,
    })
  }
}

export default authController