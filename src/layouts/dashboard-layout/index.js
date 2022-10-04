import { Col, Container, Row, Nav } from "react-bootstrap"
import { useContext } from "react"
import { useLocation, Link } from "react-router-dom"

import NavigationBar from "../../components/navigation-bar"
import AppContext from "../../context/app-context"
import './index.scss'

const DashboardLayout = (props) => {
    const appContext = useContext(AppContext)
    const location = useLocation()
    const currentBaseLocation = location.pathname.split('/').filter((el) => el)
    const defaultActiveKey = currentBaseLocation.length > 0 ? `/${currentBaseLocation[0]}` : '/dashboard'
    return (
        <>
            <NavigationBar isAuth={appContext?.user}/>
            <section className="section-dashboard">
                <Container fluid>
                    <Row>
                        <Col sm={12} md={3} lg={2} xxl={2} className="sidebar-nav bg-white px-0">
                            <Nav defaultActiveKey={defaultActiveKey} className="flex-column">
                                <Nav.Link as={Link} to="/dashboard">Overview</Nav.Link>
                                <Nav.Link as={Link} to="/posts">Posts</Nav.Link>
                                <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
                                <Nav.Link as={Link} to="/sharing">Sharing</Nav.Link>
                                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                            </Nav>
                        </Col>
                        <Col sm={12} md={9} lg={10} xxl={10} className="px-4 py-4">
                            {props.children}
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default DashboardLayout