const instantiateAxios = require("./axios-adapter");
const randomId = require("./randomId");

class ApiClient {
  constructor(apiKey) {
    this.apiKey = apiKey;

    this._axiosInstance = instantiateAxios({
      Authorization: `Apikey ${apiKey}`,
    });
  }

  async getMe() {
    const { data } = await this._axiosInstance.get("me");
    return data;
  }

  async getObjects(collectionName, options = {}) {
    const {
      data: {
        changes: {
          [collectionName]: { updated },
        },
      },
    } = await this._axiosInstance.get("sync", {
      params: {
        collection_name: collectionName,
        ...options,
      },
    });

    return updated;
  }

  async createObject(collectionName, object) {
    return await this._axiosInstance.post("sync", {
      [collectionName]: {
        created: [
          {
            id: randomId(),
            ...object,
          },
        ],
      },
    });
  }

  async updateObject(collectionName, object) {
    return await this._axiosInstance.post("sync", {
      [collectionName]: {
        updated: [object],
      },
    });
  }

  async deleteObject(collectionName, id) {
    await this._axiosInstance.post("sync", {
      [collectionName]: {
        deleted: [id],
      },
    });
  }

  /**
   * @return Axios instance. For hackers.
   */
  getAxiosInstance() {
    return this._axiosInstance;
  }
}

module.exports = ApiClient;
