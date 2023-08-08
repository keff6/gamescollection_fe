import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import proptypes from "prop-types";
import useAppState from '../../hooks/useAppState';
import classes from './NavBar.module.css';

const NavBar = ({ logOut }) =>{
  const { user } = useAppState();

  const getInitialsCircle = () => (
    <div className={classes.circle}>
      <p className={classes.circleInner}>{
        `${user?.name?.charAt(0).toUpperCase()}${user?.lastName?.charAt(0).toUpperCase()}`
      }</p>
    </div>
  )

  return (
    <Navbar collapseOnSelect expand="lg"  variant="dark" className={`fixed-top ${classes.bgDark}`}>
      <Container>
        <Navbar.Brand as={Link} to="/">Games Collection</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Brands</Nav.Link>
            <NavDropdown title="Admin" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/brands">Brands</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/genres">Genres</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {user ?
                <NavDropdown
                  title={getInitialsCircle()}
                  id="user-logged-dropdown"
                  className={classes.userDropDown}

                >
                  <NavDropdown.Item>
                    <div className={classes.userSigned}>
                      {getInitialsCircle()}
                      <div className={classes.labelContainer}>
                        <span className={classes.signedLabel}>Welcome!</span>
                        <span className={classes.userName}>{`${user?.name} ${user?.lastName}`}</span>
                      </div>
                    </div>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logOut}>Log out</NavDropdown.Item>
                </NavDropdown>
              :
              <Nav.Link as={Link} to="/login">Log In</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

NavBar.propTypes = {
  logOut: proptypes.func,
}

export default NavBar;