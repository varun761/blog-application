import { useForm } from "react-hook-form";
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { Link } from "react-router-dom";
import './index.scss'
import ErrorMessage from "../../components/ErrorMessage";

const LoginScreen = () => {
    const inputClass = "px-3 py-2 bg-transparent"
    const { register, handleSubmit, formState: { errors }, getValues} = useForm({
        defaultValues: {
            email: null,
            password: null
        }
    })
    const handleSignup = (values) => {
        console.log('values ::: ', values)
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
                    <Row>
                        <Col>
                            <Form onSubmit={handleSubmit(handleSignup)}>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control className={inputClass} type="email" placeholder="Enter your email address" {...register('email', { required: true, minLength: 3})}/>
                                    {errors?.email?.type === 'required' && <ErrorMessage text="Email is required"/>}
                                </Form.Group>
                                <Form.Group className="mb-4" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control className={inputClass} type="password" placeholder="Enter your password" {...register('password', { required: true, minLength: 3})}/>
                                    {errors?.password?.type === 'required' && <ErrorMessage text="Password is required"/>}
                                </Form.Group>
                                <Form.Group>
                                    <Button className="w-100 fw-semibold" variant="primary" type="submit">Login</Button>
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