import axios from "../../utils/axios";

const useAuthAPI = () => {
  const authenticate = user => {
    return axios.post("/auth",
      user, 
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
  };
  
  const refreshToken = () => {
    return axios.get('/refresh', {
      withCredentials: true,
    })
  }

  const logOut = () => {
    return axios.get('/logout', {
      withCredentials: true,
    })
  }

  return {
    authenticate,
    refreshToken,
    logOut,
  }
}

export default useAuthAPI