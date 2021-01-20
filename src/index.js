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

  async addTask(taskName, projectId) {
    if (!taskName) {
      throw new Error("taskName is missing");
    }

    const singleActionsProjectId = await this._getSingleActionsProjectId();

    await Tasks.addTask(this._apiClient, {
      taskName,
      projectId: projectId || singleActionsProjectId,
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

  async addComment(taskId, commentText) {
    if (!taskId) {
      throw new Error("taskId is missing");
    }

    if (!commentText) {
      throw new Error("commentText is missing");
    }

    await Comments.addComment(this._apiClient, {
      taskId,
      commentText,
    });
  }

  async addAttachment(taskId, commentText, attachmentUrl, attachmentFileName) {
    try {
      await Attachments.addAttachment(this._apiClient, {
        taskId,
        commentText,
        attachmentUrl,
        attachmentFileName,
      });
    } catch (err) {
      console.error(err);
    }
  }

  async createRaw(collectionName, pojo) {
    return await EscapeHatches.createRaw(this._apiClient, {
      collectionName,
      pojo,
    });
  }

  async updateRaw(collectionName, pojo) {
    return await EscapeHatches.updateRaw(this._apiClient, {
      collectionName,
      pojo,
    });
  }

  async deleteRaw(collectionName, id) {
    return await EscapeHatches.deleteRaw(this._apiClient, {
      collectionName,
      id,
    });
  }
}

exports = module.exports = NozbeTeamsClient;
