import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AppState } from "../Config/store/state";

const RequireAuth = () => {
  const { user } = useContext(AppState);
  const location = useLocation();

  return (
    user
      ? <Outlet />
      : <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
}

export default RequireAuth;