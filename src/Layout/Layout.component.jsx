import proptypes from "prop-types";
import { Outlet } from "react-router-dom";
import Content from "./Content/Content.component";
import { SnackBar } from "../Common";
import NavBar from "./NavBar/NavBar.container";
import Footer from "./Footer/Footer.component";
import { useEffect } from "react";
import { useAppState, useSessionStorage}   from "../hooks"
import { SESSION_STORAGE } from "../utils/constants";
import ScrollToTop from "./ScrollToTop";

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
      <ScrollToTop />
      <NavBar />
      <Content>
        <Outlet>{children}</Outlet>
      </Content>
      <SnackBar />
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: proptypes.node,
};

export default Layout;
