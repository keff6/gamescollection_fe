import { useContext } from "react";
import { AppState } from "../../Config/store/state";
import { AuthService } from '../../services';
import { OPERATION_OUTCOME } from "../../utils/constants";
import Login from "./Login.component";

const LoginContainer = () => {
  const { openSnackbar, setIsLoading } = useContext(AppState);



  const authenticateUser = async (user) => {
    try {
      setIsLoading(true)
      const response = await AuthService.authenticate(user);
      // setBrandsList(response.data)
      console.warn(response)
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