import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import './index.scss'
import ErrorMessage from "../../components/error-message";
import { useEffect } from "react";
import ApiService from "../../services/api-service";
import AppContext from "../../context/app-context";

const schema = yup.object({
    email: yup.string().nullable().email('Please enter valid email address').required('Email is required'),
    password: yup.string().nullable().required('Password is required')
});

const LoginScreen = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const appContext = useContext(AppContext)
    console.log('appContext ::: ', appContext)
    const [apiError, setApiError] = useState(null)
    const [loading, setLoading] = useState(false)
    const inputClass = "px-3 py-2 bg-transparent"
    const { register, handleSubmit, formState:{ errors }, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: null,
            password: null
        }
    });
    useEffect(() => {
        if (appContext?.user) {
            navigate('/dashboard')
        }
    }, [appContext])
    useEffect(() => {
        if (apiError) {
            setTimeout(() => {
                setApiError(null)
            }, 5000)
        }
    }, [apiError])
    const handleSignup = (values) => {
        setLoading(true)
        ApiService.postRequest('/v1/auth', values)
        .then((res) => {
            const response = res.data || null
            if (response) {
                appContext.setCurrentUser(response)
                // localStorage.setItem('user', JSON.stringify(response))
                setTimeout(() => {
                    navigate('/dashboard')
                }, 3000)
            }
        })
        .catch((err) => {
            const errMessage = err?.response?.data?.message ? err.response.data.message : err.message
            setApiError(errMessage)
        })
        .finally(() => {
            setLoading(false)
        })
        // reset()
    }
    return (
        <Container fluid>
            <Row>
                <Col className="py-4 image-bg d-none d-sm-block" xs={12} sm={6}>
                </Col>
                <Col className="signup-container py-4 px-5" xs={12} sm={6}>
                    <Row className="mb-3">
                        <Col>
                            <h3>Login</h3>
                            <p>Welcome back</p>
                        </Col>
                    </Row>
                    {apiError && (
                        <Row>
                            <Col>
                                <Alert className="py-2" variant='danger'>{apiError}</Alert>
                            </Col>
                        </Row>
                    )}
                    <Row>
                        <Col>
                            <Form onSubmit={handleSubmit(handleSignup)}>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control className={inputClass} type="email" placeholder="Enter your email address" {...register('email')} disabled={loading}/>
                                    {errors?.email?.message && <ErrorMessage text={errors.email.message}/>}
                                </Form.Group>
                                <Form.Group className="mb-4" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control className={inputClass} type="password" placeholder="Enter your password" {...register('password')} disabled={loading}/>
                                    {errors?.password?.message && <ErrorMessage text={errors.password.message}/>}
                                </Form.Group>
                                <Form.Group>
                                    <Button className="w-100 fw-semibold" variant="primary" type="submit" disabled={loading}>Login</Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col>
                            <p className="mb-1">Not signup yet ?</p>
                            <Link to="/signup" className="text-decoration-none">Create account</Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginScreen