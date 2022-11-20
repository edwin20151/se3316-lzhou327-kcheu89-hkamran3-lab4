import React, { Component } from "react";
import "../styles/login.css";

class Login extends Component {
  render() {
    return (
      <div id="background" className="backgroundContainer">
        <div id="form" className="formContainer">
          <h1 id="login">Login / Signup</h1>

          <div id="login-error-msg">
            <p id="login-error">
              Wrong Username <span id="error-msg">or password</span>
            </p>
          </div>

          <div id="loginpage" class="login">
            <input
              type="email"
              name="email"
              id="email-f"
              class="email-f-input"
              placeholder="email"
            />
            <input
              type="text"
              name="username"
              id="user-f"
              class="user-f-input"
              placeholder="username"
            />
            <input
              type="password"
              name="password"
              id="password-f"
              class="user-f-input"
              placeholder="password"
            />
            <div class="buttonContainer">
              <button id="loginButton" class="searchButton">
                Login
              </button>
              <button id="signupButton" class="searchButton">
                Sign up
              </button>
              <button id="changepasswordButton" class="searchButton">
                Change Password
              </button>
            </div>
          </div>
          <div
            id="g_id_onload"
            data-client_id="992474330307-q6fbvdctbnjogjm54rp71jhvmq9j7a8i.apps.googleusercontent.com"
            data-callback="handleCredentialResponse"
          ></div>
          <div class="g_id_signin" data-type="standard"></div>
          <div id="errors">
            <ol id="list"></ol>
          </div>
          <script
            src="https://accounts.google.com/gsi/client"
            async
            defer
          ></script>
          <script src="../external_auth.js"></script>
          <script defer src="lab4.js"></script>
        </div>
      </div>
    );
  }
}

export default Login;
