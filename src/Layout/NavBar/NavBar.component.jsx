import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Joystick } from "react-bootstrap-icons";
import proptypes from "prop-types";
import { useAppState } from '../../hooks';
import classes from './NavBar.module.css';

const NavBar = ({ logOut }) =>{
  const [isExpanded, setIsExpanded] = useState(false);
  const menuRef = useRef();
  const { user } = useAppState();
  const currentUser = user || null;

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  const getInitialsCircle = () => (
    <div className={classes.circle}>
      <p className={classes.circleInner}>{
        `${currentUser?.name?.charAt(0).toUpperCase() || ''
        }${currentUser?.lastName?.charAt(0).toUpperCase() || ''}`
      }</p>
    </div>
  )

  return (
    <Navbar
      ref={menuRef}
      collapseOnSelect
      expand="lg"
      variant="dark"
      className={`fixed-top ${classes.bgDark}`}
      expanded={isExpanded}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <div className={classes.logoContainer}>
          <Joystick /><span>Games Collection</span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setIsExpanded(isExpanded ? false : true)}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" onClick={() => setIsExpanded(false)}>Home</Nav.Link>
            <Nav.Link as={Link} to="/brands" onClick={() => setIsExpanded(false)}>Brands</Nav.Link>
            <Nav.Link as={Link} to="/export" onClick={() => setIsExpanded(false)}>Export</Nav.Link>
            {currentUser && <NavDropdown title="Admin" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/brands" onClick={() => setIsExpanded(false)}>Brands</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/genres" onClick={() => setIsExpanded(false)}>Genres</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/export" onClick={() => setIsExpanded(false)}>Export</NavDropdown.Item>
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
              <Nav.Link as={Link} to="/login" onClick={() => setIsExpanded(false)}>Log In</Nav.Link>
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