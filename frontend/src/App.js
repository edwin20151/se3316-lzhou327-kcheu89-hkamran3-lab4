import React from "react";
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
  }

  return (
    <div>
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
      </div>
    </div>
  );
}
export default App;
