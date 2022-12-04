import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5500/reviews/");
      if (!res.error) {
        console.log(res.data);
        setReviews(res.data);
      } else {
        console.log(res);
      }
    };
    fetchData().catch(console.error);
  });

  const changeReviewStatus = async (review, isHidden) => {
    try {
      const res = await axios.patch("http://localhost:5500/reviews/status/", {
        listName: review.listName,
        userEmail: review.userEmail,
        isHidden: isHidden,
      });
      if (!res.error) {
        window.location.reload();
      } else {
        console.log(res.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
        <a href="/admin" className="btn btn-danger my-2">
          Reload Data
        </a>
        <h1> Users </h1>
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
                        Inactive{" "}
                        <button onClick={() => changeUserStatus(user, true)}>
                          Activate
                        </button>
                      </td>
                    )}
                    {user.isAdmin ? (
                      <td> Y </td>
                    ) : (
                      <td>
                        N {"  "}
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
        <div>
          <h1> Reviews </h1>
          <p>
            Your Total Reviews: <strong>{reviews.length}</strong>
          </p>
          <table className="table table-hover">
            <thead>
              <tr className="table-dark">
                <th scope="col">List Name</th>
                <th scope="col">User Email</th>
                <th scope="col">Message</th>
                <th scope="col">Rating</th>
                <th scope="col">Hidden?</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr>
                  <th scope="row">{review.listName}</th>
                  <td>{review.userEmail}</td>
                  <td>{review.message}</td>
                  <td>{review.rating}</td>
                  {review.isHidden ? (
                    <td>
                      Hidden{"  "}
                      <button onClick={() => changeReviewStatus(review, false)}>
                        Show it
                      </button>
                    </td>
                  ) : (
                    <td>
                      Showing{"  "}
                      <button onClick={() => changeReviewStatus(review, true)}>
                        Hide it
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Admin;
