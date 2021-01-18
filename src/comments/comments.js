const randomId = require("../utils/randomId");

const getComments = async (apiClient, { taskId }) => {
  const { data } = await apiClient.get("sync", {
    params: {
      collection_name: "comments",
    },
  });

  const comments = data.changes.comments.updated;

  return comments.filter((comment) => comment.task_id === taskId);
};

const addComment = async (apiClient, { taskId, commentText, extra }) =>
  await apiClient.post("sync", {
    comments: {
      created: [
        {
          id: randomId(),
          task_id: taskId,
          body: commentText,
          ...extra,
        },
      ],
    },
  });

exports = module.exports = {
  getComments,
  addComment,
};
