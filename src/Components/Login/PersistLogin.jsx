import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import useRefreshToken from '../../hooks/useRefreshToken';
import useAppState from '../../hooks/useAppState';
import useSessionStorage from "../../hooks/useSessionStorage";
import { SESSION_STORAGE } from "../../utils/constants";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { user } = useAppState();
  const [storedUser] = useSessionStorage(SESSION_STORAGE.USER, null)

  useEffect(() => {
    let isMounted = true;
    const currentUser = user || storedUser;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      }
      catch (err) {
        console.error(err);
      }
      finally {
        isMounted && setIsLoading(false);
      }
    }

    !currentUser?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => isMounted = false;
  }, [])

  return (
    <>
      {isLoading ? <Spinner />: <Outlet />}
    </>
  )
}

export default PersistLogin