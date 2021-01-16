import React, { Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { login } from "../common/APIUtils";
import { ACCESS_TOKEN } from "../common/constants";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usernameOrEmail: "",
      password: "",
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    console.log(this.props);
  }
  handleSubmitLogin = (event) => {
    event.preventDefault();
    const values = {
      usernameOrEmail: this.state.usernameOrEmail,
      password: this.state.password,
    };
    const loginRequest = Object.assign({}, values);
    login(loginRequest)
      .then((response) => {
        sessionStorage.setItem(ACCESS_TOKEN, response.accessToken);
        toast.success("You succesfully loggedin!");
        this.props.onLogin();
      })
      .catch((error) => {
        if (error.status === 401) {
          toast.error("Username or password is incorrect");
        } else {
          toast.error("Something went wrong! :(");
        }
      });
  };

  render() {
    return (
      <Container>
        <h3> Login </h3>
        <Form onSubmit={this.handleSubmitLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address or username</Form.Label>
            <Form.Control
              type="text"
              name="usernameOrEmail"
              placeholder="Enter email"
              value={this.state.usernameOrEmail}
              onChange={this.onChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.onChange}
            />
          </Form.Group>
          <Button type="submit" size="large" className="login-form-button">
            Login
          </Button>
          Or <Link to="/signup">register now!</Link>
        </Form>
      </Container>
    );
  }
}
