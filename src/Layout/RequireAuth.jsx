import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAppState from "../hooks/useAppState";

const RequireAuth = () => {
  const { user } = useAppState();
  const location = useLocation();

  return (
    user
      ? <Outlet />
      : <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
}

export default RequireAuth;