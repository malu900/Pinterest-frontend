import React, { Component } from "react";
import { getUserCollectionByCollectionId, getImage } from "../common/APIUtils";

export class ShowCollection extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
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
    };
  }
  componentDidMount() {
    console.log(this.props.collectionname);
    const {
      match: { params },
    } = this.props;
    console.log(params.id);
    getUserCollectionByCollectionId(params.id).then((response) => {
      let collection = response;
      console.log(response);
      this.setState({
        collection: collection,
        fileid: collection.collectionImage.id,
        file: collection.collectionImage,
      });
    });
  }
  componentDidUpdate() {}
  render() {
    let collection = this.state.collection;
    return (
      <div>
        <p style={{ margin: "0" }}>{collection.collectionname}</p>
      </div>
    );
  }
}

export default ShowCollection;
