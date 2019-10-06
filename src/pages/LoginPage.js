import React from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import Parse from 'parse'
import { User } from '../data-model/User';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invalidLogin: false,
            successLogin: false
        }

        this.emailInput = React.createRef();
        this.pwdInput = React.createRef();

        this.login = this.login.bind(this);
    }

    login() {

        Parse.User.logIn(this.emailInput.current.value, this.pwdInput.current.value).then(user => {
            // Do stuff after successful login
            console.log('Logged in user', user);

            // calling App's callback function
            this.props.handleLogin(new User(user));
            this.setState({successLogin: true});
        }).catch(error => {
            console.error('Error while logging in user', error);
            this.setState({invalidLogin: true});
        });
    }

    render() {

        if (this.state.successLogin) {
            return <Redirect to="/recipes" />
        }

        return (
            <div className="login">
                <h1>Login to Recipe Book</h1>
                <p>or <a href="#/signup">create an account</a></p>
                <Alert variant="danger" show={this.state.invalidLogin}>
                    Invalid email or password!
                </Alert>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control ref={this.emailInput} type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control ref={this.pwdInput} type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="success" type="button" block onClick={this.login}>
                        Login
                    </Button>
                </Form>

            </div>

        );
    }
}

export default LoginPage;