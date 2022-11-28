import React, { Component } from "react";
import "../styles/login.css";
import axios from "axios";

export default class Login extends Component {
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
      isAdmin: false,
    };
  }
  login() {
    console.log(this.checkAdmin(this.state.email));
    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post("http://localhost:5500/account/login", user)
      .then((res) => {
        if (res.status === 200) {
          console.log(this.state.isAdmin);
          console.log("Signed in successfully");
          localStorage.setItem(
            "user",
            JSON.stringify({
              username: this.state.username,
              email: this.state.email,
              isAdmin: this.state.isAdmin,
            })
          );
          this.props.history.push("/postlogon");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          console.log("Error: ", err.response.status);
          document.getElementById("list").innerText = err.response.data;
        } else {
          console.log("Error: ", err.response.status);
          document.getElementById("list").innerText =
            "Wrong password / usernames";
        }
      });
  }

  checkAdmin(email) {
    axios
      .get("http://localhost:5500/account/" + email)
      .then((res) => {
        console.log(res.data.user[0].isAdmin);
        if (res.status === 200) {
          this.setState({
            isAdmin: res.data.user[0].isAdmin,
          });
        } else {
          console.log("Unknown Error");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          console.log("Error: ", err.response.status);
        }
      });
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
      this.login();
    }
  }

  render() {
    return (
      <div id="background" className="backgroundContainer">
        <div id="form" className="formContainer">
          <h1 id="login">Login </h1>
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
                  value="login"
                  className="btn btn-primary"
                />
              </div>
            </div>
          </form>
          <ol id="list"></ol>
        </div>
      </div>
    );
  }
}
