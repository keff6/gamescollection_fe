import { useNavigate } from 'react-router-dom';
import useAppState from '../../hooks/useAppState';
import { AuthService } from '../../services';
import { OPERATION_OUTCOME } from "../../utils/constants";
import Login from "./Login.component";

const LoginContainer = () => {
  const { openSnackbar, setIsLoading, setAuthUser } = useAppState();
  const navigate = useNavigate();


  const authenticateUser = async (user) => {
    try {
      setIsLoading(true)
      const response = await AuthService.authenticate(user);
      console.warn(response)
      setAuthUser(response?.data)
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