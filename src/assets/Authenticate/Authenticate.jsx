import React from 'react';
import { useState } from 'react';

function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");

  const handleClick = async () => {
    try {
      console.log("clicked");
      const result = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await result.json();
      setSuccessMessage(json.message);
      setUsername(json.data.username);
      console.log(json);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Authenticate Below</h2>
      {successMessage && <p>`Hi, {username}, you have been {successMessage}`</p>}
      {error && <p>{error}</p>}
      <button onClick={handleClick}>Authenticate</button>
    </div>
  );
}

export default Authenticate;
