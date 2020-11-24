const randomId = require("../utils/randomId");

const getComments = async (apiClient, { taskId }) => {
  try {
    const response = await apiClient.get("sync", {
      collection_name: "comments",
    });

    return response;
  } catch (err) {
    console.error(err);
  }
};

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
  getComments,
  addComment,
};
