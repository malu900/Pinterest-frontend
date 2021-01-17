import React, { Component } from "react";
import { getAllImages } from "../common/APIUtils";
import { ImageComponent } from "./ImageComponent";
import { Link } from "react-router-dom";
import { ImageWebsockets } from "./ImageWebsockets";

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
    });
  };

  render() {
    let images = this.state.images;
    return (
      <div className="image-container">
        {images.length > 0 ? (
          images.map((item, i) => (
            <div>
              <ImageComponent
                key={i}
                image={item}
                isauthenticated={this.state.isauthenticated}
                currentuser={this.state.currentuser}
                {...this.props}
              />
              <Link
                key={i}
                to={`/collections/images/${item.id}`}
                params={{ id: item.id }}
                image={item}
                {...this.props}
              >
                {item.imageName}
              </Link>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default Overview;
// {images.length > 0 ? (
//     images.map((item, i) => (
//       <div>
//         <img src={item.photoBase64} />
//         <ImageComponent
//           key={i}
//           image={item}
//           isauthenticated={this.state.isauthenticated}
//           currentuser={this.state.currentuser}
//         />
//         {console.log(item)}
//         <Link
//           key={i}
//         //   to={`/collections/images/${item.id}`}
//           params={{ id: item.id }}
//           image={item}
//           {...this.props}
//         >
//           {item.imageName}
//         </Link>
//       </div>
//     ))
//   )
//     }
