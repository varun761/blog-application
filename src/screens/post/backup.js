const PostScreen = () => {
  console.log('--i am rendering---')
  const navigate = useNavigate();
  const { error, data, loading, sendRequest } = AuthorizedApiHook()
  // const { error, data, loading, getAllPosts, handleChangeVisibility } =
  //  LoadingIndividualBlogPosts(navigate);
  const [allChecked, setAllChecked] = useState(false);
  const [allSelectedId, setAllSelectedId] = useState([]);
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1)
  const [itemPerPageInner, setItemsPerPage] = useState(10);
  const [testingAffect, setTestingAffect] = useState(0);
  useEffect(() => {
    setCurrentPage(1)
    sendRequest('/v1/post/by-author/', 'GET', null, {
      skip,
      itemPerPage: itemPerPageInner
    });
  }, []);
  useEffect(() => {
    console.log('--triggereded--- :', itemPerPageInner)
    // setCurrentPage(1)
    // sendRequest('/v1/post/by-author/', 'GET', null, {
    //   skip: 0,
    //   itemPerPage: itemPerPageInner
    // });
  }, [testingAffect])
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
  const handleChangeVisibility = (allSelectedId, visibility, skip, itemPage)  => {
    console.log('dam')
  }
  const changeVisibilityHandler = (visibility) => {
    // handleChangeVisibility(allSelectedId, visibility, skip, itemPerPageInner);
  };
  const handleBlogPagination = (value) => {
    console.log('handleBlogPagination triggered')
    const skipValue = (value > 0 ? ((value - 1) * itemPerPageInner) : 0)
    setSkip(skipValue)
    sendRequest('/v1/post/by-author/', 'GET', null, {
      skip: skipValue,
      itemPerPage: itemPerPageInner
    });
    setCurrentPage(value)
  }
  const handleCreatePost = () => {
    navigate('/posts/create')
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
            <Button variant="primary" onClick={() => handleCreatePost()} disabled={loading}>Create New</Button>
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
            <Table striped bordered>
              <thead>
                <tr>
                  <th>
                    <Form.Check
                      type="checkbox"
                      onChange={handleAllChecked}
                      disabled={!loading && (!data?.posts || data?.posts?.length === 0)}
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
                {!loading && (!data?.posts || data?.posts?.length === 0) && (
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
                      <td>1</td>
                      {/* <td>{(currentPage > 1 ?
                        elIndex * (currentPage - 1) + itemPerPageInner
                        : elIndex) + 1}</td> */}
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
                        <Nav.Link target="_blank" href={`/post/${el._id}`} style={{ display: 'inline-block', marginRight: '10px'}}>View</Nav.Link>
                        <Button variant="link" onClick={() => navigate(`/posts/edit/${el._id}`)}>Edit</Button>
                        <Button variant="link">Delete</Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
            <Row>
              {!loading && data?.total ? (
                <Col>
                  {/* <p>{currentPage * itemPerPageInner < data?.total ? (currentPage * itemPerPageInner) : data?.total} - {data?.total} records</p> */}
                </Col>
              ): (
                <Col>
                  <p>0 - 0 records</p>
                </Col>
              )}
              <Col xs={6} md={4}>
                <Row>
                  <Col xs={12} md={8} className="text-end"><label>Items per page :</label></Col>
                  <Col className="text-end">
                    <select onChange={({target}) => {
                      // console.log('changed')
                      // setItemsPerPage(parseInt(target.value))
                    }}>
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                      <option value="150">150</option>
                      <option value="200">200</option>
                    </select>
                  </Col>
                </Row>
              </Col>
            </Row>
          {!loading && data?.total && data.total > 0 && (
            <Row>
              <Col>
                {/* <CustomPagination activePage={currentPage} total={data.total} itemPerPage={itemPerPageInner} onPageClick={handleBlogPagination}/> */}
              </Col>
            </Row>
          )}
        </Row>
      </div>
    </DashboardLayout>
  );
};