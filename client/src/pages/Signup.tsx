import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Card, Button, Container } from 'react-bootstrap';
import { error } from 'console';
import { addUser } from '../service';
import { URLEnum } from '../RouterEnum';
import { useNavigate } from 'react-router-dom';

interface FormValues {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    mobile: string;
    roles: string[];
}

const Signup = () => {
    
    const [rolesSet, setRolesSet] = useState(false);
    
    const initialValues = {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        email: '',
        mobile: '',
        roles: []
    };
    
    const navigate = useNavigate();
    
    const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
        const errors = validateForm(values);
      
        if (Object.keys(errors).length === 0) {
          try {
            const accessToken = localStorage.getItem('token');
            await addUser(accessToken!, values);
              navigate(URLEnum.LOGIN);

            // Handle success or navigate to another page
          } catch (error) {
            // Handle error
          }
        }
      
        // Reset form submission state
        setSubmitting(false);
      };

    const validateForm = (values: FormValues) => {
        const errors: Partial<FormValues> = {};

        if (!values.firstName) {
            errors.firstName = 'First Name is required';
        }

        if (!values.lastName) {
            errors.lastName = 'Last Name is required';
        }

        if (!values.username) {
            errors.username = 'Username is required';
        }

        if (!values.password) {
            errors.password = 'Password is required';
        }

        if (!values.email) {
            errors.email = 'Email is required';
        }

        if (!values.mobile) {
            errors.mobile = 'Mobile is required';
        }

        if (values.roles.length === 0) {
            errors.roles = ['Please select at least one role'];
            alert('Please select at least one role');
        }

        return errors;
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Card style={{ width: '400px' }}>
                    <Card.Body>
                        <Card.Title className="text-center mb-4">Sign Up</Card.Title>
                        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                            <Form>
                                <div className="mb-3">
                                    <Field
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        className="form-control"
                                        required
                                    />
                                    <ErrorMessage name="firstName" component="div" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <Field
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        className="form-control"
                                        required
                                    />
                                    <ErrorMessage name="lastName" component="div" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <Field
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        className="form-control"
                                        required
                                    />
                                    <ErrorMessage name="username" component="div" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        className="form-control"
                                        required
                                    />
                                    <ErrorMessage name="password" component="div" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        className="form-control"
                                        required
                                    />
                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <Field
                                        type="tel"
                                        name="mobile"
                                        placeholder="Mobile"
                                        className="form-control"
                                        required
                                    />
                                    <ErrorMessage name="mobile" component="div" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <div>Roles:</div>
                                    <div>
                                        <label>
                                            <Field type="checkbox" name="roles" value="collection-staff" />
                                            Collection Staff
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <Field type="checkbox" name="roles" value="distribution-staff" />
                                            Distribution Staff
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <Field type="checkbox" name="roles" value="management-staff" />
                                            Management Staff
                                        </label>
                                    </div>
                                    {!rolesSet &&
                                        <ErrorMessage name="rolesMsg" component="div" className="text-danger" />

                                    }
                                </div>

                                <div className="d-grid">
                                    <Button variant="primary" type="submit">
                                        Sign Up
                                    </Button>
                                </div>
                            </Form>
                        </Formik>
                    </Card.Body>
                </Card>
            </Container>
        </Formik>

    );
};

export default Signup;
