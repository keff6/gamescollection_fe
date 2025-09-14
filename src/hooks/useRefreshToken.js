import { useAuthAPI } from './api';
import useAppState from './useAppState';

const useRefreshToken = () => {
  const { setAuthUser, user } = useAppState()
  const authAPI = useAuthAPI()

  const refresh = async () => {
    try {
      const response = await authAPI.refreshToken();
      const userData = user ? user : JSON.parse(sessionStorage.getItem('currentUser'))
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