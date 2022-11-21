import React, { Component } from "react";
import "../styles/login.css";
import jwt_decode from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

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








axios.post("http://localhost:5500/account/login", )
.then()

export default class Login extends Component{

  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    })
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    })
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    })
  }

  

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }

    axios.post('http://localhost:5500/account', user)
      .then((res) => {
        if (res.ok) {
          
          res.json();
  
          console.log("ok");
          
        } else {
            console.log("exsit username");
      
        }
        
      })

    this.setState({
      username: '',
      password: " ",
      email: ""
    })
  }



  render() {
  return (
    
    <div id="background" className="backgroundContainer">
      <div id="form" className="formContainer">
        <h1 id="login">Login / Signup</h1>
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
           
            <input type="submit" value="Create User" className="btn btn-primary" />
            
          </div>
          </div>
        
        </form>
            
        <GoogleOAuthProvider clientId="992474330307-q6fbvdctbnjogjm54rp71jhvmq9j7a8i.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={onGoogleSignInSuccess}
            onError={onGoogleSignInFailure}
          />
        </GoogleOAuthProvider>
        
        
      </div>
    </div>
  );
  }
}
  
