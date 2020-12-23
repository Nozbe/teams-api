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
    this._singleActionsProjectId = await Projects.getSingleActionsProjectId(
      this._apiClient
    );

    return this._singleActionsProjectId;
  }

  async getLoggedUserData() {
    try {
      const loggedUserData = await this._apiClient.get("me");

      return loggedUserData;
    } catch (err) {
      console.error(err);
    }
  }

  async getTasks(projectId, options = {}) {
    const { withCompleted } = options;

    try {
      const tasks = await Tasks.getTasks(this._apiClient, {
        projectId,
        withCompleted,
      });

      if (withCompleted) {
        return tasks;
      }

      return tasks.filter((task) => !task.ended_at);
    } catch (err) {
      console.error(err);
    }
  }

  async addTask(taskName, projectId) {
    try {
      if (!projectId && !this._singleActionsProjectId) {
        await this._getSingleActionsProjectId();
      }

      await Tasks.addTask(this._apiClient, {
        taskName,
        projectId: projectId || this._singleActionsProjectId,
      });
    } catch (err) {
      console.error(err);
    }
  }

  async getProjects(options = {}) {
    const { withCompleted } = options;

    try {
      const projects = await Projects.getProjects(this._apiClient);

      if (withCompleted) {
        return projects;
      }

      return projects.filter((project) => !project.ended_at);
    } catch (err) {
      console.error(err);
    }
  }

  async getComments(taskId) {
    try {
      const comments = await Comments.getComments(this._apiClient, { taskId });

      return comments;
    } catch (err) {
      console.error(err);
    }
  }

  async addComment(taskId, commentText) {
    try {
      if (!taskId || !commentText) {
        // throw Error (?)
      }

      await Comments.addComment(this._apiClient, {
        taskId,
        commentText,
      });
    } catch (err) {
      console.error(err);
    }
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

  async createByPojo(collectionName, pojo) {
    return await EscapeHatches.create(this._apiClient, {
      collectionName,
      pojo,
    });
  }

  async updateByPojo(collectionName, pojo) {
    return await EscapeHatches.update(this._apiClient, {
      collectionName,
      pojo,
    });
  }

  async deleteById(collectionName, id) {
    return await EscapeHatches.deleteById(this._apiClient, {
      collectionName,
      id,
    });
  }
}

exports = module.exports = NozbeTeamsClient;
