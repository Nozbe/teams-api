const randomId = require("../utils/randomId");

const getTasks = async (apiClient, { projectId }) => {
  try {
    const {
      data: {
        changes: {
          tasks: { updated },
        },
      },
    } = await apiClient.get("sync", {
      collection_name: "tasks",
    });

    if (projectId) {
      return updated.filter((task) => task.project_id === projectId);
    }

    return updated;
  } catch (error) {
    console.error(error);
  }
};

const addTask = async (apiClient, { taskName, projectId }) => {
  try {
    await apiClient.post("sync", {
      tasks: {
        created: [
          {
            id: randomId(),
            name: taskName,
            is_all_day: true,
            project_id: projectId,
            review_reason: "newly_added",
            responsible_id: "author",
          },
        ],
        updated: [],
        deleted: [],
      },
    });
  } catch (error) {
    console.error(error);
  }
};

exports = module.exports = {
  getTasks,
  addTask,
};
