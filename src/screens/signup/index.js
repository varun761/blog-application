import { useForm } from "react-hook-form";
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { Link } from "react-router-dom";
import './index.scss'
import ErrorMessage from "../../components/ErrorMessage";

const SignupScreen = () => {
    const inputClass = "px-3 py-2 bg-transparent"
    const { register, handleSubmit, formState: { errors }, getValues} = useForm()
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
                            <h3>Signup</h3>
                            <p>Create your account</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form onSubmit={handleSubmit(handleSignup)}>
                                <Form.Group className="mb-3" controlId="first_name">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control className={inputClass} type="text" placeholder="Enter your first name" {...register('first_name', { required: true, minLength: 3})}/>
                                    {errors?.first_name?.type === 'required' && <ErrorMessage text="First name is required"/>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="last_name">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control className={inputClass} type="text" placeholder="Enter your last name" {...register('last_name', { minLength: 3})}/>
                                    {errors?.last_name?.type === 'required' && <ErrorMessage text="Last name is required"/>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control className={inputClass} type="email" placeholder="Enter your email address" {...register('email', { required: true, minLength: 3})}/>
                                    {errors?.email?.type === 'required' && <ErrorMessage text="Email is required"/>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control className={inputClass} type="password" placeholder="Enter your password" {...register('password', { required: true, minLength: 3})}/>
                                    {errors?.password?.type === 'required' && <ErrorMessage text="Password is required"/>}
                                </Form.Group>
                                <Form.Group className="mb-4" controlId="confirm_password">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control className={inputClass} type="password" placeholder="ReType your password" {...register('confirm_password', { required: true, minLength: 3, validate: {
                                        mustMatch: v => v === getValues('password')
                                    }})}/>
                                    {errors?.confirm_password?.type === 'required' && <ErrorMessage text="Please retype your password"/>}
                                    {errors?.confirm_password?.type === 'mustMatch' && <ErrorMessage text="Password and confirm password need to be same."/>}
                                </Form.Group>
                                <Form.Group>
                                    <Button className="w-100 fw-semibold" variant="primary" type="submit">Signup</Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col>
                            <p className="mb-1">Already had account ?</p>
                            <Link to="/" className="text-decoration-none">Login</Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default SignupScreen