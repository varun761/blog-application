import { useContext } from 'react'
import { Container, Navbar, Nav, Image, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/app-context";
import "./index.scss";

const NavigationBar = ({ isAuth }) => {
  const appContext = useContext(AppContext)
  const navigate = useNavigate();
  const logoutUser = () => {
    appContext.setCurrentUser(null)
    navigate("/login");
  };
  return (
    <Navbar className="navbar-content px-3 py-2" fixed="top" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">
          <Image src="/bloggerlogo.png" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="mx-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Nav>
            {!isAuth && (<Nav.Link href="/login">Login</Nav.Link>)}
            {isAuth && (
              <>
                <NavDropdown title="Accounts" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutUser}>Logout</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavigationBar.defaultProps = {
  isAuth: false,
};

export default NavigationBar;
