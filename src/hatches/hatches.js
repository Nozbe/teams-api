const createRaw = async (apiClient, { collectionName, rawObject }) =>
  await apiClient.post("sync", {
    [collectionName]: {
      created: [rawObject],
    },
  });

const updateRaw = async (apiClient, { collectionName, rawObject }) =>
  await apiClient.post("sync", {
    [collectionName]: {
      updated: [rawObject],
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
