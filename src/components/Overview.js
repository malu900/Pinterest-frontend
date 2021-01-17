import React, { Component } from "react";
import { getAllImages } from "../common/APIUtils";
import { ImageComponent } from "./ImageComponent";

export class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      isauthenticated: this.props.isauthenticated,
      currentuser: this.props.currentuser,
    };
  }

  componentDidMount() {
    let bool = this.state.isauthenticated;
    console.log(bool);
    if (bool) {
      console.log("authed");
      this.getAllImagesIfSignedIn();
    } else {
      this.props.history.push("/");
    }
  }

  getAllImagesIfSignedIn = () => {
    getAllImages().then((response) => {
      this.setState({
        images: response,
      });
      console.log(response);
    });
  };

  render() {
    let images = this.state.images;
    console.log(images);
    return (
      <div className="pinterest-layout-container">
        {images.length > 0 ? (
          images.map((item, i) => (
            <ImageComponent
              className="pinterest-layout-container-item"
              image={item}
              isauthenticated={this.state.isauthenticated}
              currentuser={this.state.currentuser}
              {...this.props}
            />
          ))
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default Overview;
// {this.state.images.length > 0 ? (
//     this.state.images.map((item, i) => (
//       <div>
//         <img src={item.photoBase64} />
//         {/* <Image
//           key={i}
//           image={item}
//           isauthenticated={this.state.isauthenticated}
//           currentuser={this.state.currentuser}
//         /> */}
//         {console.log(item)}
//         <Link
//           key={i}
//           to={`/collections/images/${item.id}`}
//           params={{ id: item.id }}
//           image={item}
//           {...this.props}
//         >
//           {item.imageName}
//         </Link>
//       </div>
//     ))
//   )
