import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/legal.css";

const Legal = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5500/policies/");
      if (!res.error) {
        setPolicies(res.data.policies);
        console.log(res.data.policies);
      } else {
        console.log(res);
      }
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <>
      {policies.map((policy) => (
        <div id="resultContainer">
          <h1>{policy.document}</h1>
          <span className="policy">{policy.content}</span>
          <br></br>
        </div>
      ))}
    </>
  );
};

export default Legal;
