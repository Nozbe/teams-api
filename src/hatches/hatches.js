const create = async (apiClient, { collectionName, pojo }) =>
  await apiClient.post("sync", {
    [collectionName]: {
      created: [pojo],
      updated: [],
      deleted: [],
    },
  });

const update = async (apiClient, { collectionName, pojo }) =>
  await apiClient.post("sync", {
    [collectionName]: {
      created: [],
      updated: [pojo],
      deleted: [],
    },
  });

const deleteById = async (apiClient, { collectionName, id }) =>
  await apiClient.post("sync", {
    [collectionName]: {
      created: [],
      updated: [],
      deleted: [id],
    },
  });

exports = module.exports = {
  create,
  update,
  deleteById,
};

// get by collection name
