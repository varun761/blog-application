import { Container, Row, Col } from "react-bootstrap"
import NavigationBar from "../../components/navigation-bar"

const HomeScreen = () => {
    return (
        <Container fluid className="navbar-content">
            <Row>
                <Col>
                    <NavigationBar/>
                </Col>
            </Row>
        </Container>
    )
}

export default HomeScreen