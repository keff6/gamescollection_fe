import { Container } from "react-bootstrap";
import { Outlet } from 'react-router-dom'
import proptypes from 'prop-types';
import classes from './Dashboard.module.css';

const Dashboard = ({children}) => (
  <Container className={classes.container}>
    <Outlet>
      {children}
    </Outlet>
  </Container>
)

Dashboard.propTypes = {
  children: proptypes.node,
}

export default Dashboard;