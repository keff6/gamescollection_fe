import { useNavigate } from "react-router-dom";
import { useAppState, useAPI, useApiErrorHandler } from "../../hooks";
import { API_ROUTES } from "../../utils/constants";
import NavBar from "./NavBar.component";

const NavBarContainer = () => {
  const navigate = useNavigate()
  const { setAuthUser } = useAppState()
  const { get, error } = useAPI(true)
  useApiErrorHandler(error)

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