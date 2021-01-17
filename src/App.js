import "./App.css";
import "./App.scss";
import React, { Component } from "react";
import { getcurrentuser, getAllImages } from "./common/APIUtils";
import { ACCESS_TOKEN } from "./common/constants";
import AppHeader from "./common/AppHeader";
import { Switch, Route, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import Collections from "./components/Collections";
import ShowCollection from "./components/ShowCollection";
import AllCollections from "./components/AllCollections";
import CreateImage from "./components/CreateImage";
import Image from "./components/Image";
import { Link } from "react-router-dom";
import { ImageComponent } from "./components/ImageComponent";
import Overview from "./components/Overview";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentuser: null,
      isauthenticated: false,
      images: [],
    };
  }
  loadcurrentuser = () => {
    getcurrentuser().then((response) => {
      console.log(response);
      this.setState({
        currentuser: response,
        isauthenticated: true,
      });
    });
  };

  componentDidMount() {
    this.loadcurrentuser();
    this.getAllImagesIfSignedIn();
    console.log(this.currentuser, this.isauthenticated);
  }

  getAllImagesIfSignedIn() {
    getAllImages().then((response) => {
      this.setState({
        images: response,
      });
      console.log(response);
    });
  }

  handleLogout = () => {
    sessionStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentuser: null,
      isauthenticated: false,
    });

    this.props.history.push("/");
  };

  handleLogin = () => {
    this.loadcurrentuser();
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="App">
        <AppHeader
          isauthenticated={this.state.isauthenticated}
          currentuser={this.state.currentuser}
          onLogout={this.handleLogout}
        />
        <div className="app-content">
          <ToastContainer autoClose={1500} />
          <div id="container-layout">
            <Switch>
              <Route
                exact
                path="/"
                isauthenticated={this.state.isauthenticated}
                currentuser={this.state.currentuser}
                handleLogout={this.handleLogout}
                {...this.props}
              ></Route>
              <Route
                path="/login"
                render={(props) => (
                  <Login onLogin={this.handleLogin} {...props} />
                )}
              ></Route>
              <Route path="/signup" component={Signup}></Route>
              <Route
                path="/users/:username"
                render={(props) => (
                  <Profile
                    isauthenticated={this.state.isauthenticated}
                    currentuser={this.state.currentuser}
                    {...props}
                  />
                )}
              ></Route>
              <Route
                exact
                path="/collections/all/:id"
                render={(props) => (
                  <ShowCollection
                    {...props}
                    isauthenticated={this.state.isauthenticated}
                    currentuser={this.state.currentuser}
                  />
                )}
              />
              <Route
                exact
                path="/collections/all/:id/images"
                render={(props) => (
                  <CreateImage
                    {...props}
                    isauthenticated={this.state.isauthenticated}
                    currentuser={this.state.currentuser}
                  />
                )}
              />
              <Route
                exact
                path="/collections/images/:id"
                render={(props) => (
                  <ImageComponent
                    {...props}
                    isauthenticated={this.state.isauthenticated}
                    currentuser={this.state.currentuser}
                  />
                )}
              ></Route>
              <Route
                exact
                path="/collections"
                render={({ staticContext, ...props }) => (
                  <Collections
                    {...props}
                    isauthenticated={this.state.isauthenticated}
                    currentuser={this.state.currentuser}
                  />
                )}
              />
              <Route
                exact
                path="/collections/all"
                render={(props) => (
                  <AllCollections
                    {...props}
                    isauthenticated={this.state.isauthenticated}
                    currentuser={this.state.currentuser}
                  />
                )}
              />
              <Route
                exact
                path="/images"
                render={(props) => (
                  <Overview
                    {...props}
                    isauthenticated={this.state.isauthenticated}
                    currentuser={this.state.currentuser}
                  />
                )}
              />
              <Route component={NotFound}></Route>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
