import React, { useState } from "react";

const AuthComponent = ({ authorize }) => {
  const [token, setToken] = useState(
    "7GbRyUeDVshRJhe7_G7J4LqtwRSwq_5mnaTDldyEjnp1oQZNaPukdPQD5fhXsTGTN_dAZoppXhhQHbvTe"
  );

  const handleOnChange = (event) => {
    setToken(event.target.value);
  };

  const handleAuthorize = () => {
    authorize(token);
  };

  return (
    <>
      <input type="text" value={token} onChange={handleOnChange}></input>
      <button value="authorize" onClick={handleAuthorize}>
        authorize
      </button>
    </>
  );
};

export default AuthComponent;
