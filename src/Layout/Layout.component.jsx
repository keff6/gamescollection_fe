import proptypes from "prop-types";
import { Outlet } from "react-router-dom";
import Content from "./Content/Content.component";
import { SnackBar } from "../Common";
import NavBar from "./NavBar/NavBar.container";
import { useEffect } from "react";
import useAppState  from "../hooks/useAppState"
import useSessionStorage from "../hooks/useSessionStorage";
import { SESSION_STORAGE } from "../utils/constants";

const Layout = ({ children }) => {
  const { setAuthUser, setSelectedBrand, setSelectedConsole } = useAppState();
  const [storedUser] = useSessionStorage(SESSION_STORAGE.USER, null);
  const [storedBrand] = useSessionStorage(SESSION_STORAGE.BRAND, null);
  const [storedConsole] = useSessionStorage(SESSION_STORAGE.CONSOLE, null);

  useEffect(() => {
    const currentUser = storedUser || null;
    const currentBrand = storedBrand || null;
    const currentConsole = storedConsole || null;
    setAuthUser(currentUser);
    setSelectedBrand(currentBrand);
    setSelectedConsole(currentConsole);
  }, []);

  return (
    <>
      <NavBar />
      <Content>
        <Outlet>{children}</Outlet>
      </Content>
      <SnackBar />
    </>
  );
};

Layout.propTypes = {
  children: proptypes.node,
};

export default Layout;
