import React, { Component } from "react";

export class ImageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.image,
      isauthenticated: this.props.isauthenticated,
      currentuser: this.props.currentuser,
    };
  }

  componentDidMount() {
    console.log(this.state.currentuser);
  }
  render() {
    return (
      <div className="image-container-layout">
        <img src={this.state.image.photoBase64} />
        <p> {this.state.image.id}</p>
        <p> {this.state.imageName} </p>
      </div>
    );
  }
}

export default Image;
