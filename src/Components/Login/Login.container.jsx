import { useNavigate } from 'react-router-dom';
import useAppState from '../../hooks/useAppState';
import { useAuthAPI } from '../../hooks/api';
import { OPERATION_OUTCOME } from "../../utils/constants";
import Login from "./Login.component";

const LoginContainer = () => {
  const { openSnackbar, setIsLoading, setAuthUser } = useAppState();
  const navigate = useNavigate();
  const authAPI = useAuthAPI();

  const authenticateUser = async (user) => {
    try {
      setIsLoading(true)
      const response = await authAPI.authenticate(user);
      
      if(response?.data) {
        const { accessToken, ...currentUser } = response.data;
        setAuthUser({ ...currentUser, accessToken})
        sessionStorage.setItem('currentUser', JSON.stringify({...currentUser, accessToken}))
      }
      
      navigate('/')
    }
    catch(e){
      console.log(e)
      const responseMessage = e.response.data;
      openSnackbar({message: responseMessage || e.message, type: OPERATION_OUTCOME.FAILED})
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <Login authenticateUser={authenticateUser} />
  )
}

export default LoginContainer