import React, { Component } from "react";
import { getImageById } from "../common/APIUtils";

export class ImageWebsockets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: [],
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
      this.setState({
        image: response,
      });
    });
  };
  render() {
    return (
      <div className="one-image-container">
        <div>
          <img src={this.state.image.photoBase64} />
        </div>
        <div> </div>

        <p> {this.state.image.id}</p>
        <p> {this.state.imageName} </p>
      </div>
    );
  }
}
export default ImageWebsockets;
