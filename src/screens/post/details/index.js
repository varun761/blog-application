import { useEffect } from "react";
import { useMemo, useState } from "react";
import { Container, Row, Col, Nav, Form, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import PostInfo from "../../../components/post-info";
import BasicLayout from "../../../layouts/basic-layout";
import ApiService from "../../../services/api-service";
import commonUtil from "../../../utilities/common-util";
import "./index.scss";
const SideBarTitle = ({ title }) => {
  return (
    <Row className="mb-4">
      <Col>
        <div className="border border-secondary border-top-0 border-start-0 border-end-0 py-2">
          <h5 className="mb-0">{title}</h5>
        </div>
      </Col>
    </Row>
  );
};

const LoadingBlogPosts = () => {
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);
  const data = useMemo(() => post, [post]);
  const [recentPosts, setRecentPosts] = useState([]);
  const recent_posts_data = useMemo(() => recentPosts, [recentPosts]);
  const [loading, setLoading] = useState(true);
  const getPostDetails = (id) => {
    setError(null);
    setLoading(true);
    ApiService.getRequest(`/v1/post/single/${id}`)
      .then((res) => res.data)
      .then((res) => {
        const { post, recent_posts } = res;
        if (post) {
          setPost(post);
        } else {
          setPost(null);
        }
        if (recent_posts) {
          setRecentPosts(recent_posts);
        } else {
          setRecentPosts([]);
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
    recent_posts_data,
    loading,
    getPostDetails,
  };
};

const RecentPostsCard = ({ _id, title, author, createdDate }) => {
  const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  return (
    <Row key={`_recent_posts_${_id}`} className="mb-3">
      <Col>
        <div className="border border-secondary rounded d-block recent-posts-section">
          <Row>
            <Col xs={8} md={9} className="pt-3 d-flex justify-content-center flex-column">
              <Nav.Link as={Link} to={`/post/${_id}`}><h5 className="mb-2 px-2 post-title fw-semibold">{title}</h5></Nav.Link>
              <div className="px-2 post-information"><PostInfo list={[author, commonUtil.dateDifference(createdDate)]}/></div>
            </Col>
            <Col xs={4} md={3} className="border border-secondary border-end-0 border-top-0 border-bottom-0" style={{paddingLeft: 0}}>
              <div className="d-flex align-items-center justify-content-center rounded-right w-100 h-100 fw-bolder text-light" style={{ backgroundColor: getRandomColor()}}>{title.slice(0, 2).toUpperCase()}</div>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
  );
};
const PostDetailsScreen = () => {
  const { data, loading, getPostDetails, recent_posts_data } =
    LoadingBlogPosts();
  const params = useParams();
  const { id } = params;
  const textCenterClass = "text-center"
  useEffect(() => {
    if (id) {
      getPostDetails(id);
    }
  }, [id]);
  return (
    <BasicLayout>
      <Container fluid>
        <Row className="post-details">
          {!loading && data ? (
            <Col xs={12} md={9} className="py-4 px-4">
              <Row className={textCenterClass}>
                <Col>
                  <h1 className="mb-3 post-title">{data?.title}</h1>
                </Col>
              </Row>
              <Row>
                <Col className="text-center my-3">
                  Likes: {data?.likes_count}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <div
                    dangerouslySetInnerHTML={{ __html: data?.description }}
                  ></div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h5 className="mb-0">Comments</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form>
                    <Form.Group className="mt-3">
                      <Form.Control as="textarea" row={3} />
                    </Form.Group>
                    <Form.Group className="mt-3">
                      <Button>Submit</Button>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Col>
          ) : (
            <Col className="py-4 px-4">Loading....</Col>
          )}
          <Col
            md={3}
            className="details-sidebar pt-4"
          >
            <aside className="pb-3 px-3">
              <SideBarTitle title="About Author" />
              <Row className="mb-3">
                <Col>
                  {data && data?.author?.name && <b>{data?.author?.name}</b>}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <PostInfo
                    list={[
                      `Likes: ${data && data?.likes_count}`,
                      `Followers: ${data && data?.likes_count}`,
                    ]}
                  />
                </Col>
              </Row>
              {data?.author?.about_me && (
                <>
                  <Row className="mb-3">
                    <Col>
                      <b>About Me</b>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <p className="font-weight-light">
                        {data?.author?.about_me}
                      </p>
                    </Col>
                  </Row>
                </>
              )}
              <SideBarTitle title="Most Recent Posts" />
              {recent_posts_data && recent_posts_data.length > 0 ? (
                recent_posts_data.map((el, ind) => (
                  <RecentPostsCard
                    _id={el._id}
                    title={el.title}
                    author={el.author.name}
                    createdDate={el.created_at}
                  />
                ))
              ) : (
                <p>No Recent Posts</p>
              )}
            </aside>
          </Col>
        </Row>
      </Container>
    </BasicLayout>
  );
};

export default PostDetailsScreen;
