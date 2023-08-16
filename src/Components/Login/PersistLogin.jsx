import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import useRefreshToken from '../../hooks/useRefreshToken';
import useAppState from '../../hooks/useAppState';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { user } = useAppState();

  useEffect(() => {
    let isMounted = true;

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

    !user?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => isMounted = false;
  }, [])

  return (
    <>
      {isLoading ? <Spinner />: <Outlet />}
    </>
  )
}

export default PersistLogin