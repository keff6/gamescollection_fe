import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Joystick } from "react-bootstrap-icons";
import proptypes from "prop-types";
import { SESSION_STORAGE } from "../../utils/constants";
import { useAppState, useSessionStorage } from '../../hooks';
import classes from './NavBar.module.css';

const NavBar = ({ logOut }) =>{
  const [isExpanded, setIsExpanded] = useState(false);
  const menuRef = useRef();
  const { user } = useAppState();
  const [storedUser] = useSessionStorage(SESSION_STORAGE.USER, null)
  const currentUser = user || storedUser || null;

  useEffect(() => {
    document.addEventListener('scroll', function() {
      const navbar = document.getElementById('main-nav');
      if (window.scrollY > 56) {
        navbar.classList.add('navbar-shadow');
      } else {
        navbar.classList.remove('navbar-shadow');
      }
    });
  }, [])

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
      id="main-nav"
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
            <Nav.Link as={Link} to="/about" onClick={() => setIsExpanded(false)}>About</Nav.Link>
            {currentUser && <NavDropdown title="Admin" id="collasible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/admin/brands" onClick={() => setIsExpanded(false)}>Brands</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin/genres" onClick={() => setIsExpanded(false)}>Genres</NavDropdown.Item>
            </NavDropdown>}
          </Nav>
          <div className={`${classes.divider} d-block d-md-none`} />
          <Nav>
            {currentUser ?
                <>
                  <div className="d-none d-lg-block">
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
                  </div>
                  <div className="d-lg-none">
                    <div className={classes.userSignedMobile}>
                      {getInitialsCircle()}
                      <div className={classes.labelContainer}>
                        <span className={classes.signedLabel}>Welcome!</span>
                        <span className={classes.userName}>{`${currentUser?.name} ${currentUser?.lastName}`}</span>
                      </div>
                      <hr />
                      <NavDropdown.Item onClick={logOut}>Log out</NavDropdown.Item>
                    </div>
                    
                  </div>
                </>
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