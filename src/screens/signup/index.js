import { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ArrowLeft } from 'react-bootstrap-icons';
import moment from 'moment'

import './index.scss';
import ErrorMessage from "../../components/error-message";
import ApiService from '../../services/api-service';
import AppContext from '../../context/app-context';

const schema = yup.object({
    first_name: yup.string().required('First Name is required'),
    last_name: yup.string(),
    email: yup.string().email('Please enter valid email address').required('Email is required'),
    dob: yup.date().required('Please select a date'),
    password: yup.string().required('Password is required'),
    confirm_password: yup.string().required('Please retype your password')
     .oneOf([yup.ref('password'), null], 'Passwords must match')
});

const SignupScreen = () => {
    const appContext = useContext(AppContext)
    const navigate = useNavigate()
    const [apiError, setApiError] = useState(null)
    const [loading, setLoading] = useState(false)
    const inputClass = "px-3 py-2 bg-transparent"
    const { register, handleSubmit, formState:{ errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });
    useEffect(() => {
        if (apiError) {
            setTimeout(() => {
                setApiError(null)
            }, 5000)
        }
    }, [apiError])
    const handleSignup = ({ first_name, last_name, dob, email, password }) => {
        setLoading(true)
        ApiService.postRequest('/v1/user', {
            name: (`${first_name} ${last_name || ''}`).trim(),
            dob: moment(dob).format('YYYY-MM-DD'),
            email,
            password
        }).then((res) => {
            if(res.status === 201) {
                reset()
                navigate('/', {
                    state: {
                        signup: "success"
                    }
                })
            }
        }).catch((err) => {
            const errMessage = err?.response?.data?.message ? err.response.data.message : err.message
            setApiError(errMessage)
        }).finally(() => {
            setLoading(false)
        })
    }
    useEffect(() => {
        if (appContext?.user) {
            navigate('/dashboard')
        }
    }, [appContext, navigate])
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
                            <h3>Signup</h3>
                            <p>Create your account</p>
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
                                <Form.Group className="mb-3" controlId="first_name">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control className={inputClass} type="text" placeholder="Enter your first name" {...register('first_name')} disabled={loading}/>
                                    {errors?.first_name?.message && <ErrorMessage text={errors.first_name.message}/>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="last_name">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control className={inputClass} type="text" placeholder="Enter your last name" {...register('last_name')} disabled={loading}/>
                                    {errors?.last_name?.message && <ErrorMessage text={errors.last_name.message}/>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="last_name">
                                    <Form.Label>Date of birth</Form.Label>
                                    <Form.Control className={inputClass} type="date" placeholder="Enter your dob" {...register('dob')} disabled={loading}/>
                                    {errors?.dob?.message && <ErrorMessage text={errors.dob.message}/>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control className={inputClass} type="email" placeholder="Enter your email address" {...register('email')} disabled={loading}/>
                                    {errors?.email?.message && <ErrorMessage text={errors.email.message}/>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control className={inputClass} type="password" placeholder="Enter your password" {...register('password')} disabled={loading}/>
                                    {errors?.password?.message && <ErrorMessage text={errors.password.message}/>}
                                </Form.Group>
                                <Form.Group className="mb-4" controlId="confirm_password">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control className={inputClass} type="password" placeholder="ReType your password" {...register('confirm_password')} disabled={loading}/>
                                    {errors?.confirm_password?.message && <ErrorMessage text={errors.confirm_password.message}/>}
                                </Form.Group>
                                <Form.Group>
                                    <Button className="w-100 fw-semibold" variant="primary" type="submit" disabled={loading}>Signup</Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col>
                            <p className="mb-1">Already had account ?</p>
                            <Link to="/login" className="text-decoration-none">Login</Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default SignupScreen