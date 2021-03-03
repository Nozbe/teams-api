const randomId = require("../utils/randomId");

const addAttachmentByFilesArray = async (
  apiClient,
  { taskId, commentText, files, extra }
) => {
  const comment = {
    id: randomId(),
    task_id: taskId,
    body: commentText,
    ...extra,
  };

  const attachments = [];
  const attachmentVersions = [];

  const formData = new FormData();

  files.forEach((file, index) => {
    const attachment = {
      id: randomId(),
      parent_id: comment.id,
    };

    const attachmentVersion = {
      id: randomId(),
      attachment_id: attachment.id,
      name: file.name || `file ${index + 1}`,
    };

    attachments.push(attachment);
    attachmentVersions.push(attachmentVersion);

    formData.append(attachmentVersion.id, file, attachmentVersion.name);
  });

  await apiClient.post("sync", {
    comments: {
      created: [comment],
    },
    attachments: {
      created: attachments,
    },
    attachment_versions: {
      created: attachmentVersions,
    },
  });

  return await apiClient.post("files", formData);
};

exports = module.exports = {
  addAttachmentByFilesArray,
};
