import AuthComponent from "./auth/auth-component";
import { useReducer } from "react";

import useNozbeClient from "./hooks/use-nozbe-client";

import "./App.css";
import ProjectList from "./project-list/project-list";
import TasksList from "./tasks-list/tasks-list";

const initialState = {
  authorized: false,
  user: null,
  authorizeError: false,

  projects: null,
  selectedProjectId: null,

  tasks: null,
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
      return {
        ...state,
        projects,
        selectedProjectId: projects[0].id,
      };
    case "FETCH_TASKS_SUCCESS":
      const tasks = action.payload;
      return {
        ...state,
        tasks,
      };
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [client, createClient] = useNozbeClient();

  const authorize = async (accessToken) => {
    try {
      createClient(accessToken);

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

      const tasksResponse = await client.getTasks(projectsResponse[0].id);

      dispatch({
        type: "FETCH_TASKS_SUCCESS",
        payload: tasksResponse,
      });
    } catch (err) {
      dispatch({
        type: "FETCH_USER_DATA_FAILURE",
      });
      console.error(err);
    }
  };

  const selectProject = async (projectId) => {
    try {
      const tasks = await client.getTasks(projectId);

      dispatch({
        type: "FETCH_TASKS_SUCCESS",
        payload: tasks,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const { user, projects, selectedProjectId, tasks } = state;

  return (
    <div className="App">
      {!user && <AuthComponent {...{ authorize }} />}

      {user && (
        <>
          <span>Hello {user.name}</span>
          <ProjectList {...{ projects, selectedProjectId, selectProject }} />
          <TasksList {...{ tasks }} />
        </>
      )}
    </div>
  );
}

export default App;
