import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import refreshToken from "../utils/refreshToken";
import useAppState from "./useAppState";
import useSessionStorage from "./useSessionStorage";
import { SESSION_STORAGE } from "../utils/constants";

const useAxiosPrivate = () => {
  const { user } = useAppState();
  const [storedUser] = useSessionStorage(SESSION_STORAGE.USER, null);
  const userData = user ? user : storedUser;

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${userData?.accessToken}`;
        }
        return config;
      }, (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refreshToken();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    }
  }, [userData, refreshToken])

  return axiosPrivate;
}

export default useAxiosPrivate;