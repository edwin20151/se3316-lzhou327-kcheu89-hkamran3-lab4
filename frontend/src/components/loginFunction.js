import axios from 'axios';


document.getElementById("loginButton").addEventListener("click", login);
document.getElementById("signupButton").addEventListener("click", signup);
document.getElementById("changepasswordButton").addEventListener("click", changePassword);
function login() {
  const newlist = {
    username: document.getElementById("user-f").value,
    password: document.getElementById("password-f").value,
    email: document.getElementById("email-f").value,
  };
  fetch("/account/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(newlist),
  })
    .then((res) => {
      if (res.ok) {
        res.json();

        console.log("ok");
        document.getElementById("list").innerText = "sucess";
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

function signup() {
  const newlist = {
    username: document.getElementById("user-f").value,
    password: document.getElementById("password-f").value,
    email: document.getElementById("email-f").value,
    account : "true"
  };
  fetch("/account", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(newlist),
  })
    .then((res) => {
      if (res.ok) {
        res.json();

        console.log("ok");
        document.getElementById("list").innerText = "sucess create";
      } else if(res.status == 404){
          console.log("exsit username");
          document.getElementById("list").innerText = "exsit username";
      }
      else{
        document.getElementById("list").innerText = "error";
      }
    }
)}

function changePassword() {

    const username = document.getElementById("user-f").value

    const newlist = {
     password :  document.getElementById("password-f").value,
    email  : document.getElementById("email-f").value
    }

  

  fetch("/account/"+username, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(newlist),
  })
    .then((res) => {
      if (res.ok) {
        res.json();

        console.log("ok");
        document.getElementById("list").innerText = "sucess change";
      } else 
      document.getElementById("list").innerText = "no username / email";
        
    }
)}