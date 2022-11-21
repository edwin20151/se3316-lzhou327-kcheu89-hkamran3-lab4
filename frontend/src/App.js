import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/add-review";
import Restaurant from "./components/restaurant";
import RestaurantsList from "./components/restaurants-list";
import SignUp from "./components/signUp";
import Login from "./components/login";
import ChangePassword from "./components/changePassword";

function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/Homepage" className="navbar-brand">
          Homepage
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/Homepage/aboutus"} className="nav-link">
              about
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/signup"} className="nav-link">
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            {user ? (
              <button
                onClick={logout}
                className="nav-link"
                style={{ cursor: "pointer" }}
              >
                Logout
              </button>
            ) : (
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            )}
          </li>
          <li className="nav-item">
            {user ? (
              <Link to={"/password"} className="nav-link">
                Change Password
              </Link>
            ) : null}
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/Homepage"]} component={RestaurantsList} />
          <Route
            path="/Homepage/aboutus"
            render={(props) => <AddReview {...props} user={user} />}
          />
          <Route
            path="/Homepage/:id"
            render={(props) => <Restaurant {...props} user={user} />}
          />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/password" component={ChangePassword} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
