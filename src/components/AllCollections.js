import React, { Component } from "react";
import { getUserCollectionByCollectionId } from "../common/APIUtils";
import { getAllCollectionsFromUser } from "../common/APIUtils";
import { Link } from "react-router-dom";
import SockJsClient from "react-stomp";

export class AllCollections extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
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
      console.log("here ", response);
      this.setState({
        collections: response,
      });
    });
    // console.log(this.props.collectionname);
    // const {
    //   match: { params },
    // } = this.props;
    // console.log(params.id);
    // getUserCollectionByCollectionId(params.id).then((response) => {
    //   console.log(response);
    //   this.setState({
    //     collections: response,
    //   });
    // });
  }
  componentDidUpdate() {}
  render() {
    return (
      <div>
        {this.state.collections.map((item, i) => (
          <div>
            <Link
              key={i}
              to={`/collections/all/${item.id}`}
              params={{ id: item.id }}
              collection={item}
              collectionname={item.collectionname}
              {...this.props}
            >
              <p key={i}> {item.collectionname}</p>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default AllCollections;
