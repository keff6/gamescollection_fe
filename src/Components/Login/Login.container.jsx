import { useNavigate } from 'react-router-dom';
import { useAppState, useAPI, useApiErrorHandler } from '../../hooks';
import { API_ROUTES } from "../../utils/constants";
import Login from "./Login.component";

const LoginContainer = () => {
  const { setAuthUser } = useAppState();
  const { post, error } = useAPI(true);
  useApiErrorHandler(error);
  const navigate = useNavigate();

  const authenticateUser = async (user) => {
    const response = await post(
      API_ROUTES.AUTH.LOGIN,
      user, 
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
      
    if(response) {
      const { accessToken, ...currentUser } = response;
      setAuthUser({ ...currentUser, accessToken})
    }
      
    navigate('/')
  }

  return (
    <Login authenticateUser={authenticateUser} />
  )
}

export default LoginContainer