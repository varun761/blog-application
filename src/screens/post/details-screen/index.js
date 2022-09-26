import { useEffect } from "react";
import { useMemo, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ContentLoader from "react-content-loader" 
import PostInfo from "../../../components/post-info";
import BasicLayout from "../../../layouts/basic-layout";
import ApiService from "../../../services/api-service";
const SideBarTitle = ({ title }) => {
  return (
    <Row className="mb-4">
      <Col className="border border-secondary py-2">
        <h5 className="mb-0">{title}</h5>
      </Col>
    </Row>
  );
};

const LoadingBlogPosts = () => {
  const [error, setError] = useState(null);
  const [post, setPost] = useState([]);
  const data = useMemo(() => post, [post]);
  const [loading, setLoading] = useState(true);
  const getPostDetails = (id) => {
    setError(null);
    setLoading(true);
    ApiService.getRequest(`/v1/post/${id}`)
      .then((res) => res.data)
      .then((res) => {
        const { post } = res;
        if (post) {
          setPost(post);
        } else {
          setPost(null);
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  return {
    error,
    data,
    loading,
    getPostDetails,
  };
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
  const { data, loading, getPostDetails } = LoadingBlogPosts()
  const params = useParams()
  useEffect(() => {
    const { id } = params
    if (id) {
      getPostDetails(id)
    }
  }, [])
  return (
    <BasicLayout>
      <Container fluid>
          <Row>
            {!loading ? (
              <Col className="py-4 px-4">
                <h1 className="mb-3">{data?.title}</h1>
                <PostInfo list={[data?.author?.name, `Likes: ${data?.likes_count}`]} />
                <div dangerouslySetInnerHTML={{__html: data?.description}}></div>
              </Col>
            ) : (
              <Col className="py-4 px-4">
                <ContentLoader viewBox="0 0 200 110">
                  <rect x="0" y="0" width="100%" height="20" />
                  <rect x="0" y="23" width="100%" height="10" />
                  <rect x="0" y="36" width="100%" height="60" />
                </ContentLoader>
              </Col>
            )}
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
