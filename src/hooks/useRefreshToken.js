import { useAuthAPI } from './api';
import useAppState from './useAppState';

const useRefreshToken = () => {
  const { setAuthUser, user } = useAppState()
  const authAPI = useAuthAPI()

  const refresh = async () => {
    const response = await authAPI.refreshToken();
    const userData = user ? user : JSON.parse(sessionStorage.getItem('currentUser'))
    setAuthUser({
      ...userData,
      accessToken: response.data.accessToken,
    })
    return response.data.accessToken
  }
  return refresh
}

export default useRefreshToken