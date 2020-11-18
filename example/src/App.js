import { useEffect, useReducer } from "react";

import { reducer, initialState } from "./store";
import useNozbeClient from "./hooks/use-nozbe-client";

import Auth from "./auth/auth-component";
import ProjectList from "./project-list/project-list";
import TasksList from "./tasks-list/tasks-list";
import CommentsList from "./comments-list/comments-list";

import "./App.css";

import Box from "./shared/box";

const App = () => {
  const [client, createClient] = useNozbeClient();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const authorize = async () => {
      try {
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

    authorize();
  }, [client]);

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

  const addComment = async (commentBody) => {
    try {
      const { selectedTaskId } = state;
      await client.addComment(selectedTaskId, commentBody);
      await getComments(selectedTaskId);
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
      {!user && <Auth {...{ createClient }} />}

      {user && (
        <>
          <Box>Hello {user.name}. Welcome to Mononozbe.</Box>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "300px 600px auto",
              height: `calc(100vh - 20px)`,
            }}
          >
            <ProjectList {...{ projects, selectedProjectId, getTasks }} />
            <TasksList
              {...{
                tasks,
                selectedProjectId,
                addTask,
                selectedTaskId,
                getComments,
              }}
            />
            <CommentsList {...{ comments, selectedTaskId, addComment }} />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
