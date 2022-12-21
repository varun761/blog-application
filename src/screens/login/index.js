import { useContext, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from 'react-bootstrap-icons';
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
    const navigate = useNavigate()
    const appContext = useContext(AppContext)
    const [apiError, setApiError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [disableForm, setDisableForm] = useState(false)
    const inputClass = "px-3 py-2 bg-transparent"
    const { register, handleSubmit, formState:{ errors }, reset, watch } = useForm({
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
    }, [appContext, navigate])

    useEffect(() => {
        const subscription = watch(() => {
            if (apiError) {
                setApiError(false)
                setDisableForm(false)
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, apiError]);
    const handleSignIn = (values) => {
        setLoading(true)
        setApiError(null)
        ApiService.postRequest('/v1/auth', values)
        .then((res) => {
            const response = res.data || null
            if (response) {
                appContext.setCurrentUser(response)
            }
        })
        .catch((err) => {
            const errMessage = err?.response?.data?.message ? err.response.data.message : err.message
            setApiError(errMessage)
            setDisableForm(true)
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
                            <NavLink to="/" className="text-decoration-none" aria-label="Back to home"><ArrowLeft/> Back to home</NavLink>
                        </Col>
                    </Row>
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
                            <Form onSubmit={handleSubmit(handleSignIn)}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="email" aria-label="email">Email</Form.Label>
                                    <Form.Control className={inputClass} type="email" placeholder="Enter your email address" aria-required="true" aria-labelledby="email" aria-placeholder="Enter your email address" {...register('email')} disabled={loading}/>
                                    {errors?.email?.message && <ErrorMessage text={errors.email.message}/>}
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label htmlFor="password" aria-label="password">Password</Form.Label>
                                    <Form.Control className={inputClass} type="password" placeholder="Enter your password" {...register('password')} disabled={loading} aria-required="true" aria-labelledby="password" aria-placeholder="Enter your password"/>
                                    {errors?.password?.message && <ErrorMessage text={errors.password.message}/>}
                                </Form.Group>
                                <Form.Group>
                                    <Button className="w-100 fw-semibold" variant="primary" type="submit" disabled={loading || disableForm} role="button">Login</Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col>
                            <p className="mb-1">Not signup yet ?</p>
                            <Link to="/signup" className="text-decoration-none" aria-label="Create account">Create account</Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginScreen