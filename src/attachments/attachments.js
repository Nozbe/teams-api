const request = require("request");

const randomId = require("../utils/randomId");
const { API_URL } = require("../utils/axios-adapter");

const addAttachment = async (
  apiClient,
  { taskId, commentText, attachmentUrl, attachmentFileName }
) => {
  const comment = {
    id: randomId(),
    task_id: taskId,
    body: commentText,
  };

  const attachment = {
    id: randomId(),
    parent_id: comment.id,
  };

  const attachmentVersion = {
    id: randomId(),
    attachment_id: attachment.id,
    name: attachmentFileName,
  };

  try {
    /* The `request` library is deprecated, however it was the method I was able
      to use to fetch the file from the URL and send it to the /files endpoint.
      It may need a refactoring at some point.
    */
    const file = request(attachmentUrl);

    await apiClient.post("sync", {
      comments: {
        created: [{ ...comment }],
        updated: [],
        deleted: [],
      },
      attachments: {
        created: [{ ...attachment }],
        updated: [],
        deleted: [],
      },
      attachment_versions: {
        created: [{ ...attachmentVersion }],
        updated: [],
        deleted: [],
      },
    });

    let formData = {};
    formData[attachmentVersion.id] = {
      value: file,
      options: {
        filename: attachmentVersion.name,
      },
    };

    const { baseURL, headers } = apiClient.defaults;

    await request.post({
      formData,
      url: `${baseURL}files`,
      headers: {
        ...headers,
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (err) {
    console.error(err);
  }
};

exports = module.exports = {
  addAttachment,
};
