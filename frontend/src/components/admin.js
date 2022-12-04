

import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5500/account/");
      if (!res.error) {
        setUsers(res.data);
      } else {
        console.log(res);
      }
    };
    fetchData().catch(console.error);
  }, []);

  const changeUserStatus = async (user, isActivated) => {
    try {
      const res = await axios.patch(
        "http://localhost:5500/account/status/" + user.email,
        { isActivated: isActivated }
      );
      if (!res.error) {
        window.location.reload();
      } else {
        console.log(res.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const grantAdmin = async (user) => {
    try {
      const res = await axios.patch(
        "http://localhost:5500/account/admin/" + user.email
      );
      console.log(res);
      if (!res.error) {
        window.location.reload();
      } else {
        console.log(res.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <h1> Users </h1>
        <a href="/admin" className="btn btn-danger my-2">
          Reload Users
        </a>
        {users.length === 0 ? (
          <h3>No user created yet</h3>
        ) : (
          <div>
            <p>
              Your Total Users: <strong>{users.length}</strong>
            </p>
            <table className="table table-hover">
              <thead>
                <tr className="table-dark">
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Account Status</th>
                  <th scope="col">Admin?</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.email}>
                    <th scope="row">{user.username}</th>
                    <td>{user.email}</td>
                    {user.account ? (
                      <td>
                        Active{" "}
                        <button onClick={() => changeUserStatus(user, false)}>
                          Deactivate
                        </button>
                      </td>
                    ) : (
                      <td>
                        Inactive
                        <button onClick={() => changeUserStatus(user, true)}>
                          Activate
                        </button>
                      </td>
                    )}
                    {user.isAdmin ? (
                      <td> Y </td>
                    ) : (
                      <td>
                        {" "}
                        N
                        <button onClick={() => grantAdmin(user)}>
                          Grant Admin
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Admin;