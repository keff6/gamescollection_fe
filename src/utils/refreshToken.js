import axios from "./axios";
import { API_ROUTES } from "./constants";

const refreshToken = async () => {
  try {
    const response = await axios.get(API_ROUTES.AUTH.REFRESH, {
      withCredentials: true,
    });
    return response.data.accessToken
  } catch (e) {
    console.log({e})
  }
}

export default refreshToken