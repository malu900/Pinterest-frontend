import React, { Component } from "react";
import "../App.scss";
import { getImageById } from "../common/APIUtils";

export class ImageWebsockets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: [],
      collection: [],
      user: [],
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
    this.getImageOnLoad();
  }

  getImageOnLoad = () => {
    const id = this.props.match.params.id;
    getImageById(id).then((response) => {
      const image = response;
      const collection = image.collection;
      const user = collection.user;
      this.setState({
        image: image,
        collection: collection,
        user: user,
      });
    });
  };
  render() {
    console.log(this.state.user);
    return (
      <div className="one-image-container">
        <div className="one-image-container-img">
          <img src={this.state.image.photoBase64} />
        </div>
        <div className="one-image-container-info">
          <p> User: {this.state.user.username} </p>
          <p>Collection: {this.state.collection.collectionname} </p>
          <p> Image: {this.state.image.imageName} </p>
        </div>
      </div>
    );
  }
}
export default ImageWebsockets;
