import logo from "./logo.svg";
import "./App.css";

import AuthComponent from "./auth/authComponent";
import { useReducer, useEffect } from "react";
import TeamsApi from "teams-api";

const initialState = {
  authorized: false,
  user: null,
  authorizeError: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USER_DATA_SUCCESS":
      return {
        ...state,
        authorized: true,
        user: action.payload,
      };
    case "FETCH_USER_DATA_FAILURE":
      return {
        ...state,
        authorized: false,
        user: null,
        authorizeError: true,
      };
  }
};

function App() {
  let client = null;

  const [state, dispatch] = useReducer(reducer, initialState);

  const authorize = async (accessToken) => {
    try {
      client = new TeamsApi(accessToken);

      const response = await client.getLoggedUserData();

      console.log(response.data);
      dispatch({
        type: "FETCH_USER_DATA_SUCCESS",
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: "FETCH_USER_DATA_FAILURE",
      });
      console.error(err);
    }
  };

  const { user } = state;

  return (
    <div className="App">
      {!user && <AuthComponent {...{ authorize }} />}

      {user && <span>Hello {user.name}</span>}
    </div>
  );
}

export default App;
