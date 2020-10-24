const randomId = require("../utils/randomId");

const addTask = async (apiClient, { taskName, projectId }) => {
  try {
    const data = await apiClient.post("sync", {
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

exports.addTask = module.exports.addTask = addTask;
