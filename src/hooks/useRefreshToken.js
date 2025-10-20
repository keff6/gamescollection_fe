import { useAuthAPI } from './api';
import useAppState from './useAppState';
import useSessionStorage from './useSessionStorage';
import { SESSION_STORAGE } from '../utils/constants';

const useRefreshToken = () => {
  const { setAuthUser, user } = useAppState()
  const [storedUser] = useSessionStorage(SESSION_STORAGE.USER, null);
  const authAPI = useAuthAPI()

  const refresh = async () => {
    try {
      const response = await authAPI.refreshToken();
      const userData = user ? user : storedUser;
      setAuthUser({
        ...userData,
        accessToken: response.data.accessToken,
      })
      return response.data.accessToken
    } catch (e) {
      console.log({e})
    }
  }
  return refresh
}

export default useRefreshToken