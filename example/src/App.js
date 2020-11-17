import { useReducer } from "react";

import AuthComponent from "./auth/auth-component";

import { reducer, initialState } from "./store";
import useNozbeClient from "./hooks/use-nozbe-client";

import "./App.css";
import ProjectList from "./project-list/project-list";
import TasksList from "./tasks-list/tasks-list";
import CommentsList from "./comments-list/comments-list";

function App() {
  const [client, createClient] = useNozbeClient();
  const [state, dispatch] = useReducer(reducer, initialState);

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

      console.log(tasksResponse);

      await getComments(tasksResponse[0].id);
    } catch (err) {
      dispatch({
        type: "FETCH_USER_DATA_FAILURE",
      });
      console.error(err);
    }
  };

  const getTasks = async (projectId) => {
    try {
      const tasks = await client.getTasks(projectId);

      dispatch({
        type: "FETCH_TASKS_SUCCESS",
        payload: {
          tasks,
          projectId,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const addTask = async (taskName) => {
    try {
      const { selectedProjectId } = state;

      await client.addTask(taskName, selectedProjectId);

      await getTasks(selectedProjectId);
    } catch (err) {
      console.error(err);
    }
  };

  const getComments = async (taskId) => {
    try {
      const comments = await client.getComments(taskId);

      console.log(comments);

      dispatch({
        type: "FETCH_COMMENTS_SUCCESS",
        payload: {
          comments,
          taskId,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const selectTask = async (taskId) => {
    await getComments(taskId);
  };

  const addComment = async (commentBody) => {
    try {
      const { selectedTaskId } = state;
      await client.addComment(selectedTaskId, commentBody);
    } catch (err) {
      console.error(err);
    }
  };

  const {
    user,
    projects,
    selectedProjectId,
    tasks,
    selectedTaskId,
    comments,
  } = state;

  return (
    <div className="App">
      {!user && <AuthComponent {...{ authorize }} />}

      {user && (
        <>
          <span>Hello {user.name}</span>
          <ProjectList {...{ projects, selectedProjectId, getTasks }} />
          <TasksList {...{ tasks, selectedProjectId, addTask, selectTask }} />
          <CommentsList {...{ comments, selectedTaskId, addComment }} />
        </>
      )}
    </div>
  );
}

export default App;
