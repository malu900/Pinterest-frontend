import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { createImageInCollection } from "../common/APIUtils";

export class CreateImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageName: "",
      file: null,
      isauthenticated: this.props.isauthenticated,
      currentuser: this.props.currentuser,
    };
  }

  componentDidMount() {
    let bool = this.state.isauthenticated;
    if (bool) {
      console.log("authed");
    } else {
      this.props.history.push("/");
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("imageName", this.state.imageName);

    createImageInCollection(this.props.collectionId, formData)
      .then(() => {
        this.setState({
          imageName: "",
          file: null,
        });
        const id = this.props.collectionId;
        window.location.reload();
      })
      .catch(function (response) {});
  };

  fileSelectedHandler = (event) => {
    this.setState({
      file: event.target.files[0],
    });
  };
  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>image name</Form.Label>
            <Form.Control
              type="text"
              name="imageName"
              placeholder="collection name"
              value={this.state.imageName}
              onChange={this.onChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              placeholder="collection image"
              onChange={this.fileSelectedHandler}
              accept="image/jpeg"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default CreateImage;
