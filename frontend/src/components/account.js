import React, { Component } from "react";
import "../styles/login.css";
import jwt_decode from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default class Account extends Component {
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
    console.log(user);
    axios.post("http://localhost:5500/account", user).then((res) => {
      if (res.ok) {
        res.json();
        console.log("ok");
      } else {
        console.log("username existed");
      }
    });

    this.setState({
      username: "",
      password: " ",
      email: "",
    });
  }
  login() {
    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("http://localhost:5500/account/login", user)
      .then((res) => {
        if (res.ok) {
          res.json();
          console.log("ok");
          document.getElementById("list").innerText = "success";
        } else if (res.status == 401) {
          console.log("Error: ", res.status);
          document.getElementById("list").innerText =
            "please contact the site administrator";
        } else {
          console.log("Error: ", res.status);
          document.getElementById("list").innerText =
            "Wrong password / usernames";
        }
      })
      .catch();
  }

  onGoogleSignInSuccess = (response) => {
    var userObject = jwt_decode(response.credential);
    console.log(userObject);

    // Set user state
    // setUser(userObject);
    this.setState({
      username: userObject.name,
      email: userObject.email,
      password: "000",
    });
    this.createAccount();
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
    if (e.target.value == "signUp") {
      this.createAccount();
    } else if (e.target.value == "login") {
      this.login();
    }
  }

  render() {
    return (
      <div id="background" className="backgroundContainer">
        <div id="form" className="formContainer">
          <h1 id="login">Login / Sign Up</h1>
          <form onSubmit={this.onSubmit}>
            <div id="loginpage" class="login">
              <input
                type="email"
                name="email"
                id="email-f"
                class="email-f-input"
                placeholder="email"
                value={this.state.email}
                onChange={this.onChangeEmail}
              />
              <input
                type="text"
                name="username"
                id="user-f"
                class="user-f-input"
                placeholder="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
              />
              <input
                type="password"
                name="password"
                id="password-f"
                class="user-f-input"
                placeholder="password"
                value={this.state.password}
                onChange={this.onChangePassword}
              />
              <div class="buttonContainer">
                <input
                  type="submit"
                  value="signUp"
                  className="btn btn-primary"
                />
              </div>
              <div class="buttonContainer">
                <input
                  type="submit"
                  value="login"
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