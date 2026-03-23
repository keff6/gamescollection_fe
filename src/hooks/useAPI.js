import { useState } from 'react';
import axiosPublicInstance from '../utils/axios';
import useAxiosPrivate from './useAxiosPrivate';
import { useLoading } from '../Config/context/LoadingContext';
import { ERROR_CODES, LONG_LOADING_THRESHOLD } from '../utils/constants';

const useAPI = (isPrivate = false, entityName = 'Record') => {
  const axiosPrivateInstance = useAxiosPrivate()
  const { startLoading, stopLoading } = useLoading();
  const [error, setError] = useState(null)

  const instance = isPrivate ? axiosPrivateInstance : axiosPublicInstance;

  const request = async ({ method, url, data = null, params = null }) => {
    setError(null);
    const timeout = setTimeout(() => startLoading(), LONG_LOADING_THRESHOLD);
    
    try {
      const response = await instance({
        method,
        url,
        ...(data && {data}),
        ...(params && {params}),
      });
      return response.data;
    } catch (err) {
      const errorCode = err?.response?.data || "";
      if(errorCode === ERROR_CODES.DUPLICATED) {
        throw new Error(`${entityName} already exists in database`)
      }
      setError(err)
      throw err;
    } finally {
      clearTimeout(timeout);
      stopLoading();
    }
  };

  return {
    request, // generic request
    get: (url, params) => request({ method: 'GET', url, params }),
    post: (url, data, params) => request({ method: 'POST', url, data, params }),
    put: (url, data) => request({ method: 'PUT', url, data }),
    del: (url) => request({ method: 'DELETE', url }),
    error
  };
};

export default useAPI;