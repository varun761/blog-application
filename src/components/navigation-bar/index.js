import { Container, Navbar, Nav, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const NavigationBar = ({ isAuth }) => {
  const navigate = useNavigate();
  const logoutUser = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <Navbar className="navbar-content">
      <Container fluid>
        <Navbar.Brand href="#home">
          <Image src="/bloggerlogo.png" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="mainNav" />
        <Navbar.Collapse id="mainNav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#pricing">Categories</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <Nav.Link href="#pricing">Contact Us</Nav.Link>
          </Nav>
          <Nav>
            {!isAuth ? (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Signup</Nav.Link>
              </>
            ) : (
              <Nav.Link href="javascript:void(0)" onClick={logoutUser}>
                Logout
              </Nav.Link>
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
