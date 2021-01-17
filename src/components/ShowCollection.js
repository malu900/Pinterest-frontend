import React, { Component } from "react";
import {
  getUserCollectionByCollectionId,
  getAllImagesFromUserInCollection,
} from "../common/APIUtils";
import CreateImage from "./CreateImage";
import Image from "./Image";

export class ShowCollection extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      collection: [],
      collectionName: "",
      file: {},
      fileid: "",
      success: "",
      isauthenticated: this.props.isauthenticated,
      currentuser: this.props.currentuser,
      photo: "",
      myImages: [],
      user: null,
    };
  }
  componentDidMount() {
    let bool = this.state.isauthenticated;
    if (bool) {
      console.log("authed");
    } else {
      this.props.history.push("/");
    }
    const {
      match: { params },
    } = this.props;
    getUserCollectionByCollectionId(params.id).then((response) => {
      let collection = response;
      console.log(response);
      this.setState({
        collection: collection,
        fileid: collection.collectionImage.id,
        file: collection.collectionImage,
        user: collection.user,
        userId: collection.user.id,
      });
      console.log(collection.user.id);
    });
    getAllImagesFromUserInCollection(params.id).then((response) => {
      let images = response;
      this.setState({
        myImages: images,
      });
    });
  }
  componentDidUpdate() {}
  render() {
    const {
      match: { params },
    } = this.props;
    let collection = this.state.collection;
    let images = this.state.myImages;

    return (
      <div>
        <p style={{ margin: "0" }}>{collection.collectionname}</p>
        <CreateImage
          collectionId={params.id}
          isauthenticated={this.state.isauthenticated}
          currentuser={this.state.currentuser}
          {...this.props}
        ></CreateImage>
        <hr />
        <div className="image-container">
          {images.map((item, i) => (
            <Image
              key={i}
              image={item}
              isauthenticated={this.state.isauthenticated}
              currentuser={this.state.currentuser}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ShowCollection;
// key={i}
// to={`/collections/all/${item.id}`}
// params={{ id: item.id }}
// collection={item}
// collectionname={item.collectionname}
// {...this.props}
