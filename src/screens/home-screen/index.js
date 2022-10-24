import { useState, useEffect, useCallback } from "react";
import {
  Row,
  Col,
  Spinner,
  Container,
  Card,
  Image,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import NoImagePost from "../../assets/images/post_sample.jpg";
import Common from "../../utilities/common-util";
import BasicLayout from "../../layouts/basic-layout";
import ApiHook from "../../hooks/api-hook";
import "./index.scss";
import PostInfo from "../../components/post-info";

const HomeScreen = () => {
  const { error, data, loading, sendRequest } = ApiHook("/v1/post/", "GET");
  const [skip, setSkip] = useState(0);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [itemPerPage, setItemsPerPage] = useState(10);

  const loadMoreCallback = useCallback(() => {
    console.log('---skip----- :', skip)
    console.log('---itemPerPage----- :', itemPerPage)
    sendRequest({
      skip,
      itemPerPage,
    });
  }, [skip, itemPerPage, sendRequest]);

  useEffect(() => {
    setPosts([]);
    sendRequest({
      skip,
      itemPerPage,
    });
  }, []);

  useEffect(() => {
    if (
      data &&
      Object.keys(data).length > 0 &&
      Object.keys(data).indexOf("posts") > -1
    ) {
      setPosts([...posts, ...data.posts]);
      setPaginationLoading(false);
    }
    return () => true;
  }, [data]);

  const loadMoreData = () => {
    setPaginationLoading(true);
    const skipValue = skip + itemPerPage
    console.log('skipValue ::: ', skipValue)
    setSkip(skipValue);
    setTimeout(() => {
      loadMoreCallback();
    }, 1000)
  };

  return (
    <BasicLayout>
      <Container fluid>
        {loading && (
          <Row className="my-5">
            <Col className="text-center">
              <Spinner animation="border" variant="primary" />
            </Col>
          </Row>
        )}
        {!loading && posts.length === 0 && (
          <Row className="my-5">
            <Col className="text-center">
              <p className="mb-0">No More Posts</p>
            </Col>
          </Row>
        )}
        {!loading && posts.length > 0 && (
          <Row className="mt-5">
            {posts.map((el) => {
              let postedTime = Common.dateDifference(el.created_at);
              return (
                <Col key={`post_${el._id}`} sm={3} className="blog-card">
                  <Card>
                    <Card.Body className="px-0 py-0">
                      <Col xs={12}>
                        <Image src={NoImagePost} fluid />
                      </Col>
                      <Card.Title className="my-3 px-3">
                        <Link to={`/post/${el._id}`}>{el.title}</Link>
                      </Card.Title>
                      <Card.Text className="post-description mb-3 px-3">
                        {el?.description?.replace(/(<([^>]+)>)/gi, "")}
                      </Card.Text>
                      <Col xs={12} className="px-3">
                        <PostInfo
                          list={[
                            el?.author?.name,
                            postedTime,
                            `Likes: ${el?.likes_count}`,
                          ]}
                        />
                      </Col>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
        {!loading && !error && (
          <Row className="text-center">
            <Col>
              <Button onClick={loadMoreData} disabled={paginationLoading}>
                Load More
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    </BasicLayout>
  );
};

export default HomeScreen;
