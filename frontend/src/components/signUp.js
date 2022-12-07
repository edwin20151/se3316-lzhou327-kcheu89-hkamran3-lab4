import React, { Component } from "react";
import "../styles/login.css";
import jwt_decode from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }

  createAccount() {
    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("http://localhost:5500/account", user)
      .then((res) => {
        if (res.status === 200) {
          console.log("Signed Up successfully");
          document.getElementById("list").innerText =
            "User was registered successfully! Please check your email";
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          document.getElementById("list").innerText =
            "This email has been registered.";
        } else {
          document.getElementById("list").innerText =
            "Unkown error, please try again.";
        }
      });

    this.setState({
      username: "",
      password: "",
      email: "",
    });
  }

  onGoogleSignInSuccess = (response) => {
    //TODO: Create special handling for google signin
    var userObject = jwt_decode(response.credential);
    this.setState(
      {
        username: userObject.name,
        email: userObject.email,
      },
      () => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: this.state.username,
            email: this.state.email,
            isAdmin: false,
            isGoogleSign: true,
          })
        );
        this.props.history.push("/postlogon");
      }
    );
  };

  onGoogleSignInFailure(response) {
    console.log("Google sign in failed.");
    console.log(response);
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    document.getElementById("list").innerText = "";
    if (this.state.email === "") {
      document.getElementById("list").innerText = "Please enter your email\n";
    }
    if (this.state.username === "") {
      document.getElementById("list").innerText +=
        "Please enter your username\n";
    }
    if (this.state.password === "") {
      document.getElementById("list").innerText +=
        "Please enter your password\n";
    }
    if (
      this.state.email !== "" &&
      this.state.username !== "" &&
      this.state.password !== ""
    ) {
      this.createAccount();
    }
  }

  render() {
    return (
      <div id="background" className="backgroundContainer">
        <div id="form" className="formContainer">
          <h1 id="login">Sign Up</h1>
          <form onSubmit={this.onSubmit}>
            <div id="loginpage" className="login">
              <input
                type="email"
                name="email"
                id="email-f"
                className="email-f-input"
                placeholder="email"
                value={this.state.email}
                onChange={this.onChangeEmail}
              />
              <input
                type="text"
                name="username"
                id="user-f"
                className="user-f-input"
                placeholder="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
              />
              <input
                type="password"
                name="password"
                id="password-f"
                className="user-f-input"
                placeholder="password"
                value={this.state.password}
                onChange={this.onChangePassword}
              />
              <div className="buttonContainer">
                <input
                  type="submit"
                  value="Create Account"
                  className="btn btn-primary"
                />
              </div>
            </div>
          </form>

          <GoogleOAuthProvider clientId="992474330307-q6fbvdctbnjogjm54rp71jhvmq9j7a8i.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={this.onGoogleSignInSuccess}
              onError={this.onGoogleSignInFailure}
            />
          </GoogleOAuthProvider>
          <ol id="list"></ol>
        </div>
      </div>
    );
  }
}
