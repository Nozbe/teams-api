export const initialState = {
  authorized: false,
  user: null,
  authorizeError: false,

  projects: null,
  selectedProjectId: null,

  tasks: null,
};

export const reducer = (state, action) => {
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
      const { tasks, projectId } = action.payload;
      return {
        ...state,
        tasks,
        selectedProjectId: projectId,
      };
  }
};
