import React, { Component } from "react";
import { signup } from "../common/APIUtils";
import { toast } from "react-toastify";
import { Container, Form, Row, Button } from "react-bootstrap";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      email: "",
      password: "",
    };
  }
  componentDidMount() {
    sessionStorage.clear();
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (event) => {
    // sessionStorage.clear();
    event.preventDefault();
    const signupRequest = {
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    signup(signupRequest)
      .then((response) => {
        toast.success(response);
        this.props.history.push("/login");
        console.log("been here duhhh");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Not subscribed");
      });
  };

  render() {
    return (
      <Container>
        <h3> Signup </h3>
        <Row>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Signup</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="name"
                value={this.state.name}
                onChange={this.onChange}
              />
              <Form.Control
                type="text"
                name="username"
                placeholder="username"
                value={this.state.username}
                onChange={this.onChange}
              />
              <Form.Control
                type="text"
                name="email"
                placeholder="email"
                value={this.state.email}
                onChange={this.onChange}
              />
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
            <Button
              variant="primary"
              type="submit"
              // isOpen={this.state.modal}
              //   onClick={this.handleClick}
            >
              Submit
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}
