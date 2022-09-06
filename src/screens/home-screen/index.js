import { useState, useEffect, useMemo } from "react"
import { Row, Col, Spinner, Container, Card, Button } from "react-bootstrap"
import Common from "../../utilities/common-util"
import BaseLayout from "../../layouts/basic-layout"
import ApiService from "../../services/api-service"

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
    }, [])
    
    return (
        <BaseLayout>
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
                            <p>No More Posts</p>
                        </Col>
                    </Row>
                )}
                {
                    !loading && data.length > 0 && (
                        <Row className="my-3">
                            {data.map((el) => {
                                let postedTime = Common.dateDifference(el.created_at)
                                return (
                                <Col key={`post_${el._id}`} sm={4} className="mb-4">
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>{el.title}</Card.Title>
                                            <Card.Text>
                                                <p className="mb-0">Posted By: {el?.author?.name}</p>
                                                <p className="mb-0">Posted At: {postedTime}</p>
                                                <p className="mb-0">Liked By: 11</p>
                                                <p className="mb-0">Viewed By: 20</p>
                                            </Card.Text>

                                            <Button variant="primary">Read More</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )})}
                        </Row>
                    )
                }
            </Container>
        </BaseLayout>
    )
}

export default HomeScreen