import { Container, Row, Col, Button } from "react-bootstrap";
import BasicLayout from "../../layouts/basic-layout";
const RecentPostsCard = () => {
  return (
    <Row className="mb-3">
      <Col xs={12} md={3}>
        Image
      </Col>
      <Col>
        <h5 className="mb-2">Post Title</h5>
        <p className="mb-2">Post content</p>
        <small>Varun . 6 days ago </small>
      </Col>
    </Row>
  );
};
const PostDetailsScreen = () => {
  return (
    <BasicLayout>
      <Container fluid>
        <Row>
          <Col className="py-4 px-4">
            <h1>Post Title</h1>
          </Col>
          <Col
            md={4}
            className="border border-secondary border-top-0 border-end-0 border-bottom-0 pt-4 pb-3"
          >
            <Row className="mb-3">
              <h5>Most Recent Posts</h5>
            </Row>
            <RecentPostsCard />
            <RecentPostsCard />
            <RecentPostsCard />
            <RecentPostsCard />
          </Col>
        </Row>
      </Container>
    </BasicLayout>
  );
};

export default PostDetailsScreen;
