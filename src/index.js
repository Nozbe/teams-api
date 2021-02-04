const instantiateAxios = require("./utils/axios-adapter");

const Tasks = require("./tasks/tasks");
const Projects = require("./projects/projects");
const Comments = require("./comments/comments");
const Attachments = require("./attachments/attachments");
const EscapeHatches = require("./hatches/hatches");

class NozbeTeamsClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this._apiClient = instantiateAxios({
      Authorization: `Apikey ${apiKey}`,
    });
  }

  async _getSingleActionsProjectId() {
    if (!this._singleActionsProjectId) {
      this._singleActionsProjectId = await Projects.getSingleActionsProjectId(
        this._apiClient
      );
    }

    return this._singleActionsProjectId;
  }

  async getLoggedUserData() {
    return await this._apiClient.get("me");
  }

  async getTasks(projectId, options = {}) {
    const { withCompleted } = options;

    const tasks = await Tasks.getTasks(this._apiClient, {
      projectId,
      withCompleted,
    });

    if (withCompleted) {
      return tasks;
    }

    return tasks.filter((task) => !task.ended_at);
  }

  async addTask(taskName, projectId, extra) {
    if (!taskName) {
      throw new Error("taskName is missing");
    }

    const singleActionsProjectId = await this._getSingleActionsProjectId();

    await Tasks.addTask(this._apiClient, {
      taskName,
      projectId: projectId || singleActionsProjectId,
      extra,
    });
  }

  async getProjects(options = {}) {
    const { withCompleted } = options;

    const projects = await Projects.getProjects(this._apiClient);

    if (withCompleted) {
      return projects;
    }

    return projects.filter((project) => !project.ended_at);
  }

  async getComments(taskId) {
    return await Comments.getComments(this._apiClient, { taskId });
  }

  async addComment(taskId, commentText, extra) {
    if (!taskId) {
      throw new Error("taskId is missing");
    }

    if (!commentText) {
      throw new Error("commentText is missing");
    }

    await Comments.addComment(this._apiClient, {
      taskId,
      commentText,
      extra,
    });
  }

  async addAttachmentByFilesArray(taskId, commentText, files) {
    return await Attachments.addAttachmentByFilesArray(this._apiClient, {
      taskId,
      commentText,
      files,
    });
  }

  async addAttachmentByUrl(
    taskId,
    commentText,
    attachmentUrl,
    attachmentFileName,
    extra
  ) {
    return await Attachments.addAttachmentByUrl(this._apiClient, {
      taskId,
      commentText,
      attachmentUrl,
      attachmentFileName,
      extra,
    });
  }

  async createRaw(collectionName, rawObject) {
    return await EscapeHatches.createRaw(this._apiClient, {
      collectionName,
      rawObject,
    });
  }

  async updateRaw(collectionName, rawObject) {
    return await EscapeHatches.updateRaw(this._apiClient, {
      collectionName,
      rawObject,
    });
  }

  async deleteRaw(collectionName, id) {
    return await EscapeHatches.deleteRaw(this._apiClient, {
      collectionName,
      id,
    });
  }

  // async addAttachmentFromUrl(
  //   taskId,
  //   commentText,
  //   attachmentUrl,
  //   attachmentFileName
  // ) {
  //   try {
  //     await Attachments.addAttachmentFromUrl(this._apiClient, {
  //       taskId,
  //       commentText,
  //       attachmentUrl,
  //       attachmentFileName,
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
}

exports = module.exports = NozbeTeamsClient;
