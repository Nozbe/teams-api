const createRaw = async (apiClient, { collectionName, pojo }) =>
  await apiClient.post("sync", {
    [collectionName]: {
      created: [pojo],
    },
  });

const updateRaw = async (apiClient, { collectionName, pojo }) =>
  await apiClient.post("sync", {
    [collectionName]: {
      updated: [pojo],
    },
  });

const deleteRaw = async (apiClient, { collectionName, id }) =>
  await apiClient.post("sync", {
    [collectionName]: {
      deleted: [id],
    },
  });

exports = module.exports = {
  createRaw,
  updateRaw,
  deleteRaw,
};
