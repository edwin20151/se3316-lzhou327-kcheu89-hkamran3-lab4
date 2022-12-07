//TODO

import React, { Component } from "react";
import "../styles/login.css";
import axios from "axios";

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }
  changePassword() {
    if (this.state.password !== this.state.confirmPassword) {
      document.getElementById("list").innerText =
        "Password and Confirm Password doesn't match.";
      this.setState({
        password: "",
        confirmPassword: "",
      });
      return;
    }

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    this.setState(
      {
        username: loggedInUser.username,
        email: loggedInUser.email,
      },
      () => {
        const user = {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        };
        axios
          .patch("http://localhost:5500/account/" + user.email, user)
          .then((res) => {
            if (res.status === 200) {
              document.getElementById("list").innerText =
                "Updated your password successfully";
            }
          })
          .catch((err) => {
            console.log(err);
            console.log("Error: ", err.response.status);
            document.getElementById("list").innerText =
              "please contact the site administrator";
          });
      }
    );
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeConfirmPassword(e) {
    this.setState({
      confirmPassword: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    document.getElementById("list").innerText = "";
    if (this.state.password === "") {
      document.getElementById("list").innerText +=
        "Please enter your new password\n";
    }
    if (this.state.confirmPassword === "") {
      document.getElementById("list").innerText +=
        "Please enter your confirm password\n";
    }
    if (this.state.password !== "" && this.state.confirmPassword !== "") {
      this.changePassword();
    }
  }

  render() {
    return (
      <div id="background" className="backgroundContainer">
        <div id="form" className="formContainer">
          <h1 id="login">Change Password </h1>
          <form onSubmit={this.onSubmit}>
            <div id="loginpage" className="login">
              <input
                type="password"
                name="password"
                id="password-f"
                className="user-f-input"
                placeholder="New Password"
                value={this.state.password}
                onChange={this.onChangePassword}
              />
              <input
                type="password"
                name="password-confirm"
                id="password-confirm"
                className="user-f-input"
                placeholder="Confirm New Password"
                value={this.state.confirmPassword}
                onChange={this.onChangeConfirmPassword}
              />
              <div className="buttonContainer">
                <input
                  type="submit"
                  value="Submit"
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
