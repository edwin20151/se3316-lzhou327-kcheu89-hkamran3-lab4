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
        document.getElementById("list").innerText = "sucess";
      } else 
          "something username";
    }
)}

/*function changePassword() {

    const username = document.getElementById("user-f").value,
    const password =  document.getElementById("password-f").value,
    const email = document.getElementById("email-f").value,

  fetch("/", {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(newlist),
  }
    .then((res) => {
      if (res.ok) {
        res.json();

        console.log("ok");
        document.getElementById("list").innerText = "sucess";
      } else 
          "something username";
    }
))}*/


