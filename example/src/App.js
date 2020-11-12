import AuthComponent from "./auth/auth-component";
import { useReducer } from "react";
import TeamsApi from "teams-api";

import "./App.css";
import ProjectList from "./project-list/project-list";

const initialState = {
  authorized: false,
  user: null,
  authorizeError: false,

  projects: null,
  selectedProjectId: null,
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
    case "FETCH_PROJECTS_SUCCESS":
      const projects = action.payload;
      console.log(projects);
      return {
        ...state,
        projects,
        selectedProjectId: projects[0].id,
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

      dispatch({
        type: "FETCH_USER_DATA_SUCCESS",
        payload: response.data,
      });

      const projectsResponse = await client.getAllProjects();

      dispatch({
        type: "FETCH_PROJECTS_SUCCESS",
        payload: projectsResponse,
      });
    } catch (err) {
      dispatch({
        type: "FETCH_USER_DATA_FAILURE",
      });
      console.error(err);
    }
  };

  const { user, projects, selectedProjectId } = state;

  return (
    <div className="App">
      {!user && <AuthComponent {...{ authorize }} />}

      {user && (
        <>
          <span>Hello {user.name}</span>
          <ProjectList {...{ projects, selectedProjectId }} />
        </>
      )}
    </div>
  );
}

export default App;
