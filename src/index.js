const instantiateAxios = require("./utils/axios-adapter");

const Tasks = require("./task/task");
const Projects = require("./projects/projects");

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

  async getTasks(projectId) {
    try {
      const tasks = await Tasks.getTasks(this._apiClient, { projectId });
      return tasks;
    } catch (err) {
      console.error(err);
    }
  }

  async addTask(taskName, projectId) {
    try {
      if (!projectId && !this._singleActionsProjectId) {
        await this._getSingleActionsProjectId();
      }

      await tasks.addTask(this._apiClient, {
        taskName,
        projectId: projectId || this._singleActionsProjectId,
      });
    } catch (err) {
      console.error(err);
    }
  }

  async getAllProjects() {
    try {
      const allProjects = await Projects.getAllProjects(this._apiClient);

      return allProjects;
    } catch (err) {
      console.error(err);
    }
  }
}

exports = module.exports = NozbeTeamsClient;
