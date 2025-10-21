import { useNavigate } from "react-router-dom";
import authController from "../../api/authController";
import useAppState from "../../hooks/useAppState";
import { OPERATION_OUTCOME } from "../../utils/constants";
import NavBar from "./NavBar.component";

const NavBarContainer = () => {
  const navigate = useNavigate()
  const { setIsLoading, openSnackbar, setAuthUser } = useAppState()

  const logOut = async () => {
    try {
      setIsLoading(true);
      await authController.logOut();
      setAuthUser(null);
      navigate('/')
    }
    catch(e){
      console.log(e)
      openSnackbar({message: e.message, type: OPERATION_OUTCOME.FAILED})
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <NavBar logOut={logOut}/>
  )
}

export default NavBarContainer