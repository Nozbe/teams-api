const getProjects = async (apiClient) => {
  try {
    const { data } = await apiClient.get("sync", {
      params: {
        collection_name: "projects",
        selectiveSync2: "true",
      },
    });

    return data.changes.projects.updated;
  } catch (err) {
    console.error(err);
  }
};

const getSingleActionsProjectId = async (apiClient) => {
  const allProjects = await getProjects(apiClient);

  return allProjects.find((project) => project.is_single_actions).id;
};

exports = module.exports = {
  getProjects,
  getSingleActionsProjectId,
};
