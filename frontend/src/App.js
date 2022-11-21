import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/add-review";
import Restaurant from "./components/restaurant";
import RestaurantsList from "./components/restaurants-list";
import Account from "./components/account";

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
            {user ? (
              <a
                onClick={logout}
                className="nav-link"
                style={{ cursor: "pointer" }}
              >
                Logout {user.name}
              </a>
            ) : (
              <Link to={"/account"} className="nav-link">
                Account
              </Link>
            )}
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
          <Route path="/account" component={Account} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
