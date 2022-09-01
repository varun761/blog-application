import { useForm } from "react-hook-form";
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import './index.scss'

const ErrorMessage = ({ text }) => (<p className="text-danger">{text}</p>)

const SignupScreen = () => {
    const { register, handleSubmit, formState: { errors }, getValues} = useForm()
    const handleSignup = (values) => {
        console.log('values ::: ', values)
    }
    return (
        <Container fluid>
            <Row>
                <Col className="py-4 image-bg" xs={12} sm={6}>
                </Col>
                <Col className="bg-light py-4" xs={12} sm={6}>
                    <h3>Signup</h3>
                    <p>Please fill all the informations below</p>
                    <Form onSubmit={handleSubmit(handleSignup)}>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your first name" {...register('first_name', { required: true, minLength: 3})}/>
                            {errors?.first_name?.type === 'required' && <ErrorMessage text="First name is required"/>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your last name" {...register('last_name', { minLength: 3})}/>
                            {errors?.last_name?.type === 'required' && <ErrorMessage text="Last name is required"/>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email address" {...register('email', { required: true, minLength: 3})}/>
                            {errors?.email?.type === 'required' && <ErrorMessage text="Email is required"/>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter your password" {...register('password', { required: true, minLength: 3})}/>
                            {errors?.password?.type === 'required' && <ErrorMessage text="Password is required"/>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="ReType your password" {...register('confirm_password', { required: true, minLength: 3, validate: {
                                mustMatch: v => v === getValues('password')
                            }})}/>
                            {errors?.confirm_password?.type === 'required' && <ErrorMessage text="Please retype your password"/>}
                            {errors?.confirm_password?.type === 'mustMatch' && <ErrorMessage text="Password and confirm password need to be same."/>}
                        </Form.Group>
                        <Form.Group>
                            <Button variant="primary" type="submit">Submit</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default SignupScreen