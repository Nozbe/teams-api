const randomId = require("../utils/randomId");

const getTasks = async (apiClient, { projectId, withCompleted }) => {
  const {
    data: {
      changes: {
        tasks: { updated },
      },
    },
  } = await apiClient.get("sync", {
    params: {
      collection_name: "tasks",
      selectiveSync2: !withCompleted,
    },
  });

  if (projectId) {
    return updated.filter((task) => task.project_id === projectId);
  }

  return updated;
};

const addTask = async (apiClient, { taskName, projectId, extra }) =>
  await apiClient.post("sync", {
    tasks: {
      created: [
        {
          id: randomId(),
          name: taskName,
          project_id: projectId,
          review_reason: "newly_added",
          responsible_id: "author",
          ...extra,
        },
      ],
    },
  });

exports = module.exports = {
  getTasks,
  addTask,
};
