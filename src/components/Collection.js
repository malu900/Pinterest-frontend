import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { createCollection } from "../common/APIUtils";
import { API_BASE_URL, ACCESS_TOKEN } from "../common/constants";
import axios from "axios";

export class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collectionName: "",
      file: null,
      success: "",
      isauthenticated: this.props.isauthenticated,
      currentuser: this.props.currentuser,
    };
  }
  componentDidMount() {
    // if (this.state.isauthenticated) {
    //   console.log("authed");
    // } else {
    //   // this.props.history.push("/");
    // }
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (event) => {
    const headers = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    });
    if (sessionStorage.getItem(ACCESS_TOKEN)) {
      headers.append(
        "Authorization",
        "Bearer " + sessionStorage.getItem(ACCESS_TOKEN)
      );
    }
    console.log(headers.values);

    event.preventDefault();

    const formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("collectionName", this.state.collectionName);

    axios({
      method: "post",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem(ACCESS_TOKEN),
      },
      url: "http://localhost:8080/api/collections",
      data: formData,
    })
      .then(() => {
        this.props.history.push("/collections/all");
      })
      .catch(function (response) {
        console.log(response);
      });
    console.log(formData);
  };

  uploadFile = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("collectionName", this.state.collectionName);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
  };
  fileSelectedHandler = (event) => {
    console.log(event.target.files[0]);
    this.setState({
      file: event.target.files[0],
    });
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Collection name</Form.Label>
            <Form.Control
              type="text"
              name="collectionName"
              placeholder="collection name"
              value={this.state.collectionName}
              onChange={this.onChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Collection Image</Form.Label>
            <Form.Control
              type="file"
              name="collectionImage"
              placeholder="collection image"
              value={this.state.collectionImage}
              onChange={this.fileSelectedHandler}
              accept="image/png, image/jpeg"
            />
          </Form.Group>
          <Button disabled={!this.state.file} onClick={this.uploadFile}>
            Upload
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default Collection;

// import React, { Component } from "react";
// import { Form, Button } from "react-bootstrap";
// import { toast } from "react-toastify";
// import { createCollection } from "../common/APIUtils";

// export class Collection extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       collectionName: "",
//       file: null,
//       success: "",
//       isauthenticated: this.props.isauthenticated,
//       currentuser: this.props.currentuser,
//     };
//   }
//   componentDidMount() {
//     console.log(this.props.currentuser, this.props.isauthenticated);
//     if (this.state.isauthenticated) {
//       console.log("authed");
//     } else {
//       this.props.history.push("/");
//     }
//   }
//   onChange = (e) => {
//     this.setState({
//       [e.target.name]: e.target.value,
//     });
//   };

//   handleSubmit = (event) => {
//     event.preventDefault();
//     // this.setState({
//     //   file: event.target.files[0],
//     // });
//     const collectionRequest = {
//       collectionName: this.state.collectionName,
//     };
//     createCollection(collectionRequest)
//       .then((response) => {
//         this.setState({
//           success: response.success,
//         });
//         console.log(this.state.success);
//         if (this.state.success) {
//           console.log(response.message);
//           toast.success(response.message);
//         }
//       })
//       .catch((error) => {
//         if (error.status === 401) {
//           this.props.handleLogout(
//             "/login",
//             "error",
//             "You have been logged out. please login to create a collection"
//           );
//         } else {
//           toast.error("Something went wrong! :(");
//         }
//       });
//     console.log(collectionRequest);
//   };

//   uploadFile = (event) => {
//     event.preventDefault();
//     // this.setState({ msg: "" });

//       const formData = new FormData();
//   formData.append(
//     "file",
//     this.state.selectedFile,
//     "collectionName",
//     this.state.collectionName
//   );
//     console.log(data);
//     // fetch("http://localhost:8080/upload", {
//     //   method: "POST",
//     //   body: data,
//     // })
//     //   .then((response) => {
//     //     this.setState({ msg: "File successfully uploaded" });
//     //   })
//     //   .catch((err) => {
//     //     this.setState({ error: err });
//     //   });
//   };
//   fileSelectedHandler = (event) => {
//     console.log(event.target.files[0]);
//     this.setState({
//       file: event.target.files[0],
//     });
//   };

//   render() {
//     return (
//       <div>
//         <Form onSubmit={this.handleSubmit}>
//           <Form.Group>
//             <Form.Label>Collection name</Form.Label>
//             <Form.Control
//               type="text"
//               name="collectionName"
//               placeholder="collection name"
//               value={this.state.collectionName}
//               onChange={this.onChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="formBasicEmail">
//             <Form.Label>Collection Image</Form.Label>
//             <Form.Control
//               type="file"
//               name="collectionImage"
//               placeholder="collection image"
//               value={this.state.collectionImage}
//               onChange={this.fileSelectedHandler}
//               accept="image/png, image/jpeg"
//             />
//           </Form.Group>
//           <Button disabled={!this.state.file} onClick={this.uploadFile}>
//             Upload
//           </Button>
//           <Button variant="primary" type="submit">
//             Submit
//           </Button>
//         </Form>
//       </div>
//     );
//   }
// }

// export default Collection;
