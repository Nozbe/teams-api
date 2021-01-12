const request = require("request-promise-native");

const randomId = require("../utils/randomId");

// function readFileAsync(file) {
//   return new Promise((resolve, reject) => {
//     let reader = new FileReader();

//     reader.onload = () => {
//       resolve(reader.result);
//     };

//     reader.onerror = reject;

//     reader.readAsBinaryString(file);
//   });
// }

const addAttachmentByFormData = async (
  apiClient,
  { taskId, commentText, formData: filesArray }
) => {
  const fileString = await filesArray[0].text();

  console.log(filesArray[0]);

  console.log("text", fileString.length);

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
    name: filesArray[0].name,
  };

  let formData = {};
  formData[attachmentVersion.id] = {
    value: fileString,
    options: {
      filename: attachmentVersion.name,
    },
  };

  console.log(formData[attachmentVersion.id].value.length);

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

  const { baseURL, headers } = apiClient.defaults;
  return await request.post({
    formData,
    url: `${baseURL}files`,
    headers: {
      ...headers,
      "Content-Type": "multipart/form-data",
    },
  });
};

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
    const file = await request.get(attachmentUrl);

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
  addAttachmentByFormData,
};
