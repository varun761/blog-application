import { useContext } from 'react'
import { Container, Navbar, Nav, Image, NavDropdown, Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import AppContext from "../../context/app-context";
import { ThemeContext } from '../../context/theme-context';
import ThemedButton from '../themed-button';
import "./index.scss";

const NavigationBar = () => {
  const appContext = useContext(AppContext)
  const themeContext = useContext(ThemeContext)
  const navigate = useNavigate();
  const logoutUser = () => {
    appContext.setCurrentUser(null)
    // navigate("/login");
  };
  return (
    <Navbar className="navbar-content px-3 py-2" fixed="top" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <Image src="/bloggerlogo.png" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
          </Nav>
          <Nav>
            {!appContext?.user && (<Nav.Link as={Link} to="/login">Login</Nav.Link>)}
            {appContext?.user && (
              <>
                <NavDropdown title="Accounts" id="collasible-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/profile">My Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => logoutUser()}>Logout</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
              </>
            )}
          </Nav>
          <Form>
              <ThemedButton onClick={themeContext.toggleTheme}>Change Theme</ThemedButton>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
