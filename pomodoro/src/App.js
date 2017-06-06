import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { pomodoro } from "./firebase-config";
import { Button, Layout } from "antd";
import * as firebase from "firebase";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Page from "./Page";
import Timer from "./Timer";

const { Header, Footer, Sider, Content } = Layout;

var provider = new firebase.auth.GoogleAuthProvider();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logInState: true
    };
  }

  handleLogInButton(logInState) {
    if (this.state.logInState) {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          this.setState({
            username: result.user.displayName,
            emailVerified: result.user.emailVerified,
            logInState: !this.state.logInState,
            userID: result.user.uid
          });
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;

          // ...
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    } else {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.setState({
            username: "",
            emailVerified: false,
            logInState: !this.state.logInState
          });

          window.location = "/";
        })
        .catch(function(error) {
          // An error happened.
        });
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div className="header">
            <AppBar
              title="Pomodoro Timer"
              iconClassNameRight="muidocs-icon-navigation-expand-more"
              showMenuIconButton={false}
              iconElementRight={
                <button
                  className="button"
                  type="primary"
                  onClick={() => this.handleLogInButton(this.state.logInState)}
                >
                  {this.state.logInState && <div>Log In</div>}
                  {!this.state.logInState && <div>Log Out</div>}
                </button>
              }
              style={{
                backgroundColor: "black"
              }}
            />
          </div>
          {" "}
          {!this.state.logInState && <Page userID={this.state.username} />}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
