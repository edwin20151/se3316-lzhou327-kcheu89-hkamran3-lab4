import React, { useEffect, useState } from "react";
import { Switch, Route, Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import PreLogon from "./components/preLogon";
import PostLogon from "./components/postLogon";
import SignUp from "./components/signUp";
import Login from "./components/login";
import ChangePassword from "./components/changePassword";
import Welcome from "./components/welcome";
import Search from "./components/search";
import Admin from "./components/admin";

function App() {
  const [user, setUser] = useState();
  let location = useLocation();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/Homepage" className="navbar-brand">
          Homepage
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            {user ? (
              <Link
                to={"/postlogon"}
                className="nav-link"
                style={{ cursor: "pointer" }}
              >
                Private Playlist
              </Link>
            ) : null}
          </li>
          <li className="nav-item">
            <Link to={"/search"} className="nav-link">
              Search
            </Link>
          </li>
          <li className="nav-item">
            {user ? null : (
              <Link to={"/signup"} className="nav-link">
                Sign Up
              </Link>
            )}
          </li>
          <li className="nav-item">
            {user ? (
              <Link
                to={"/Homepage"}
                onClick={handleLogout}
                className="nav-link"
                style={{ cursor: "pointer" }}
              >
                Logout
              </Link>
            ) : (
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            )}
          </li>
          <li className="nav-item">
            {user && !user.isGoogleSign ? (
              <Link to={"/password"} className="nav-link">
                Change Password
              </Link>
            ) : null}
          </li>
          <li className="nav-item">
            {user && user.isAdmin ? (
              <Link to={"/admin"} className="nav-link">
                Admin
              </Link>
            ) : null}
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/Homepage"]} component={PreLogon} />
          <Route
            path="/Homepage/:id"
            render={(props) => <PostLogon {...props} user={user} />}
          />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/search" component={Search} />
          <Route path="/password" component={ChangePassword} />
          <Route path="/admin" component={Admin} />
          <Route path="/postlogon" component={PostLogon} />
          <Route path="/confirm/:confirmationCode" component={Welcome} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
