import { useState, useEffect, useMemo } from "react"
import { Row, Col, Spinner, Container, Card, Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import NoImagePost from "../../assets/images/post_sample.jpg"
import Common from "../../utilities/common-util"
import BasicLayout from "../../layouts/basic-layout"
import ApiService from "../../services/api-service"
import "./index.scss"

const LoadingBlogPosts = () => {
    const [error, setError] = useState(null)
    const [posts, setPosts] = useState([])
    const data = useMemo(() => posts, [posts]);
    const [loading, setLoading] = useState(true)
    const getAllPosts = (skip, limit) => {
        setError(null)
        setLoading(true)
        ApiService.getRequest(`/v1/post/?skip=${skip}&limit=${limit}`)
        .then((res) => res.data)
        .then((res) => {
            const { posts } = res
            if (posts) {
                setPosts(posts)
            } else {
                setPosts([])
            }
        }).catch((err) => {
            setError(err.message)
        })
        .finally(() => setLoading(false))
    }

    return {
        error,
        data,
        loading,
        getAllPosts
    }
}

const HomeScreen = () => {
    const { error, data, loading, getAllPosts } = LoadingBlogPosts()
    const [skip, setSkip] = useState(0)
    const [itemPerPage, setItemsPerPage] = useState(10)
    useEffect(() => {
        getAllPosts(skip, itemPerPage)
    }, [skip, itemPerPage])
    
    return (
        <BasicLayout>
            <Container fluid>
                {loading && (
                    <Row className="my-5">
                        <Col className="text-center">
                            <Spinner animation="border" variant="primary"/>
                        </Col>
                    </Row>
                )}
                {!loading && data.length === 0 && (
                    <Row className="my-5">
                        <Col className="text-center">
                            <p className="mb-0">No More Posts</p>
                        </Col>
                    </Row>
                )}
                {
                    !loading && data.length > 0 && (
                        <Row className="mt-5">
                            {data.map((el) => {
                                let postedTime = Common.dateDifference(el.created_at)
                                return (
                                <Col key={`post_${el._id}`} sm={4} className="blog-card">
                                    <Card>
                                        <Card.Body>
                                            <Row>
                                                <Col>
                                                    <div className="card-img">
                                                        <Image src={NoImagePost} fluid/>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Card.Title className="my-3">
                                                <Link to={`/post/${el._id}`}>{el.title}</Link>
                                            </Card.Title>
                                            <Card.Text>
                                                <Row>
                                                    <Col>
                                                        <p className="post-description mb-3">{el?.description}</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <ul className="post-info">
                                                            <li>{el?.author?.name}</li>
                                                            <li className="dot">.</li>
                                                            <li>{postedTime}</li>
                                                        </ul>
                                                    </Col>
                                                </Row>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )})}
                        </Row>
                    )
                }
            </Container>
        </BasicLayout>
    )
}

export default HomeScreen