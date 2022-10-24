import { Col, Container, Row, Nav } from "react-bootstrap"
import { useContext } from "react"
import { useLocation, Link } from "react-router-dom"

import NavigationBar from "../../components/navigation-bar"
import AppContext from "../../context/app-context"
import './index.scss'

const navLinks = [
    {
        link: '/dashboard',
        text: 'Overview'
    },
    {
        link: '/posts',
        text: 'Posts'
    },
    {
        link: '/categories',
        text: 'Categories'
    },
    {
        link: '/sharing',
        text: 'Sharing'
    },
    {
        link: '/profile',
        text: 'Profile'
    },
]

const DashboardLayout = ({
    children,
    links
}) => {
    const appContext = useContext(AppContext)
    const location = useLocation()
    const currentBaseLocation = location.pathname.split('/').filter((el) => el)
    const defaultActiveKey = currentBaseLocation.length > 0 ? `/${currentBaseLocation[0]}` : '/dashboard'
    const linksMapping = links.length > 0 ? links : navLinks
    return (
        <>
            <NavigationBar isAuth={appContext?.user}/>
            <section className="section-dashboard">
                <Container fluid>
                    <Row>
                        <Col sm={12} md={3} lg={2} xxl={2} className="sidebar-nav bg-white px-0">
                            <Nav defaultActiveKey={defaultActiveKey} className="flex-column">
                                {linksMapping.map((el, index) => (
                                    <Nav.Link as={Link} to={el.link} className={defaultActiveKey === el.link ? 'active' : ''} key={`sidebar_nav${el.text.toLowerCase()}${index}`}>{el.text}</Nav.Link>
                                ))}
                            </Nav>
                        </Col>
                        <Col sm={12} md={9} lg={10} xxl={10} className="px-4 py-4">
                            {children}
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

DashboardLayout.defaultProps = {
    children: '',
    links: []
}

export default DashboardLayout