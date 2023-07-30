import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import classes from './NavBar.module.css';

function NavBar() {
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;