import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Joystick } from "react-bootstrap-icons";
import proptypes from "prop-types";
import useAppState from '../../hooks/useAppState';
import { getAuthUser } from '../../utils/misc'
import classes from './NavBar.module.css';

const NavBar = ({ logOut }) =>{
  const { user } = useAppState();
  const currentUser = getAuthUser(user);

  const getInitialsCircle = () => (
    <div className={classes.circle}>
      <p className={classes.circleInner}>{
        `${currentUser?.name?.charAt(0).toUpperCase() || ''
        }${currentUser?.lastName?.charAt(0).toUpperCase() || ''}`
      }</p>
    </div>
  )

  return (
    <Navbar collapseOnSelect expand="lg"  variant="dark" className={`fixed-top ${classes.bgDark}`}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          
          <div className={classes.logoContainer}>
          <Joystick /><span>Games Collection</span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Brands</Nav.Link>
            <Nav.Link as={Link} to="/stats">Stats</Nav.Link>
            {currentUser && <NavDropdown title="Admin" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/brands">Brands</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/genres">Genres</NavDropdown.Item>
            </NavDropdown>}
          </Nav>
          <div className={`${classes.divider} d-block d-md-none`} />
          <Nav>
            {currentUser ?
                <NavDropdown
                  title={getInitialsCircle()}
                  id="user-logged-dropdown"
                  className={classes.userDropDown}

                >
                  <div className={classes.userSigned}>
                    {getInitialsCircle()}
                    <div className={classes.labelContainer}>
                      <span className={classes.signedLabel}>Welcome!</span>
                      <span className={classes.userName}>{`${currentUser?.name} ${currentUser?.lastName}`}</span>
                    </div>
                  </div>
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