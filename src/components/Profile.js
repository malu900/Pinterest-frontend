import React, { Component } from "react";
import { getUserProfile } from "../common/APIUtils";
import { toast } from "react-toastify";
import { Tabs, Tab } from "react-bootstrap";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  loadUserProfile = (username) => {
    getUserProfile(username)
      .then((response) => {
        this.setState({
          user: response,
        });
      })
      .catch((error) => {
        if (error.status === 401) {
          toast.error("Not authorized");
        } else {
          toast.error("Something went wrong! :(");
        }
      });
  };

  componentDidMount() {
    const username = this.props.match.params.username;
    this.loadUserProfile(username);
  }
  render() {
    return (
      <div className="profile">
        {this.state.user ? (
          <div className="user-profile">
            <div className="user-details">
              <div className="user-avatar"></div>
              <div className="user-summary">
                <div className="full-name">{this.state.user.name}</div>
                <div className="username">@{this.state.user.username}</div>
              </div>
            </div>
            <div>
              <hr />
              <div>
                <Tabs
                  defaultActiveKey="home"
                  transition={false}
                  id="noanim-tab-example"
                >
                  <Tab eventKey="profile" title="Saved directions"></Tab>
                </Tabs>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
