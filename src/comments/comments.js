const randomId = require("../utils/randomId");

const addComment = async (apiClient, { taskId, commentText }) => {
  try {
    await apiClient.post("sync", {
      comments: {
        created: [
          {
            id: randomId(),
            task_id: taskId,
            body: commentText,
          },
        ],
        updated: [],
        deleted: [],
      },
    });
  } catch (err) {
    console.error(err);
  }
};

exports = module.exports = {
  addComment,
};
