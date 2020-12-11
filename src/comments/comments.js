const randomId = require("../utils/randomId");

const getComments = async (apiClient, { taskId }) => {
  try {
    const { data } = await apiClient.get("sync", {
      params: {
        collection_name: "comments",
      },
    });

    const comments = data.changes.comments.updated;

    return comments.filter((comment) => comment.task_id === taskId);
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
