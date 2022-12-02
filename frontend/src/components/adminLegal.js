
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminLegal = () => {
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
  return (
    <>
      <h1> Admin: Legal </h1>
    </>
  );
};

export default AdminLegal;