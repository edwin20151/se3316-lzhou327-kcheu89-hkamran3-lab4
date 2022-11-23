//TODO

import React, { Component } from "react";
import "../styles/login.css";
import axios from "axios";

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      password: "",
    };
  }
  login() {
    const pw = {
      password: this.state.password,
    };

    axios
      .patch("http://localhost:5500/account/", pw)
      .then((res) => {
        if (res.ok) {
          res.json();
          console.log("ok");
          document.getElementById("list").innerText = "success";
        } else if (res.status === 401) {
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

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.login();
  }

  render() {
    return (
      <div id="background" className="backgroundContainer">
        <div id="form" className="formContainer">
          <h1 id="login">Login </h1>
          <form onSubmit={this.onSubmit}>
            <div id="loginpage" class="login">
              <input
                type="password"
                name="password"
                id="password-f"
                class="user-f-input"
                placeholder="New Password"
                value={this.state.password}
                onChange={this.onChangePassword}
              />
              <input
                type="password"
                name="password"
                id="password-f"
                class="user-f-input"
                placeholder="Confirm New Password"
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
