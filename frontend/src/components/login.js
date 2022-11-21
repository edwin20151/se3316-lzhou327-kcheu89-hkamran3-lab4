import React from "react";
import "../styles/login.css";
import jwt_decode from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

function onGoogleSignInSuccess(response) {
  var userObject = jwt_decode(response.credential);
  console.log(userObject);

  // Set user state
  // setUser(userObject);

  const userlist = {
    username: userObject.name,
    email: userObject.email,
  };

  // Send user data to backend
  fetch("/account/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(userlist),
  })
    .then((res) => {
      if (res.ok) {
        res.json();
        console.log("Sent google data to backend");
      } else {
        console.log("Error: ", res.status);
        document.getElementById("list").innerText =
          "Please contact the site administrator";
      }
    })
    .catch();
}

function onGoogleSignInFailure(response) {
  console.log("Google sign in failed.");
  console.log(response);
}

function Login() {
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
        <GoogleOAuthProvider clientId="992474330307-q6fbvdctbnjogjm54rp71jhvmq9j7a8i.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={onGoogleSignInSuccess}
            onError={onGoogleSignInFailure}
          />
        </GoogleOAuthProvider>
        <script src="../external_auth.js"></script>
        <script defer src="lab4.js"></script>
      </div>
    </div>
  );
}

export default Login;
