import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppState, useSessionStorage } from "../hooks";
import { SESSION_STORAGE } from "../utils/constants";

const RequireAuth = () => {
  const { user } = useAppState();
  const [storedUser] = useSessionStorage(SESSION_STORAGE.USER, null);
  const currentUser = user || storedUser || null;
  const location = useLocation();

  return (
    currentUser
      ? <Outlet />
      : <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
}

export default RequireAuth;