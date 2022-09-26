import { Container, Row, Col, Button, Card } from "react-bootstrap";
import PostInfo from "../../../components/post-info";
import BasicLayout from "../../../layouts/basic-layout";
const SideBarTitle = ({ title }) => {
  return (
    <Row className="mb-4">
      <Col className="border border-secondary py-2">
        <h5 className="mb-0">{title}</h5>
      </Col>
    </Row>
  );
};
const RecentPostsCard = () => {
  return (
    <Row>
      <Card className="mb-3">
        <Card.Body>
          <Row>
            <Col xs={12} md={3}>
              Image
            </Col>
            <Col>
              <h5 className="mb-2">Post Title</h5>
              <p className="mb-2">Post content</p>
              <small>Varun . 6 days ago </small>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Row>
  );
};
const PostDetailsScreen = () => {
  return (
    <BasicLayout>
      <Container fluid>
        <Row>
          <Col className="py-4 px-4">
            <h1 className="mb-4">Post Title</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan egestas nibh ac euismod. Integer condimentum risus quis risus placerat, sed vulputate sapien imperdiet. Maecenas efficitur orci non lacus bibendum consectetur. Proin vehicula fermentum risus eget blandit. Pellentesque lobortis turpis quis sem lobortis, a finibus augue aliquam. Morbi semper non lectus vitae lacinia. Praesent aliquet a quam sit amet vehicula. Aliquam sed dictum erat. Donec scelerisque elit eu magna egestas commodo. Donec nec ipsum faucibus diam commodo maximus. Curabitur sit amet ligula vitae orci pulvinar condimentum vel ut mauris. Sed dapibus nibh ex, nec bibendum purus pretium ut. Etiam et quam dui.

            Aliquam at varius dolor. Fusce ac rutrum metus, eget imperdiet odio. Sed semper id leo non pulvinar. Praesent id felis sed ex auctor ullamcorper ut in erat. Integer in consequat sapien. Suspendisse vehicula erat nec aliquam blandit. Integer laoreet eleifend sapien sit amet efficitur. Mauris efficitur blandit nisi non semper. Mauris nunc purus, finibus in congue in, mattis a ligula. Vestibulum vitae magna accumsan ex sollicitudin vestibulum.</p>
          </Col>
          <Col
            md={4}
            className="border border-secondary border-top-0 border-end-0 border-bottom-0 pt-4"
          >
            <aside className="pb-3 px-3">
              <SideBarTitle title="About Author" />
              <Row className="mb-3">
                <Col>
                  <b>Varun Sharma</b>
                </Col>
              </Row>
              <Row>
                <Col>
                  <PostInfo list={["Posts: 0", "Followers: 0"]} />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <b>About Me</b>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <p className="font-weight-light">Hello loerlsldsda sdadasd sdasdsad dasdasdas dsada</p>
                </Col>
              </Row>
              <SideBarTitle title="Most Recent Posts" />
              <RecentPostsCard />
              <RecentPostsCard />
              <RecentPostsCard />
              <RecentPostsCard />
            </aside>
          </Col>
        </Row>
      </Container>
    </BasicLayout>
  );
};

export default PostDetailsScreen;
