import { Row, Col, Card } from "react-bootstrap";
import DashboardLayout from "../../layouts/dashboard-layout";

const DashboardCards = ({ variant, textVariant, cardHeading, cardText }) => (
  <Card bg={variant} text={textVariant} className="mb-4">
    <Card.Body>
      <Card.Title>{cardHeading}</Card.Title>
      <Card.Text>
        <h4>{cardText}</h4>
      </Card.Text>
    </Card.Body>
  </Card>
);

const DashboardScreen = () => {
  return (
    <DashboardLayout>
      <Row>
        <Col>
          <h3>Dashboard</h3>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <h5>Welcome Back !</h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <DashboardCards variant="success" cardHeading="Total Posts" cardText="0" textVariant="white"/>
        </Col>
        <Col>
          <DashboardCards variant="warning" cardHeading="Total Published Posts" cardText="0" textVariant="white"/>
        </Col>
        <Col>
          <DashboardCards variant="info" cardHeading="Total Private Posts" cardText="0" textVariant="white"/>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <DashboardCards variant="primary" cardHeading="Total Likes" cardText="0" textVariant="white"/>
        </Col>
        <Col md={4}>
          <DashboardCards variant="dark" cardHeading="Total Comments" cardText="0" textVariant="white"/>
        </Col>
      </Row>
    </DashboardLayout>
  );
};

export default DashboardScreen;
