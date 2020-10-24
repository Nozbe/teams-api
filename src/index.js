const instantiateAxios = require("./adapter");

class NozbeTeamsClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this._apiClient = instantiateAxios({
      Authorization: `Apikey ${apiKey}`,
    });
  }

  async getLoggedUserData() {
    try {
      const loggedUserData = await this._apiClient.get("me");

      return loggedUserData;
    } catch (error) {
      console.error(error);
    }
  }
}
