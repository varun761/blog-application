import { Container, Navbar, Nav, Image } from "react-bootstrap"
import './index.scss'

const NavigationBar = ({
    isAuth
}) => {
  return (
    <Navbar>
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
                <Nav.Link href="/signup">Logout</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavigationBar.defaultProps = {
    isAuth: false
}

export default NavigationBar