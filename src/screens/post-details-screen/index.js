import { Container, Row, Col } from "react-bootstrap"
import BasicLayout from "../../layouts/basic-layout"

const PostDetailsScreen = () => {
    return (
        <BasicLayout>
            <Container fluid>
                <Row>
                    <Col className="border border-secondary text-center py-4 border-top-0 border-end-0 border-start-0">
                        <h1>Post Title</h1>
                    </Col>
                    <Col md={4} className="border border-secondary border-top-0 border-end-0 border-bottom-0">
                        Sidebar
                    </Col>
                </Row>
            </Container>
        </BasicLayout>
    )
}

export default PostDetailsScreen