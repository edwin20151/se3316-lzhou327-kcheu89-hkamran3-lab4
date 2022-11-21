import React from "react";
<<<<<<< HEAD
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/add-review";
import Restaurant from "./components/restaurant";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";

function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null)
=======
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/login";
import "./styles/app.css";

function App() {
  const [isUser, setUser] = React.useState(null);

  async function login() {
    setUser(1);
  }

  async function logout() {
    setUser(null);
>>>>>>> a300bd2957ff8c65f07d49bddf1360f628447c3d
  }

  return (
    <div>
<<<<<<< HEAD
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
          <li className="nav-item" >
            { user ? (
              <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                Logout {user.name}
              </a>
            ) : (            
            <Link to={"/login"} className="nav-link">
              Login
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
            render={(props) => (
              <AddReview {...props} user={user} />
            )}
          />
          <Route 
            path="/Homepage/:id"
            render={(props) => (
              <Restaurant {...props} user={user} />
            )}
          />
          <Route path="/login" component={Login} />
        </Switch>
=======
      <nav className="navbar">
        <div className="navbar-nav">
          <div className="nav-item">
            {isUser ? (
              <button onClick={logout} className="nav-link">
                Logout
              </button>
            ) : (
              <Link to={"/login"} className="nav-link" onClick={login}>
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
>>>>>>> a300bd2957ff8c65f07d49bddf1360f628447c3d
      </div>
    </div>
  );
}
<<<<<<< HEAD

=======
>>>>>>> a300bd2957ff8c65f07d49bddf1360f628447c3d
export default App;
