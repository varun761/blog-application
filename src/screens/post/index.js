import { useState, useEffect } from "react";
import { Row, Col, Table, Button, Spinner, Form, Nav } from "react-bootstrap";
import moment from "moment";
import ErrorMessage from "../../components/error-message";
import DashboardLayout from "../../layouts/dashboard-layout";
// import ApiService from "../../services/api-service";
import "./index.scss";
// import AppContext from "../../context/app-context";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../../components/custom-pagination";
import useAuthorizedApiHook from "../../hooks/authorized-api-hook";

const PostScreen = () => {
  const navigate = useNavigate();
  const { error, data, loading, sendRequest } = useAuthorizedApiHook()
  const [allChecked, setAllChecked] = useState(false);
  const [allSelectedId, setAllSelectedId] = useState([]);
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1)
  const [itemPerPageInner, setItemsPerPage] = useState(10);
  const [testingAffect, setTestingAffect] = useState(0);
  console.log("---render---");
  useEffect(() => {
    setCurrentPage(1)
    sendRequest('/v1/post/by-author/', 'GET', null, {
      skip,
      itemPerPage: itemPerPageInner
    });
  }, []);
  return (
    <DashboardLayout>
      <div className="blog-post">
        <Row className="mb-3">
          <Col>
            <h3>Posts</h3>
          </Col>
        </Row>
      </div>
    </DashboardLayout>
  );
};

export default PostScreen;
