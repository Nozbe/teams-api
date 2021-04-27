const ApiClient = require("./utils/api-client");
const mapParams = require("./utils/map-params/map-params");

const addAttachmentByFilesArray = require("./attachments/attachments")
  .addAttachmentByFilesArray;

const withCompletedPredicate = (withCompleted) => (entity, index, entities) =>
  withCompleted ? entities : !entity.ended_at;

class NozbeTeamsClient {
  constructor(apiKey) {
    this._apiClient = new ApiClient(apiKey);

    this.apiKey = apiKey;
    this.singleActionsProjectId = null;
  }

  async getLoggedUser() {
    return await this._apiClient.getMe();
  }

  async getSingleActionsProjectId() {
    if (!this.singleActionsProjectId) {
      const allProjects = await this._apiClient.getObjects("projects", {
        selectiveSync2: true,
      });

      this.singleActionsProjectId = allProjects.find(
        (project) => project.is_single_actions
      ).id;
    }

    return this.singleActionsProjectId;
  }

  async getTasks(projectId = null, options = {}) {
    const byProjectIdPredicate = (projectId) => (task, index, tasks) =>
      projectId ? task.project_id === projectId : tasks;

    const { withCompleted } = options;

    const tasks = await this._apiClient.getObjects("tasks", {
      selectiveSync2: !withCompleted,
    });

    return tasks
      .filter(byProjectIdPredicate(projectId))
      .filter(withCompletedPredicate(withCompleted));
  }

  async addTask(taskName, projectId = null, extra = {}) {
    if (!taskName) {
      throw new Error("taskName is missing");
    }

    const singleActionsProjectId = await this.getSingleActionsProjectId();

    return await this._apiClient.createObject("tasks", {
      name: taskName,
      project_id: projectId || singleActionsProjectId,
      review_reason: "newly_added",
      responsible_id: "author",
      ...extra,
    });
  }

  async updateTask(taskId, params, extra = {}) {
    if (!taskId) {
      throw new Error("taskId is missing");
    }

    if (!params) {
      throw new Error("params are missing");
    }

    const updatedTask = mapParams.mapTaskParams(params);

    await this._apiClient.updateObject("tasks", {
      id: taskId,
      ...updatedTask,
      ...extra,
    });
  }

  async getProjects(options = {}) {
    const { withCompleted, withSingleTasks } = options;

    const withSingleTasksPredicate = (withSingleTasks) => (
      project,
      index,
      projects
    ) => {
      return withSingleTasks ? projects : !project.is_single_actions;
    };

    const projects = await this._apiClient.getObjects("projects", {
      selectiveSync2: !withCompleted,
    });

    return projects
      .filter(withCompletedPredicate(withCompleted))
      .filter(withSingleTasksPredicate(withSingleTasks));
  }

  async addProject(projectName, teamId, extra = {}) {
    if (!projectName) {
      throw new Error("projectName is missing");
    }

    if (!teamId) {
      throw new Error("teamId is missing");
    }

    return await this._apiClient.createObject("projects", {
      name: projectName,
      team_id: teamId,
      ...extra,
    });
  }

  async updateProject(projectId, params, extra = {}) {
    if (!projectId) {
      throw new Error("projectId is missing");
    }

    if (!params) {
      throw new Error("params are missing");
    }

    const updatedProject = mapParams.mapProjectParams(params);

    await this._apiClient.updateObject("projects", {
      id: projectId,
      ...updatedProject,
      ...extra,
    });
  }

  async getComments(taskId = null) {
    const byTaskIdPredicate = (comment, index, comments) =>
      taskId ? comment.task_id === taskId : comments;

    const comments = await this._apiClient.getObjects("comments");

    return comments.filter(byTaskIdPredicate);
  }

  async addComment(taskId, commentText, extra = {}) {
    if (!taskId) {
      throw new Error("taskId is missing");
    }

    if (!commentText) {
      throw new Error("commentText is missing");
    }

    await this._apiClient.createObject("comments", {
      task_id: taskId,
      body: commentText,
      ...extra,
    });
  }

  async updateComment(commentId, params, extra = {}) {
    if (!commentId) {
      throw new Error("commentId is missing");
    }

    if (!params) {
      throw new Error("params are missing");
    }

    const updatedComment = mapParams.mapCommentParams(params);

    await this._apiClient.updateObject("comments", {
      id: commentId,
      ...updatedComment,
      ...extra,
    });
  }

  async addAttachmentByFilesArray(taskId, commentText, files) {
    if (!taskId) {
      throw new Error("taskId is missing");
    }

    if (!commentText) {
      throw new Error("commentText is missing");
    }

    if (!files || !files.length) {
      throw new Error("files array is missing or empty");
    }

    return await addAttachmentByFilesArray(this._apiClient.getAxiosInstance(), {
      taskId,
      commentText,
      files,
    });
  }

  async createRaw(collectionName, rawObject) {
    return await this._apiClient.createObject(collectionName, rawObject);
  }

  async updateRaw(collectionName, rawObject) {
    return await this._apiClient.updateObject(collectionName, rawObject);
  }

  async deleteRaw(collectionName, id) {
    return await this._apiClient.deleteObject(collectionName, id);
  }
}

exports = module.exports = NozbeTeamsClient;
