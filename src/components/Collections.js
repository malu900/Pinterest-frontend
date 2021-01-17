import React, { Component } from "react";
import { getAllCollectionsFromUser } from "../common/APIUtils";
import Collection from "./Collection";
import ShowCollection from "./ShowCollection";
import { Link } from "react-router-dom";

export class Collections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      displaycollections: [],
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
      <div>
        <Collection
          key={1}
          isauthenticated={this.state.isauthenticated}
          currentuser={this.state.currentuser}
          {...this.props}
        ></Collection>
      </div>
    );
  }
}

export default Collections;
