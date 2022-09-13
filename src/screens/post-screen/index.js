import { useState, useMemo, useEffect, useContext } from "react";
import {
  Row,
  Col,
  Table,
  Button,
  Spinner,
  Form,
  FormCheck,
} from "react-bootstrap";
import moment from "moment";
import ErrorMessage from "../../components/error-message";
import DashboardLayout from "../../layouts/dashboard-layout";
import ApiService from "../../services/api-service";
import "./index.scss";
import AppContext from "../../context/app-context";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../../components/custom-pagination";

const LoadingIndividualBlogPosts = () => {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [apiData, setApiData] = useState([]);
  const data = useMemo(() => apiData, [apiData]);
  const [loading, setLoading] = useState(true);
  const refreshToken = (refresh_token) => {
    return ApiService.postRequest("v1/auth/refresh-token", null, {
      Authorization: `Bearer ${refresh_token}`,
    })
      .then((res) => res.data)
      .catch((e) => {
        console.log(e.message);
        return null;
      });
  };
  const handleRefreshToken = async (refreshTokenValue, cb) => {
    try {
      const refreshTokenResponse = await refreshToken(refreshTokenValue);
      const { token } = refreshTokenResponse ? refreshTokenResponse : {};
      if (token) {
        localStorage.setItem("user", JSON.stringify(refreshTokenResponse));
        cb();
      } else {
        appContext.setCurrentUser(null);
        navigate("/login");
      }
    } catch (e) {
      setError(e.message);
    }
  };
  const handleChangeVisibility = (postId, visibility, skip, limit) => {
    setError(null);
    setLoading(true);
    const userInfo = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    const headersInfo = userInfo
      ? {
          Authorization: `Bearer ${userInfo?.token}`,
        }
      : null;
    ApiService.postRequest(
      "v1/post/update-visibility",
      {
        postId,
        visibility
      },
      headersInfo
    )
      .then(() => {
        getAllPosts(skip, limit);
      })
      .catch(async (err) => {
        const errMessage = err?.response?.data?.message
          ? err.response.data.message
          : err.message;
        if (errMessage === "jwt expired") {
          handleRefreshToken(
            userInfo?.refreshToken,
            () => handleChangeVisibility(postId, visibility, skip, limit)
          );
        } else {
          setError(errMessage);
        }
      })
      .finally(() => setLoading(false));
  };
  const getAllPosts = (skip, limit) => {
    setError(null);
    setLoading(true);
    const userInfo = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    const headersInfo = userInfo
      ? {
          Authorization: `Bearer ${userInfo?.token}`,
        }
      : null;
    ApiService.getRequest(
      `v1/post/by-author/?skip=${skip}&limit=${limit}`,
      headersInfo
    )
      .then((res) => res.data)
      .then((res) => {
        setApiData(res);
      })
      .catch(async (err) => {
        const errMessage = err?.response?.data?.message
          ? err.response.data.message
          : err.message;
        if (errMessage === "jwt expired") {
          handleRefreshToken(userInfo?.refreshToken, () => getAllPosts(skip, limit));
        } else {
          setError(errMessage);
        }
      })
      .finally(() => setLoading(false));
  };

  return {
    error,
    data,
    loading,
    getAllPosts,
    handleChangeVisibility,
  };
};

const PostScreen = () => {
  const { error, data, loading, getAllPosts, handleChangeVisibility } =
    LoadingIndividualBlogPosts();
  const [allChecked, setAllChecked] = useState(false);
  const [allSelectedId, setAllSelectedId] = useState([]);
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1)
  const [itemPerPage, setItemsPerPage] = useState(10);
  useEffect(() => {
    getAllPosts(skip, itemPerPage);
  }, []);
  useEffect(() => {
    if (!loading) {
      setAllChecked(false);
      setAllSelectedId([]);
    }
  }, [loading]);
  useEffect(() => {
    if (
      data?.posts?.length > 0 &&
      allSelectedId.length === data?.posts?.length
    ) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [allSelectedId, data]);
  const handleSingleRowSelect = (event, id) => {
    if (event.target.checked) {
      setAllSelectedId([...allSelectedId, id]);
    } else {
      setAllSelectedId([...allSelectedId].filter((el) => el !== id));
    }
  };
  const handleAllChecked = (event) => {
    if (event.target.checked) {
      setAllSelectedId(data?.posts?.map((el) => el._id));
    } else {
      setAllSelectedId([]);
    }
  };
  const changeVisibilityHandler = (visibility) => {
    handleChangeVisibility(allSelectedId, visibility, 0, itemPerPage);
  };
  const handleBlogPagination = (value) => {
    const skipValue = (value > 0 ? ((value - 1) * itemPerPage) : 0)
    getAllPosts(skipValue, itemPerPage)
    setCurrentPage(value)
  }
  return (
    <DashboardLayout>
      <div className="blog-post">
        <Row className="mb-3">
          <Col>
            <h3>Posts</h3>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Button variant="primary">Create New</Button>
          </Col>
          {allSelectedId.length > 0 && (
            <Col className="text-end">
              <Button variant="warning" className="mx-3" onClick={() => changeVisibilityHandler('public')}>
                Mark As Public
              </Button>
              <Button variant="warning" onClick={() => changeVisibilityHandler('private')}>
                Mark As Private
              </Button>
            </Col>
          )}
        </Row>
        {error && (
          <Row>
            <Col>
              <ErrorMessage text={error} />
            </Col>
          </Row>
        )}
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>
                    <Form.Check
                      type="checkbox"
                      onChange={handleAllChecked}
                      checked={allChecked || false}
                    />
                  </th>
                  <th>#</th>
                  <th>Title</th>
                  <th>Visibility</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="6" className="text-center">
                      <Spinner animation="border" variant="primary" />
                    </td>
                  </tr>
                )}
                {!loading && data?.posts?.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No posts
                    </td>
                  </tr>
                )}
                {!loading &&
                  data?.posts?.length > 0 &&
                  data?.posts?.map((el, elIndex) => (
                    <tr key={el._id}>
                      <td>
                        <Form.Check
                          type="checkbox"
                          checked={
                            (allSelectedId &&
                              allSelectedId.indexOf(el._id) > -1) ||
                            false
                          }
                          onChange={(e) => handleSingleRowSelect(e, el._id)}
                        />
                      </td>
                      <td>{elIndex + 1}</td>
                      <td>{el.title}</td>
                      <td>
                        {el.visibility
                          ? el.visibility.charAt(0).toUpperCase() +
                            el.visibility.slice(1)
                          : "Private"}
                      </td>
                      <td>
                        {moment(el.created_at).format("DD-MM-YYYY hh:mm:ss")}
                      </td>
                      <td>
                        <Button variant="link">View</Button>
                        <Button variant="link">Edit</Button>
                        <Button variant="link">Delete</Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
          {!loading && data?.total && data.total > 0 && (
            <Row>
              <Col>
                <CustomPagination activePage={currentPage} total={data.total} itemPerPage={itemPerPage} onPageClick={handleBlogPagination}/>
              </Col>
            </Row>
          )}
        </Row>
      </div>
    </DashboardLayout>
  );
};

export default PostScreen;
