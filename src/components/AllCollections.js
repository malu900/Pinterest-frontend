import React, { Component } from "react";
import { getUserCollectionByCollectionId } from "../common/APIUtils";
import { getAllCollectionsFromUser } from "../common/APIUtils";
import { Link } from "react-router-dom";
import SockJsClient from "react-stomp";

export class AllCollections extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      collections: [],
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
    getAllCollectionsFromUser().then((response) => {
      this.setState({
        collections: response,
      });
    });
  }
  render() {
    return (
      <div className="pinterest-layout-container">
        {this.state.collections.map((item, i) => (
          <Link
            key={i}
            to={`/collections/all/${item.id}`}
            params={{ id: item.id }}
            collection={item}
            collectionname={item.collectionname}
            {...this.props}
          >
            <div className="pinterest-layout-container-item">
              <img src={item.collectionImage.photoBase64} />
              <p key={i}> {item.collectionname}</p>
            </div>
          </Link>
        ))}
      </div>
    );
  }
}

export default AllCollections;
