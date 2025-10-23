import useAppState from './useAppState';
import useSessionStorage from './useSessionStorage';
import { SESSION_STORAGE, API_ROUTES } from '../utils/constants';
import useAPI from './useAPI';

const useRefreshToken = () => {
  const { setAuthUser, user } = useAppState()
  const [storedUser] = useSessionStorage(SESSION_STORAGE.USER, null);
  const { get } = useAPI(true);

  const refresh = async () => {
    try {
      const response = await get(API_ROUTES.AUTH.REFRESH, { withCredentials: true });
      const userData = user ? user : storedUser;
      setAuthUser({
        ...userData,
        accessToken: response.accessToken,
      })
      return response.accessToken
    } catch (e) {
      console.log({e})
    }
  }
  return refresh
}

export default useRefreshToken