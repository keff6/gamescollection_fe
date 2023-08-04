import axios from "../utils/axios";

const authenticate = user => {
  console.log({user})
  return axios.post("/auth",  user);
};

const AuthService = {
  authenticate,
};

export default AuthService;