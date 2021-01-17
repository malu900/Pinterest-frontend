import React, { Component } from "react";

export class Image extends Component {
  render() {
    const image = this.props.image;
    return (
      <div className="image-container-layout">
        <img src={image.photoBase64} />
        <p> {image.id}</p>
        <p> {image.imageName} </p>
      </div>
    );
  }
}

export default Image;
