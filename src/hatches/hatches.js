const createRaw = async (apiClient, { collectionName, pojo }) =>
  await apiClient.post("sync", {
    [collectionName]: {
      created: [pojo],
      updated: [],
      deleted: [],
    },
  });

const updateRaw = async (apiClient, { collectionName, pojo }) =>
  await apiClient.post("sync", {
    [collectionName]: {
      created: [],
      updated: [pojo],
      deleted: [],
    },
  });

const deleteRaw = async (apiClient, { collectionName, id }) =>
  await apiClient.post("sync", {
    [collectionName]: {
      created: [],
      updated: [],
      deleted: [id],
    },
  });

exports = module.exports = {
  createRaw,
  updateRaw,
  deleteRaw,
};
