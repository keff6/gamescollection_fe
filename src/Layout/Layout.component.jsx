import proptypes from 'prop-types';
import { Outlet } from 'react-router-dom'
import Content from './Content/Content.component';
import NavBar from '../Navigation/NavBar/NavBar.component';

const Layout = ({children}) => (
  <>
    <NavBar />
    <Content>
      <Outlet>
        {children}
      </Outlet>
    </Content>
  </>
);

Layout.propTypes = {
  children: proptypes.node,
}

export default Layout;