import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAppState from "../hooks/useAppState";
import { getAuthUser } from "../utils/misc";

const RequireAuth = () => {
  const { user } = useAppState();
  const currentUser = getAuthUser(user)
  const location = useLocation();

  return (
    currentUser
      ? <Outlet />
      : <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
}

export default RequireAuth;