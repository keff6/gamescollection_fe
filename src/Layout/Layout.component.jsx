import proptypes from 'prop-types';
import { Outlet } from 'react-router-dom'
import Content from './Content/Content.component';
import { NavBar, SnackBar } from '../Common';

const Layout = ({children}) => (
  <>
    <NavBar />
    <Content>
      <Outlet>
        {children}
      </Outlet>
    </Content>
    <SnackBar />
  </>
);

Layout.propTypes = {
  children: proptypes.node,
}

export default Layout;