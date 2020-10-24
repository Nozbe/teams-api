const instantiateAxios = require("./adapter");

const task = require("./task/task");
const projects = require("./projects/projects");

class NozbeTeamsClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this._apiClient = instantiateAxios({
      Authorization: `Apikey ${apiKey}`,
    });
  }

  async _init() {
    this._singleActionsProjectId = await projects.getSingleActionsProjectId(
      this._apiClient
    );
  }

  async _getSingleActionsProjectId() {
    this._singleActionsProjectId = await projects.getSingleActionsProjectId(
      this._apiClient
    );
  }

  async getLoggedUserData() {
    try {
      const loggedUserData = await this._apiClient.get("me");

      return loggedUserData;
    } catch (err) {
      console.error(err);
    }
  }

  async addTask(taskName, projectId) {
    try {
      if (!projectId && !this._singleActionsProjectId) {
        await this._getSingleActionsProjectId();
      }

      await task.addTask(this._apiClient, {
        taskName,
        projectId: projectId || this._singleActionsProjectId,
      });
    } catch (err) {
      console.error(err);
    }
  }

  async getAllProjects() {
    try {
      const allProjects = await projects.getAllProjects(this._apiClient);

      return allProjects;
    } catch (err) {
      console.error(err);
    }
  }
}
