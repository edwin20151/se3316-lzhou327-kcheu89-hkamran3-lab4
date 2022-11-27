import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [userStatus, setUserStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5500/account/");
      const result = await res.json();
      console.log(result);
      if (!result.error) {
        setUsers(result.users);
      } else {
        console.log(result);
      }
    };
    fetchData().catch(console.error);
  }, []);

  const changeeUserStatus = async (email) => {
    try {
      let user = {};
      const res = await axios.patch(
        "http://localhost:5500/account/status" + email,
        user
      );
      const result = await res.json();
      if (!result.error) {
      } else {
        console.log(result.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return <></>;
};

export default Admin;
