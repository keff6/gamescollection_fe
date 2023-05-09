// import * as React from 'react';
import proptypes from 'prop-types';
import { Outlet } from 'react-router-dom'
import Content from '../Content/Content.component';
import NavBar from '../../Navigation/NavBar/NavBar.component';

const Layout = ({children}) => (
  <div>
    <NavBar />
    <Outlet>
      <Content>
        {children}
      </Content>
    </Outlet> 
  </div>
);

Layout.propTypes = {
  children: proptypes.node,
}

export default Layout;