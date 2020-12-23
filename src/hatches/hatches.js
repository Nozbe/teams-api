const create = async (apiClient, { collectionName, pojo }) => {
  await apiClient.post("sync", {
    [collectionName]: {
      created: [pojo],
      updated: [],
      deleted: [],
    },
  });
};

exports = module.exports = {
  create,
};

// get by collection name
