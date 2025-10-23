import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAppState from "../../hooks/useAppState";
import { OPERATION_OUTCOME, API_ROUTES } from "../../utils/constants";
import NavBar from "./NavBar.component";
import useAPI from "../../hooks/useAPI";

const NavBarContainer = () => {
  const navigate = useNavigate()
  const { openSnackbar, setAuthUser } = useAppState()
  const { get, error } = useAPI(false)

  useEffect(() => {
      if(error) {
        openSnackbar({message: error.message, type: OPERATION_OUTCOME.FAILED})
      }
    }, [error, openSnackbar])

  const logOut = async () => {
    await get(API_ROUTES.AUTH.LOGOUT, { withCredentials: true });
    setAuthUser(null);
    navigate('/');
  }

  return (
    <NavBar logOut={logOut}/>
  )
}

export default NavBarContainer