import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAppState from '../../hooks/useAppState';
import { OPERATION_OUTCOME, API_ROUTES } from "../../utils/constants";
import Login from "./Login.component";
import useAPI from '../../hooks/useAPI';

const LoginContainer = () => {
  const { openSnackbar, setAuthUser } = useAppState();
  const { post, error } = useAPI(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(error) {
      const responseMessage = error?.response?.data || "Something went wrong!";
      openSnackbar({message: responseMessage || error.message, type: OPERATION_OUTCOME.FAILED})
    }
  }, [error, openSnackbar])

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