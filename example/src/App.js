import { useEffect, useReducer } from "react";
import zacs from "@nozbe/zacs";

import { reducer, initialState } from "./store";
import useNozbeClient from "./hooks/use-nozbe-client";

import Login from "./login-window";
import ProjectList from "./project-list";
import TasksList from "./tasks-list";
import CommentsList from "./comments-list";
import Box from "./shared/box";

import style from "./App.module.css";

const App = () => {
  const [client, createClient] = useNozbeClient();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const authorize = async () => {
      try {
        const response = await client.getLoggedUser();

        dispatch({
          type: "FETCH_USER_DATA_SUCCESS",
          payload: response,
        });

        const projectsResponse = await client.getProjects({
          withSingleTasks: true,
        });

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

  const addAttachmentsByFilesArray = async (commentBody, formData) => {
    try {
      const { selectedTaskId } = state;

      await client.addAttachmentByFilesArray(
        selectedTaskId,
        commentBody,
        formData
      );
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

  const AppContainer = zacs.view(style.AppContainer);
  const PanesContainer = zacs.view(style.panesContainer);

  return (
    <AppContainer>
      {!user && <Login {...{ createClient }} />}

      {user && (
        <>
          <Box>Hello {user.name}. Welcome to Mononozbe.</Box>

          <PanesContainer>
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
            <CommentsList
              {...{
                comments,
                selectedTaskId,
                addComment,
                addAttachmentsByFilesArray,
              }}
            />
          </PanesContainer>
        </>
      )}
    </AppContainer>
  );
};

export default App;
