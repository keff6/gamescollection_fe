import proptypes from "prop-types";
import { Outlet } from "react-router-dom";
import Content from "./Content/Content.component";
import { SnackBar } from "../Common";
import NavBar from "./NavBar/NavBar.container";
import { useEffect } from "react";
import { getAuthUser } from "../utils/misc"
import useAppState  from "../hooks/useAppState"

const Layout = ({ children }) => {
  const { user, setAuthUser, setSelectedBrand, setSelectedConsole } = useAppState();

  useEffect(() => {
    const currentUser = getAuthUser(user);
    const currentBrand = JSON.parse(sessionStorage.getItem("brandData")) || null;
    const currentConsole = JSON.parse(sessionStorage.getItem("consoleData")) || null;
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
